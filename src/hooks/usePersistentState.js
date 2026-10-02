import { useState, useEffect } from 'react';

// useState, синхронизированный с localStorage (или sessionStorage)
export function usePersistentState(key, initial, storage = localStorage) {
  // При первом показе читаем сохранённое значение
  const [value, setValue] = useState(() => {
    try {
      const saved = storage.getItem(key);
      return saved ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });

  // При каждом изменении записываем значение обратно
  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Ошибка сохранения ${key}:`, e);
    }
  }, [key, value, storage]);

  return [value, setValue];
}
