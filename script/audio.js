// audio.js
export function tocarAudio(audioEl) {
  if (!audioEl) {
    console.warn("Áudio não encontrado, simulando...");
    return Promise.resolve();
  }
  try {
    return audioEl.play();
  } catch {
    console.warn("Falha ao tentar tocar áudio, simulando...");
    return Promise.resolve();
  }
}
