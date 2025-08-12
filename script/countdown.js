
// countdown.js

function parseCountdownTarget(target) {
  if (target instanceof Date) return target;

  if (typeof target === 'string') {
    // "DD/MM/AAAA HH:MM:SS" (hora opcional)
    if (/^\d{2}\/\d{2}\/\d{4}/.test(target)) {
      const [data, hora = '00:00:00'] = target.trim().split(/\s+/);
      const [dia, mes, ano] = data.split('/').map(Number);
      const [h, m, s] = hora.split(':').map(n => Number(n) || 0);
      return new Date(ano, (mes - 1), dia, h, m, s);
    }
    // ISO ou qualquer string que o Date entenda
    const d = new Date(target);
    if (!isNaN(d)) return d;
  }

  // fallback: agora + 1 minuto
  const fallback = new Date();
  fallback.setMinutes(fallback.getMinutes() + 1);
  return fallback;
}

/**
 * Inicia a contagem regressiva.
 * @param {Date|string} alvoConfig - Date, "DD/MM/AAAA HH:MM:SS" ou ISO
 * @param {Object} elementos - {dias, horas, minutos, segundos, countdown, startBtn}
 */
export function iniciarContagem(alvoConfig, elementos) {
  const fim = parseCountdownTarget(alvoConfig);

  function atualizarContagem() {
    const agora = new Date();
    const diff = fim - agora;

    if (diff <= 0) {
      if (elementos?.countdown) elementos.countdown.style.display = "none";
      if (elementos?.startBtn) elementos.startBtn.classList.add("visible");
      clearInterval(intervalo);
      return;
    }

    const segundos = Math.floor(diff / 1000) % 60;
    const minutos  = Math.floor(diff / 1000 / 60) % 60;
    const horas    = Math.floor(diff / 1000 / 60 / 60) % 24;
    const dias     = Math.floor(diff / 1000 / 60 / 60 / 24);

    if (elementos?.dias)     elementos.dias.textContent     = dias;
    if (elementos?.horas)    elementos.horas.textContent    = horas.toString().padStart(2, '0');
    if (elementos?.minutos)  elementos.minutos.textContent  = minutos.toString().padStart(2, '0');
    if (elementos?.segundos) elementos.segundos.textContent = segundos.toString().padStart(2, '0');
  }

  const intervalo = setInterval(atualizarContagem, 1000);
  atualizarContagem();
}

