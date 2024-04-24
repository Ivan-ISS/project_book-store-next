import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    isDisabled?: boolean;
    text: string;
    fontSize: 'big' | 'small';
    color: 'transparent' | 'purple';
}

export default function Button({ isDisabled, text, fontSize, color, ...props }: ButtonProps) {

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) {
            props.onClick(e);
            console.log(e);
        }
    };

    return (
        <button
            {...props}
            onClick={handleClick}
            className={`${styles.button} ${isDisabled ? styles.disabled : null} ${styles[color]} ${styles[fontSize]}`}
            disabled={isDisabled}
        >
            {text}
        </button>
    );
};