import styles from './burgerMenuItems.module.scss';
import Link from 'next/link';
import transformPageNameToPath from '@/utils/transformName';

export interface burgerMenuItemsProps {
    itemMenu: string;
}

export default function burgerMenuItems ({ itemMenu }: burgerMenuItemsProps) {

    return (
        <Link href={itemMenu === 'books' ? '/' : transformPageNameToPath(itemMenu)} className={styles.link}>
            <span>{itemMenu}</span>
        </Link>
    );
};
