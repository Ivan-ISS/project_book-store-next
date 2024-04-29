import styles from './burgerButton.module.scss';
import { ButtonHTMLAttributes, useState, useEffect, useRef } from 'react';

export interface BurgerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element;
}

export default function BurgerButton({ children, ...props }: BurgerButtonProps) {
    const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
    const burgerButton = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event:  MouseEvent) => {    // Обработчик для клика вне меню для его закрытия
            if (burgerButton.current && !burgerButton.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
      }, []);

    const handleClickBtn = () => {
        setMenuOpen(v => !v);
    };

    return (
        <div ref={burgerButton} className={styles.burgerWrap}>
            <button {...props} className={`${styles.burgerButton} ${menuOpen ? styles.active : styles.inactive}`} onClick={handleClickBtn}>
                <span className={styles.band}></span>
                <span className={styles.band}></span>
                <span className={styles.band}></span>
            </button>
            { menuOpen && children }
        </div>
    );
}