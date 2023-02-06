import { useCallback, useEffect, useRef } from 'react';

export function useTimeout(callback: Function, delay: number) {
    /**
     * Timeout hook that returns a function to clear the timeout.
     *
     * E.g: Timeout that clears itself when a component unmounts.
     * ... when you forget to clear timeout...
     */
    const savedCallback = useRef<Function>(callback);
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            savedCallback.current(), delay;
        }, delay);
    }, [delay]);

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current);
    }, []);

    const reset = useCallback(() => {
        clear();
        set();
    }, [clear, set]);

    useEffect(() => {
        set();
        return clear;
    }, [delay, set, clear]);

    return { reset, clear };
}
