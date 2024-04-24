import { InputHTMLAttributes } from 'react';
import styles from './input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    type: string;
    isValid?: 'valid' | 'invalid';
}

export default function Input({ placeholder, type, isValid, ...props }: InputProps) {

    return (
        <div className={styles.field}>
            <label htmlFor={type} className={styles.label}>{type}</label><br/>
            <input
                {...props}
                id={type}
                type={type}
                className={`${styles.input} ${isValid && styles[isValid]}`}
                placeholder={`Enter ${type}`}
            />
        </div>
    );
}