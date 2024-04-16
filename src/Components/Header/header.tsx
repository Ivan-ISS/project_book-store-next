import { PropsWithChildren } from 'react';
import styles from './header.module.scss';

export default function Header({ children }: PropsWithChildren) {

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
}