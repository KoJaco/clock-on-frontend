import {
    DependencyList,
    MutableRefObject,
    useEffect,
    useLayoutEffect,
    useRef,
} from 'react';

export interface Position {
    x: number;
    y: number;
}

export interface ScrollProps {
    previousPos: Position;
    currentPos: Position;
}

export type ElementRef = MutableRefObject<HTMLElement | undefined>;

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

export const useIsomorphicLayoutEffect =
    // determine if client ? useLayout or server : useEffect
    typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useScrollPosition(
    effect: (props: ScrollProps) => void,
    deps?: DependencyList,
    element?: ElementRef,
    useWindow?: boolean,
    wait?: number,
    boundingElement?: ElementRef
): void {
    const position = useRef(getScrollPosition({ useWindow, boundingElement }));

    let throttleTimeout: number | null = null;

    const callBack = () => {
        const currentPosition = getScrollPosition({
            element,
            useWindow,
            boundingElement,
        });
        effect({ previousPos: position.current, currentPos: currentPosition });
        position.current = currentPosition;
        throttleTimeout = null;
    };

    useIsomorphicLayoutEffect(() => {
        if (!isBrowser) {
            return undefined;
        }

        const handleScroll = () => {
            if (wait && throttleTimeout === null) {
                throttleTimeout = window.setTimeout(callBack, wait);
            } else {
                callBack();
            }

            return () => {
                if (boundingElement) {
                    boundingElement.current?.removeEventListener(
                        'scroll',
                        handleScroll
                    );
                } else {
                    window.removeEventListener('scroll', handleScroll);
                }

                if (throttleTimeout) {
                    clearTimeout(throttleTimeout);
                }
            };
        };
    }, deps);
}

useScrollPosition.defaultProps = {
    deps: [],
    element: false,
    useWindow: false,
    wait: null,
    boundingElement: false,
};
