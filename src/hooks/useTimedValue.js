import { useState, useEffect, useRef, useCallback } from 'react';

// Значение, которое само исчезает через ms миллисекунд (тосты, «Добавлено ✓»)
export function useTimedValue(ms) {
  const [value, setValue] = useState(null);
  // id таймера; при удалении компонента таймер отменяется
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  // Показать значение и запустить отсчёт заново
  const show = useCallback((next = true) => {
    setValue(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setValue(null), ms);
  }, [ms]);

  return [value, show];
}
