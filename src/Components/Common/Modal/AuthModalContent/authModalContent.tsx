import styles from './authModalContent.module.scss';
import { useState } from 'react';
import LoginMenu from '../../LoginMenu/loginMenu';

export default function AuthModalContent() {
    const [ menuOpen, setMenuOpen ] = useState<boolean>(false);

    return (
        <div className={styles.contentAuth}>
            <p className={styles.text}>
                To work with the cart and make purchases,<br/>
                <span className={styles.attention} onClick={() => setMenuOpen((v) => !v)}>
                    &gt;&gt;&gt; authorize &lt;&lt;&lt;
                </span>
            </p>
            { menuOpen && <LoginMenu position='relative'/> }
        </div>
    );
}