import { useEffect, useState } from 'react';

export function useKeyPress(targetKey: string) {
    /**
     * Custom hook to check if a particular key has been pressed.
     *
     * E.g: for keyboard command custom shortcuts
     */
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
