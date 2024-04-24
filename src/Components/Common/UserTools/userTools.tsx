import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './userTools.module.scss';

export interface IItem {
    icon: string;
    action: 'dropdown' | 'none' | 'redirect';
    route?: string;
}

export interface UserToolsProps {
    itemsTools: IItem[];
    children?: JSX.Element;
}

export default function UserTools({ itemsTools, children }: UserToolsProps) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
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
                push(item.route as string);
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
                </button>
            ))}
            {
                menuOpen
                ? children
                : null
            }
        </div>
    );
}