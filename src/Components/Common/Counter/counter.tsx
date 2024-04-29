import styles from './counter.module.scss';
import { ButtonHTMLAttributes, useState, useEffect } from 'react';
import Image from 'next/image';
import iconPlus from '@/images/svg/plus.svg';
import iconMinus from '@/images/svg/minus.svg';

export interface CounterProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    idEntity: string;
    currentAccount: number;
    indicatorOfChange: number;
    handleClickCounter: (id: string, quantity: number) => void;
}

export default function Counter({ idEntity, currentAccount, indicatorOfChange, handleClickCounter, ...props }: CounterProps) {
    let [ count, setCount ] = useState(currentAccount);

    useEffect(() => {
        setCount(currentAccount);
    }, [currentAccount, indicatorOfChange]);

    const handleClickPlus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) {
            props.onClick(e);
        }
        setCount(count += 1);
        handleClickCounter(idEntity, count);    // Отдаем во вне из компонента значения в переданую функцию
    };

    const handleClickMinus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) {
            props.onClick(e);
        }
        setCount(count -= 1);
        handleClickCounter(idEntity, count);    // Отдаем во вне из компонента значения в переданую функцию
    };

    return (
        <div className={styles.counter}>
            <button {...props} className={styles.btnChange} onClick={handleClickMinus}>
                <Image src={iconMinus} width={22} height={25} alt="Plus" />
            </button>
            <div className={styles.quantity}>{count}</div>
            <button {...props} className={styles.btnChange} onClick={handleClickPlus}>
                <Image src={iconPlus} width={22} height={25} alt="Plus" />
            </button>
        </div>
    );
}