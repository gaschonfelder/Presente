const fim = new Date(2025, 7, 8, 12, 0, 0);
const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");
const startBtn = document.getElementById("startBtn");
const countdown = document.getElementById("countdown");
const mainContent = document.getElementById("mainContent");

document.body.style.overflow = 'hidden';

let iniciarFotos = false;
let iniciarTexto = false;

function atualizarContagem() {
  const agora = new Date();
  const diff = fim - agora;
  if (diff <= 0) {
    countdown.style.display = "none";
    startBtn.classList.add("visible");
    clearInterval(intervalo);
    return;
  }

  const segundos = Math.floor(diff / 1000) % 60;
  const minutos = Math.floor(diff / 1000 / 60) % 60;
  const horas = Math.floor(diff / 1000 / 60 / 60) % 24;
  const dias = Math.floor(diff / 1000 / 60 / 60 / 24);

  diasEl.textContent = dias;
  horasEl.textContent = horas.toString().padStart(2, '0');
  minutosEl.textContent = minutos.toString().padStart(2, '0');
  segundosEl.textContent = segundos.toString().padStart(2, '0');
}

const intervalo = setInterval(atualizarContagem, 1000);
atualizarContagem();

function typeEffect(element, speed = 100) {
    const texto = element.textContent;
    element.textContent = ''; // limpa o texto original
    let i = 0;
  
    const timer = setInterval(() => {
      element.textContent += texto.charAt(i);
      i++;
      if (i >= texto.length) clearInterval(timer);
    }, speed);
  }
  

startBtn.addEventListener("click", () => {
    const audio = document.getElementById("musicaFundo");
  
    // Tenta tocar o áudio de forma segura
    audio.play()
      .then(() => {
        // ✅ Sucesso: continua com a animação
        anime({
          targets: '#startBtn',
          opacity: [1, 0],
          duration: 800,
          easing: 'easeInOutQuad',
          complete: () => {
            startBtn.style.display = "none";
            mainContent.style.display = "block";

            const typingElement = document.getElementById('typingText');
            typeEffect(typingElement, 200);
  
            const scrollContainer = document.getElementById("scrollContainer");
            scrollContainer.style.display = "block";
  
            anime({
              targets: '#mainContent h2',
              opacity: [0, 1],
              translateY: [-30, 0],
              duration: 1200,
              easing: 'easeOutExpo'
            });
  
            iniciarFotos = true;
            iniciarTexto = true;
            document.body.style.overflow = 'auto';
          }
        });
      })
      .catch((error) => {
        // ❌ Erro ao tocar áudio: avisa no console
        console.warn("Falha ao reproduzir áudio:", error);
        alert("Clique novamente para ativar a música."); // opcional
      });
  });

// Mostrar fotos conforme scroll
const polaroids = document.querySelectorAll('.polaroid');
const polaroidsText = document.querySelectorAll('.polaroidText');

// Define rotações para sobreposição
const rotations = ['-7deg', '8deg', '-3deg', '5deg'];

polaroids.forEach((polaroid, index) => {
  polaroid.style.setProperty('--rotation', rotations[index % rotations.length]);
});

function typeEffectMulti(textElements, speed = 50) {
    let index = 0;
  
    function typeNext() {
      if (index >= textElements.length) return;
  
      const el = textElements[index];
      const text = el.textContent;
      el.textContent = '';
      let charIndex = 0;
  
      function typeChar() {
        if (charIndex < text.length) {
          el.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, speed);
        } else {
          index++;
          setTimeout(typeNext, 300); // espera um pouco antes de ir para o próximo
        }
      }
  
      typeChar();
    }
  
    typeNext();
  }
  

window.addEventListener('scroll', () => {
  const windowHeight = window.innerHeight;

  setTimeout(() => {
    ativarScrollListener();
  }, 500);

  document.querySelectorAll('.scroll-section').forEach((section, index) => {
    const polaroid = section.querySelector('.polaroid');
    const rect = section.getBoundingClientRect();

    // if (iniciarFotos && rect.top < windowHeight * 0.6) {
    //   polaroid?.classList.add('visible');

    //   // Mostrar texto correspondente (se existir)
    //   const texto = document.querySelectorAll('.polaroidText .text')[index];
    //   if (iniciarTexto && texto) {
    //     texto.classList.add('visible');
        
    //   }

    // } else {
    //   polaroid?.classList.remove('visible');
  
    //   // Remoção do texto desativada para manter os textos anteriores na tela
    //   const texto = document.querySelectorAll('.polaroidText .text')[index];
    //   texto?.classList.remove('visible');
    // }

    if (iniciarFotos && rect.top < windowHeight * 0.6) {
        polaroid?.classList.add('visible');
      
        const texto = document.querySelectorAll('.polaroidText .text')[index];
        if (iniciarTexto && texto && !texto.classList.contains('digitado')) {
          texto.classList.add('visible');
          texto.classList.add('digitado'); // Marca como já digitado
          typeEffectMulti([texto], 70);    // Executa o efeito de digitação
        }
      
      } else {
        polaroid?.classList.remove('visible');
      
        // opcional: remova a classe visible se quiser "esconder"
        const texto = document.querySelectorAll('.polaroidText .text')[index];
        texto?.classList.remove('visible');
      }
      
    
  });
});

let scrollListenerAtivado = false;

function ativarScrollListener() {
  if (scrollListenerAtivado) return;
  scrollListenerAtivado = true;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.offsetHeight;

    const isAtBottom = scrollTop + windowHeight >= documentHeight - 50;
    const finalText = document.querySelector('.textoFinal');

    if (isAtBottom) {
      finalText.classList.add('visible');
    } else {
      finalText.classList.remove('visible');
    }
  });
}

startBtn.addEventListener('mouseenter', () => {
  const interval = setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '❤️💚';

    // Posição aleatória dentro do botão
    const x = Math.random() * startBtn.offsetWidth;
    const y = Math.random() * startBtn.offsetHeight;

    heart.style.left = `${startBtn.offsetLeft + x}px`;
    heart.style.top = `${startBtn.offsetTop + y}px`;

    document.body.appendChild(heart);

    // Remover após animação
    setTimeout(() => {
      heart.remove();
    }, 1000);
  }, 100);

  startBtn.addEventListener('mouseleave', () => {
    clearInterval(interval);
  }, { once: true });
});
