export interface BookingDetails {
  nome: string;
  telefone: string;
  tratamento: string;
  dia: string;
  hora: string;
}

export function formatWhatsAppMessage(details: BookingDetails): string {
  const { nome, telefone, tratamento, dia, hora } = details;
  return `Olá! Gostaria de marcar uma consulta.\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*Tratamento:* ${tratamento}\n*Preferência de dia:* ${dia}\n*Preferência de hora:* ${hora}`;
}

export function clampValue(val: number, min: number, max: number): number {
  if (!Number.isFinite(val) || Number.isNaN(val)) return min;
  return Math.min(Math.max(val, min), max);
}

export function getNextReviewIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex + 1) % total;
}

export function getPrevReviewIndex(currentIndex: number, total: number): number {
  if (total <= 0) return 0;
  return (currentIndex - 1 + total) % total;
}
