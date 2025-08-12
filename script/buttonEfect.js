// hearts.js
export function ativarCoracoes(startBtn) {
  startBtn.addEventListener('mouseenter', () => {
    const interval = setInterval(() => {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.textContent = '❤️';

      const x = Math.random() * startBtn.offsetWidth;
      const y = Math.random() * startBtn.offsetHeight;

      heart.style.left = `${startBtn.offsetLeft + x}px`;
      heart.style.top = `${startBtn.offsetTop + y}px`;

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1000);
    }, 100);

    startBtn.addEventListener('mouseleave', () => {
      clearInterval(interval);
    }, { once: true });
  });
}

