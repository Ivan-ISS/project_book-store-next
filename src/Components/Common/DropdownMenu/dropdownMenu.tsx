import styles from './dropdownMenu.module.scss';
import { HTMLAttributes } from 'react';
import BurgerMenuItems from './burgerMenuItems';
import ProfileMenuItems from './profileMenuItems';

export interface DropdownMenuProps extends HTMLAttributes<HTMLUListElement> {
    itemsMenu: string[];
    insert: 'burgerMenu' | 'profileMenu';
}

export default function DropdownMenu ({ itemsMenu, insert, ...props }: DropdownMenuProps) {

    return (
        <ul {...props} className={styles.list}>
            {itemsMenu.map((item, index) => (
                <li key={index} className={styles.item}>
                    { insert === 'burgerMenu' && <BurgerMenuItems itemMenu={item}/> }
                    { insert === 'profileMenu' && <ProfileMenuItems itemMenu={item}/> }
                </li>
            ))}
        </ul>
    );
};
