import { useEffect, useState, useRef, useCallback } from 'react';
import { assertIsNode } from '../utils';

// https://medium.com/@Chris1993/15-useful-custom-react-hooks-for-your-next-web-app-c5902d868f4c

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

export function useUpdateEffect(
    effect: Function,
    dependencies: Array<unknown> = []
) {
    /**
     * replicates useEffect functionality solely for dependency updates.
     * This function does not run on initial render.
     *
     * E.g: Notifications that should not fire on initial render.
     */
    const isInitialMount = useRef(false);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
    }, [dependencies, effect]);
}

export function useOnClickOutside(
    ref: React.MutableRefObject<HTMLElement | null>,
    handler: Function
) {
    /**
     *  Click outside function with node event target assertion, mousedown and    touchstart.
     *
     * E.g: Modal component that closes when clicking outside of the modal.
     */

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            assertIsNode(event.target);
            if (!ref?.current || ref?.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
}

export function useIsHovering() {
    /**
     * Detects if a node is being hovered over.
     * use useRef() to keep track of last node passed to callbackRef to be able to remove listeners
     *
     * E.g: style elements being hovered over, could be a group, could be a parent element, etc.
     */
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = useCallback(() => setIsHovering(true), []);
    const handleMouseOut = useCallback(() => setIsHovering(false), []);
    const nodeRef = useRef<HTMLElement | null>(null);
    const callbackRef = useCallback(
        (node: HTMLElement) => {
            if (nodeRef.current) {
                nodeRef.current.removeEventListener(
                    'mouseover',
                    handleMouseOver
                );
                nodeRef.current.removeEventListener('mouseout', handleMouseOut);
            }
            nodeRef.current = node;
            if (nodeRef.current) {
                nodeRef.current.addEventListener('mouseover', handleMouseOver);
                nodeRef.current.addEventListener('mouseout', handleMouseOut);
            }
        },
        [handleMouseOver, handleMouseOut]
    );
    return [callbackRef, isHovering];
}

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

export const useLocalStorage = (key: string, value: unknown) =>
    useStorage(key, value, window.localStorage);

export const useSessionStorage = (key: string, value: unknown) => {
    return useStorage(key, value, window.sessionStorage);
};

export function useStorage(key: string, value: unknown, storage: Storage) {
    /**
     * Custom hook to handle localStorage.
     *
     * E.g: Persisting state in localStorage.
     */
    const [storageValue, setStorageValue] = useState(() => {
        const json = storage.getItem(key);

        if (json != null) return JSON.parse(json);

        if (typeof value === 'function') return value();

        return value;
    });

    useEffect(() => {
        if (storageValue === undefined) return storage.removeItem(key);
        storage.setItem(key, JSON.stringify(storageValue));
    }, [key, storageValue, storage]);

    const remove = useCallback(() => {
        setStorageValue(undefined);
    }, []);

    return [storageValue, setStorageValue, remove];
}

export function useKeyPress(targetKey: string) {
    const [keyPressed, setKeyPressed] = useState(false);
    const downHandler = ({ key }: any) => {
        if (key === targetKey) setKeyPressed(true);
    };
    const upHandler = ({ key }: any) => {
        if (key === targetKey) setKeyPressed(false);
    };
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    });
    return keyPressed;
}

// export function useOnWindowScroll(callback: Function) {
//     const listener = useRef(null);

//     useEffect(() => {
//         if (listener.current) {
//             window.removeEventListener('scroll', listener.current);
//             listener.current = window.addEventListener('scroll', callback);
//         }
//         return () => {
//             window.removeEventListener('scroll', listener.current);
//         };
//     }, [callback]);
// }

export function useCopyToClipboard(text: string) {}
