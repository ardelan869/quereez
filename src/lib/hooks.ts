import { useEffect, useState, useRef } from 'react';
import { noop } from '@/lib/constants';

type EventKeys = keyof WindowEventMap;

type EventCallback<T extends EventKeys = EventKeys> = (ev: WindowEventMap[T]) => unknown;

/**
 * Listens to the specified window events.
 */
export function useEvent<T extends EventKeys>(event: T, callback: EventCallback<T>) {
  const savedHandler = useRef<EventCallback<T>>(noop);

  useEffect(() => {
    savedHandler.current = callback;
  }, [callback]);

  useEffect(() => {
    const listener = (event: Parameters<EventCallback<T>>[0]) => {
      savedHandler.current(event);
    };

    window.addEventListener(event, listener);

    return () => window.removeEventListener(event, listener);
  }, [event]);
}

/**
 * Triggers when something outside the ref has been triggered
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent) => void
) {
  const savedHandler = useRef<(event: MouseEvent) => void>(noop);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!ref.current) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const { clientX, clientY } = event;

      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        savedHandler?.current?.(event);
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, [ref]);
}

/**
 * Debounces the value.
 */
export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
