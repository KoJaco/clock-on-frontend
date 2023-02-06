import { useEffect, useRef } from 'react';

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
