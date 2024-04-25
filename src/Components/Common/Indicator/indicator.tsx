import styles from './indicator.module.scss';

export interface IndicatorProps {
    currentAccount: number;
}

export default function Indicator({ currentAccount }: IndicatorProps) {

    return (
        <div className={styles.indicator}>
            {currentAccount}
        </div>
    );
}