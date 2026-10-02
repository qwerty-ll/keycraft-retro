import { useState, useEffect, useRef, useCallback } from 'react';

// значение которое само пропадает через время
export function useTimedValue(ms) {
  const [value, setValue] = useState(null);
  // тут хранится таймер
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);

  // показать и запустить таймер
  const show = useCallback((next = true) => {
    setValue(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setValue(null), ms);
  }, [ms]);

  return [value, show];
}
