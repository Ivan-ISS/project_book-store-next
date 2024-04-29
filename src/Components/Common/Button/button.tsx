import styles from './button.module.scss';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text: string;
    fontSize: 'big' | 'small';
    color: 'transparent' | 'purple';
    isDisabled?: boolean;
}

export default function Button({ text, fontSize, color, isDisabled, ...props }: ButtonProps) {

    const handleClickBtn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) {
            props.onClick(e);
        }
    };

    return (
        <button
            {...props}
            onClick={handleClickBtn}
            className={`${styles.button} ${isDisabled ? styles.disabled : null} ${styles[color]} ${styles[fontSize]}`}
            disabled={isDisabled}
        >
            {text}
        </button>
    );
};