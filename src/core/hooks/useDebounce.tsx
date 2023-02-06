import { useState, useEffect } from 'react';
import { useTimeout } from './useTimeout';

export function useSimpleDebounce(value: string, delay: number = 250) {
    /**
     * Simple debounce hook for a string input.
     * Default delay is set to 250ms
     *
     * E.g: Search input (onChange) in combination with fetching data from an API.
     */
    const [debouncedValue, setDebouncedValue] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(delay);
    }, [value, delay]);

    return [debouncedValue];
}

export function useCallbackDebounce(
    callback: Function,
    delay: number,
    dependencies: Array<unknown> = []
) {
    /**
     * Use custom hook to build another custom hook...
     *
     * E.g: Acts like a microcontroller to stop an action from registering for a fraction of a second (delay) to prevent sending multiple signals.
     *
     * -- relies on custom hooks 'useTimeout'
     */
    const { reset, clear } = useTimeout(callback, delay);
    useEffect(reset, [...dependencies, reset]);
    useEffect(clear);
}
