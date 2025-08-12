// typewriter.js
export function typeEffect(element, speed = 100) {
  const texto = element.textContent;
  element.textContent = '';
  let i = 0;

  const timer = setInterval(() => {
    element.textContent += texto.charAt(i);
    i++;
    if (i >= texto.length) clearInterval(timer);
  }, speed);
}

export function typeEffectMulti(textElements, speed = 50) {
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
        setTimeout(typeNext, 300);
      }
    }
    typeChar();
  }

  typeNext();
}
