import { useState, useEffect } from 'react';

// useState, синхронизированный с localStorage
export function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Ошибка сохранения ${key}:`, e);
    }
  }, [key, value]);

  return [value, setValue];
}
