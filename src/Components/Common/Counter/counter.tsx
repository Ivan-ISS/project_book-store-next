import { ButtonHTMLAttributes, useState } from 'react';
import styles from './counter.module.scss';

export interface CounterProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    idEntity: string;
    currentAccount: number;
    handleClickCounter: (id: string, quantity: number) => void;
}

export default function Counter({ idEntity, currentAccount, handleClickCounter, ...props }: CounterProps) {
    let [ count, setCount ] = useState(currentAccount);

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
            <button {...props} onClick={handleClickPlus}>+</button>
            <div>{count}</div>
            <button {...props} onClick={handleClickMinus}>-</button>
        </div>
    );
}