import styles from './indicator.module.scss';
import { HTMLAttributes } from 'react';

export interface IndicatorProps extends HTMLAttributes<HTMLDivElement> {
    currentAccount: number;
}

export default function Indicator({ currentAccount, ...props }: IndicatorProps) {

    return (
        <div {...props} className={styles.indicator}>
            {currentAccount}
        </div>
    );
}