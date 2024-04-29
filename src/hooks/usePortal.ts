import { useState, useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
    children: ReactNode;
}

export default function usePortal() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const elRef = useRef<HTMLDivElement | null>(document.createElement('div'));

    const openPortal = () => {
        setIsOpen(true);
    };

    const closePortal = () => {
        setIsOpen(false);
    };
    
    useEffect(() => {
        const modalRoot = document.getElementById('modal');
        if (modalRoot && elRef.current) {
            modalRoot?.appendChild(elRef.current);
        }

        return () => {
            if (elRef.current) {
                modalRoot?.removeChild(elRef.current);
            }
        };
    }, []);

    function Portal({ children }: PortalProps) {
        if (elRef.current) {
            return createPortal(children, elRef.current);
        }
    }

    return (
        {
            isOpenPortal: isOpen,
            openPortal,
            closePortal,
            Portal
        }
    );
}