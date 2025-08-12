// scrollEffects.js
import { typeEffectMulti } from './typewritter.js';

let iniciarFotos = false;
let iniciarTexto = false;
let scrollListenerAtivado = false;

export function inicializarFotos(rotations) {
  const polaroids = document.querySelectorAll('.polaroid');
  polaroids.forEach((polaroid, index) => {
    polaroid.style.setProperty('--rotation', rotations[index % rotations.length]);
  });
}

export function ativarScrollFotos() {
  const sections = document.querySelectorAll('.scroll-section');
  const textos = document.querySelectorAll('.polaroidText .text');

  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;

    sections.forEach((section, index) => {
      const polaroid = section.querySelector('.polaroid');
      const rect = section.getBoundingClientRect();
      const texto = textos[index];

      if (iniciarFotos && rect.top < windowHeight * 0.6) {
        // Foto visível
        polaroid?.classList.add('visible');

        if (iniciarTexto && texto) {
          // Se ainda não foi digitado, digita
          if (!texto.classList.contains('digitado')) {
            texto.classList.add('digitado');
            typeEffectMulti([texto], 70);
          }
          // Sempre que entrar na área, deixa visível
          texto.classList.add('visible');
        }
      } else {
        // Foto fora da área
        polaroid?.classList.remove('visible');

        // Texto sempre some se sair da área, mesmo se já foi digitado
        if (texto) {
          texto.classList.remove('visible');
          texto.classList.remove('digitado');
        }
      }
    });
  });
}

function ativarScrollListener() {
  if (scrollListenerAtivado) return;
  scrollListenerAtivado = true;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.offsetHeight;
    const finalText = document.querySelector('.textoFinal');

    const isAtBottom = scrollTop + windowHeight >= documentHeight - 50;
    if (finalText) {
      finalText.classList.toggle('visible', isAtBottom);
    }
  });
}

export function liberarFotosETexto() {
  iniciarFotos = true;
  iniciarTexto = true;
  ativarScrollListener(); // agora só ativa uma vez aqui
}
