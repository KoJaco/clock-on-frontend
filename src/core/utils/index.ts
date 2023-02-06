import type { ElementRef } from '../types/hooks';

export function assertIsNode(e: EventTarget | null): asserts e is Node {
    // assert that an event target is a node
    if (!(e instanceof Node)) {
        throw new Error('Expected a Node');
    }
}

export const isBrowser = typeof window !== 'undefined';

export const getClientRect = (element?: HTMLElement) =>
    element?.getBoundingClientRect();

export const getScrollPosition = ({
    element,
    useWindow,
    boundingElement,
}: {
    element?: ElementRef;
    useWindow?: boolean;
    boundingElement?: ElementRef;
}) => {
    if (!isBrowser) {
        return { x: 0, y: 0 };
    }

    if (useWindow) {
        return { x: window.scrollX, y: window.scrollY };
    }

    const targetPosition = getClientRect(element?.current || document.body);
    const containerPosition = getClientRect(boundingElement?.current);

    if (!targetPosition) {
        return { x: 0, y: 0 };
    }

    return containerPosition
        ? {
              x: (containerPosition.x || 0) - (targetPosition.x || 0),
              y: (containerPosition.y || 0) - (targetPosition.y || 0),
          }
        : { x: targetPosition.left, y: targetPosition.top };
};
