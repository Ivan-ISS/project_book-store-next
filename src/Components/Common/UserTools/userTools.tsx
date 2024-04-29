import styles from './userTools.module.scss';
import { IItem } from '@/data';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Modal from '../../Common/Modal/modal';
import AuthModalContent from '../../Common/Modal/AuthModalContent/authModalContent';
import Indicator from '../Indicator/indicator';
import usePortal from '@/hooks/usePortal';

export interface UserToolsProps {
    itemsTools: IItem[];
    children?: JSX.Element;
}

export default function UserTools({ itemsTools, children }: UserToolsProps) {
    const { isOpenPortal, openPortal, closePortal, Portal } = usePortal();
    const [ menuOpen, setMenuOpen ] = useState<boolean>(false);
    const booksInBag = useSelector((state: RootState) => state.auth.bag);
    const token = useSelector((state: RootState) => state.auth.token);
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

    const handleClick = (item: IItem) => {   // В зависимости от предназначения иконки назначаем ей обработчик
        switch (item.action) {
            case 'dropdown':
                setMenuOpen(v => !v);
                break;
            case 'redirect':
                if (item.name === 'bag') {
                    openPortal();
                    if (token !== null) push(item.name);  // Возможность переходить в корзину после авторизации
                }  
                break;
            default:
                break;
        }
    };

    return (
        <div ref={userTools} className={styles.userTools}>
            {itemsTools.map((item, index) => (
                <button key={index} className={styles.btnTool} onClick={() => handleClick(item)}>
                    <Image src={item.icon} width={15} height={15} alt={item.icon}/>
                    { item.name === 'bag' && booksInBag.length ? <Indicator currentAccount={booksInBag.length}/> : null }
                </button>
            ))}
            { menuOpen && children }
            { !token && isOpenPortal && <Portal><Modal closeModal={closePortal} insert={<AuthModalContent/>}/></Portal> }
        </div>
    );
}