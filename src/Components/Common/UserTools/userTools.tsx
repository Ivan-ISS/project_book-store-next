import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import styles from './userTools.module.scss';
import Indicator from '../Indicator/indicator';
import { IItem } from '@/data';

export interface UserToolsProps {
    itemsTools: IItem[];
    children?: JSX.Element;
    handleItemClick?: () => void;
    handleRoutClick?: (item: string) => void;
}

export default function UserTools({ itemsTools, handleItemClick, handleRoutClick, children }: UserToolsProps) {
    const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
    const booksInBag = useSelector((state: RootState) => state.auth.bag);
    const userTools = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event:  MouseEvent) => {    // Обработчик для клика вне меню для его закрытия
            if (userTools.current && !userTools.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClick = (item: IItem) => {   // В зависимости от предназначения иконки назначаем ей обработчик
        switch (item.action) {
            case 'dropdown':
                setMenuOpen(v => !v);
                break;
            case 'redirect':
                if (item.name === 'bag') {
                    handleItemClick && handleItemClick();
                    handleRoutClick && handleRoutClick(item.name);
                }  
                break;
            default:
                break;
        }
    };

    return (
        <div ref={userTools} className={styles.userTools}>
            {itemsTools.map((item, index) => (
                <button
                    key={index}
                    className={styles.btnTool}
                    onClick={() => handleClick(item)}
                >
                    <Image
                        width={15}
                        height={15}
                        src={item.icon}
                        alt={item.icon}
                    />
                    { item.name === 'bag' && booksInBag.length ? <Indicator currentAccount={booksInBag.length}/> : null }
                </button>
            ))}
            { menuOpen && children }
        </div>
    );
}