import { useDispatch } from 'react-redux';
import { RootDispatch } from '@/redux/store';
import Link from 'next/link';
import { signOut } from '@/redux/slices/authSlice';
import styles from './dropdownMenu.module.scss';
import transformPageNameToPath from '@/utils/transformName';

export interface DropdownMenuProps {
    itemsMenu: string[];
}

export default function DropdownMenu ({ itemsMenu }: DropdownMenuProps) {
    const dispatch = useDispatch<RootDispatch>();
    
    const handleItemClick = (item: string) => {
        if (item === 'sign out') {
            dispatch(signOut());
        }
    };

    return (
        <ul className={styles.list}>
            {itemsMenu.map((item, index) => (
                <li key={index} className={styles.item}>
                    <Link href={item === 'books' || item === 'sign out' ? '/' : transformPageNameToPath(item)} className={styles.link}>
                        <span onClick={() => handleItemClick(item)}>{item}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};
