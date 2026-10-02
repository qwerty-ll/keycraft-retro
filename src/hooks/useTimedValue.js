import { useState, useEffect, useRef, useCallback } from 'react';

// Значение, которое само сбрасывается в null через `ms` миллисекунд
// (тосты, кнопки «Добавлено ✓» и т.п.)
export function useTimedValue(ms) {
  const [value, setValue] = useState(null);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  const show = useCallback((next = true) => {
    setValue(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setValue(null), ms);
  }, [ms]);

  return [value, show];
}
