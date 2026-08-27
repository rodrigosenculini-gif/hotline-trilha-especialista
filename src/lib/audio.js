// Mapa central dos áudios da trilha. Nem todo slide/momento tem áudio —
// os componentes checam se existe antes de mostrar o botão/tocar.
export const AUDIO_SLIDE_NARRACAO = {
  1: '/audio/slide-1.mp3',
  2: '/audio/slide-2.mp3',
  5: '/audio/slide-5.mp3',
  7: '/audio/slide-7.mp3',
  8: '/audio/slide-8.mp3',
  10: '/audio/slide-10.mp3',
};

export const AUDIO_MASCOTE_SLIDE = {
  1: '/audio/mascote-slide-1.mp3',
  2: '/audio/mascote-slide-2.mp3',
  3: '/audio/mascote-slide-3.mp3',
  4: '/audio/mascote-slide-4.mp3',
  5: '/audio/mascote-slide-5.mp3',
  6: '/audio/mascote-slide-6.mp3',
  11: '/audio/mascote-slide-11.mp3',
};

export const AUDIO_MASCOTE = {
  montanhaInicio: '/audio/mascote-montanha-inicio.mp3',
  montanhaFinal: '/audio/mascote-montanha-final.mp3',
  antesContinuar: '/audio/mascote-antes-continuar.mp3',
  playbook: '/audio/mascote-playbook.mp3',
  ultimoPasso: '/audio/mascote-ultimo-passo.mp3',
};

export const AUDIO_MASMORRA_ERRO = [
  '/audio/mascote-masmorra-errou.mp3',
  '/audio/mascote-masmorra-perdendo-vidas.mp3',
  '/audio/mascote-masmorra-incentivo.mp3',
];

// Toca um áudio (se existir a URL) — nunca quebra a experiência se falhar.
let audioAtual = null;
export function tocarAudio(url) {
  if (!url) return;
  try {
    if (audioAtual) { audioAtual.pause(); audioAtual.currentTime = 0; }
    audioAtual = new Audio(url);
    audioAtual.play().catch(() => {});
  } catch {
    // ignora — áudio é um extra, nunca deve travar a trilha
  }
}
