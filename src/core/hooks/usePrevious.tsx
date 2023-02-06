import { useRef } from 'react';

export function usePrevious<T extends null>(value: T) {
    /**
     * Mimic componentDidUpdate lifecycle hook.
     *
     * Should T be a nullable generic?
     */
    const currentRef = useRef(value);
    const prevRef = useRef(null);

    if (currentRef.current !== value) {
        prevRef.current = currentRef.current;
        currentRef.current = value;
    }
    return prevRef.current;
}
