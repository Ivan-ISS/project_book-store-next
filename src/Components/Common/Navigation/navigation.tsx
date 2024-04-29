import styles from './navigation.module.scss';
import Link from 'next/link';
import transformPageNameToPath from '@/utils/transformName';

export interface NavigationProps {
    itemsNavigation: string[];
}

export default function Navigation({ itemsNavigation }: NavigationProps) {

    return (
        <nav className={styles.navigation}>
            <ul className={styles.list}>
                {itemsNavigation.map((item, index) => (
                    <li key={index} className={styles.item}>
                        <Link
                            href={item === 'books' ? '/' : transformPageNameToPath(item)} className={styles.link}>
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}