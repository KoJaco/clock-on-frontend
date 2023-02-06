import { useState, useCallback, useRef } from 'react';

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
