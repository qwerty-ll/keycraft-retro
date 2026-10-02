// Цена с пробелами и рублём: 18900 → "18 900 ₽"
export const rub = (n) => `${n.toLocaleString('ru-RU')} ₽`;
