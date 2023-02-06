import { useEffect } from 'react';
import { assertIsNode } from '../utils';

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
