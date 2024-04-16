import Link from 'next/link';
import styles from './dropdownMenu.module.scss';

export interface DropdownMenuProps {
    itemsMenu: string[];
}

export default function DropdownMenu ({ itemsMenu }: DropdownMenuProps) {
    
    return (
        <ul className={styles.list}>
            {itemsMenu.map((item, index) => (
                <li key={index} className={styles.item}>
                    <Link href={item === 'books' ? '/' : '#'} className={styles.link}>
                        {item}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
