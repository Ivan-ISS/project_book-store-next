import { useState } from 'react';
import styles from './contentAuthModal.module.scss';
import LoginMenu from '../Common/LoginMenu/loginMenu';

export default function ContentAuthModal() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <div className={styles.contentAuth}>
            <p className={styles.text}>
                Для работы с корзиной и совершения покупок<br/>
                <span className={styles.attention} onClick={() => setMenuOpen((v) => !v)}>&gt;&gt;&gt; авторизуйтесь &lt;&lt;&lt;</span>
            </p>
            {menuOpen && <LoginMenu position='relative'/>}
        </div>
    );
}