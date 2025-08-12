// main.js
import { iniciarContagem } from './script/countdown.js';
import { typeEffect } from './script/typewritter.js';
import { tocarAudio } from './script/audio.js';
import { inicializarFotos, ativarScrollFotos, liberarFotosETexto } from './script/scroll.js';
import { ativarCoracoes } from './script/buttonEfect.js';
import cfg from './script/config.js';

// Bloqueia scroll até o start
document.body.style.overflow = 'hidden';

// ------------------------
// Elementos do DOM
// ------------------------
const elementos = {
  dias: document.getElementById('dias'),
  horas: document.getElementById('horas'),
  minutos: document.getElementById('minutos'),
  segundos: document.getElementById('segundos'),
  startBtn: document.getElementById('startBtn'),
  countdown: document.getElementById('countdown'),
  mainContent: document.getElementById('mainContent'),
  btnConfig: document.getElementById('configBtn'),
  typingText: document.getElementById('typingText'),
  finalText: document.getElementById('finalText'),
  scrollContainer: document.getElementById('scrollContainer'),
  polaroidTextWrap: document.querySelector('.polaroidText'),
};

// ------------------------
// Preenche textos/imagens via cfg
// ------------------------
if (elementos.typingText && cfg.title) {
  elementos.typingText.textContent = cfg.title;
}
if (elementos.finalText && cfg.title) {
  elementos.finalText.textContent = cfg.final;
}
if (elementos.startBtn && cfg.startButtonText) {
  elementos.startBtn.textContent = cfg.startButtonText;
}
if (elementos.polaroidTextWrap && Array.isArray(cfg.phrases)) {
  elementos.polaroidTextWrap.innerHTML = cfg.phrases
    .map(t => `<p class="text bold">${t}</p>`)
    .join('');
}
if (elementos.scrollContainer && Array.isArray(cfg.images)) {
  const imgs = elementos.scrollContainer.querySelectorAll('.polaroid img');
  cfg.images.forEach((src, i) => {
    if (imgs[i]) imgs[i].src = src;
  });
}

// ------------------------
// Contagem regressiva
// ------------------------


iniciarContagem(cfg.countdownTarget, elementos);

// ------------------------
// Polaroids e scroll
// ------------------------
const rotations = Array.isArray(cfg.rotations)
  ? cfg.rotations                   // ex.: ['-7deg','8deg','-3deg','5deg']
  : ['-7deg', '8deg', '-3deg', '5deg']; // padrão

inicializarFotos(rotations);
ativarScrollFotos();

// ------------------------
// Efeito corações no botão
// ------------------------
if (elementos.startBtn) {
  ativarCoracoes(elementos.startBtn);
}

// ------------------------
// Clique no botão iniciar
// ------------------------
elementos.startBtn?.addEventListener('click', onStart,{once: true});

function onStart(){
  const audio = document.getElementById('musicaFundo');

  tocarAudio(audio)
    .then(() => {
      anime({
        targets: '#startBtn',
        opacity: [1, 0],
        duration: 800,
        easing: 'easeInOutQuad',
        complete: () => {
          // some com o start
          if (elementos.startBtn) elementos.startBtn.style.display = 'none';

          // mostra conteúdo principal
          if (elementos.mainContent) elementos.mainContent.style.display = 'block';

          // efeito de digitação
          const typingEl = elementos.typingText || document.getElementById('typingText');
          if (typingEl) typeEffect(typingEl, cfg.typingSpeed ?? 200);

          // libera container de scroll
          if (elementos.scrollContainer) elementos.scrollContainer.style.display = 'block';

          // anima título
          anime({
            targets: '#mainContent h2',
            opacity: [0, 1],
            translateY: [-30, 0],
            duration: 1200,
            easing: 'easeOutExpo'
          });

          // ativa fotos e textos
          liberarFotosETexto();

          // libera scroll da página
          document.body.style.overflow = 'auto';
        }
      });
    })
    .catch((error) => {
      console.warn('Erro ao tocar áudio:', error);
      // mesmo se o áudio falhar, prossegue
      if (elementos.startBtn) elementos.startBtn.style.display = 'none';
      if (elementos.mainContent) elementos.mainContent.style.display = 'block';
      if (elementos.scrollContainer) elementos.scrollContainer.style.display = 'block';
      liberarFotosETexto();
      document.body.style.overflow = 'auto';
    });

  // Esconde o botão de config (se existir)
  if (elementos.btnConfig) {
    elementos.btnConfig.style.display = 'none';
  }
}
