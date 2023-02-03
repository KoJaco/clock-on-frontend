import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
    children: React.ReactNode;
}

// Re-usable portal component wrapper
const Portal = ({ children }: PortalProps) => {
    const el = document.createElement('div');
    const mount = document.getElementById('portal-root');

    useEffect(() => {
        mount?.appendChild(el);
        return () => {
            mount?.removeChild(el);
        };
    }, [el, mount]);
    return createPortal(children, el);
};

export default Portal;
