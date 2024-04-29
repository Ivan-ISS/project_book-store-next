import styles from './profileMenuItems.module.scss';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '@/redux/store';
import { signOut } from '@/redux/slices/authSlice';
import Link from 'next/link';

export interface ProfileMenuItemsProps {
    itemMenu: string;
}

export default function ProfileMenuItems ({ itemMenu }: ProfileMenuItemsProps) {
    const dispatch = useDispatch<RootDispatch>();
    
    const handleItemClick = (itemMenu: string) => {
        if (itemMenu === 'sign out') {
            dispatch(signOut());
        }
    };

    return (
        <Link href={itemMenu === 'sign out' ? '/' : itemMenu} className={styles.link}>
            <span onClick={() => handleItemClick(itemMenu)}>{itemMenu}</span>
        </Link>
    );
};
