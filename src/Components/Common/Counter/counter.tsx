import styles from './counter.module.scss';

export interface CounterProps {
    currentAccount: number;
}

export default function Counter({ currentAccount }: CounterProps) {

    return (
        <div className={styles.counter}>
            {currentAccount}
        </div>
    );
}