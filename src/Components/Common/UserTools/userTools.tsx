import { useState, useEffect, useRef, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './userTools.module.scss';
import Indicator from '../Indicator/indicator';

export interface IItem {
    icon: string;
    name: string;
    action: 'dropdown' | 'none' | 'redirect';
    route?: string;
}

export interface UserToolsProps {
    itemsTools: IItem[];
    token?: string | null;
    children?: JSX.Element;
    Modal?: ReactNode;
    handleClickBag?: () => void;
}

export default function UserTools({ itemsTools, Modal, token, handleClickBag, children }: UserToolsProps) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const booksInBag = useSelector((state: RootState) => state.auth.bag);
    const userTools = useRef<HTMLDivElement>(null);
    const { push } = useRouter();

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

    const handleItemClick = (item: IItem) => {   // В зависимости от предназначения иконки назначаем ей обработчик
        switch (item.action) {
            case 'dropdown':
                setMenuOpen(v => !v);
                break;
            case 'redirect':
                if (handleClickBag) {
                    handleClickBag();
                }
                if (token !== null) {
                    push(item.route as string);
                }
                break;
            default:
                break;
        }
    };

    return (
        <div ref={userTools} className={styles.userTools}>
            {itemsTools.map((item, index) => (
                <button key={index} className={styles.btnTool} onClick={() => handleItemClick(item)}>
                    <Image width={15} height={15} src={item.icon} alt={item.icon}/>
                    {item.name === 'bag' && booksInBag.length ? <Indicator currentAccount={booksInBag.length}/> : null}
                </button>
            ))}
            {
                menuOpen
                ? children
                : null
            }
            { Modal && Modal }
        </div>
    );
}