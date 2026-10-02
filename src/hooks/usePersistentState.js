import { useState, useEffect } from 'react';

// состояние которое сохраняется в браузере
export function usePersistentState(key, initial, storage = localStorage) {
  // читаем сохранённое
  const [value, setValue] = useState(() => {
    try {
      const saved = storage.getItem(key);
      return saved ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });

  // сохраняем при изменении
  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Ошибка сохранения ${key}:`, e);
    }
  }, [key, value, storage]);

  return [value, setValue];
}
