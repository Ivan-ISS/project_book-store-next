import styles from './layout.module.scss';
import { itemsTools } from '@/data';
import { itemsNavigation } from '@/data';
import { itemsProfileMenu } from '@/data';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Modal from '../Common/Modal/modal';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Navigation from '../Common/Navigation/navigation';
import UserTools from '../Common/UserTools/userTools';
import BurgerButton from '../Common/BurgerButton/burgerButton';
import DropdownMenu from '../Common/DropdownMenu/dropdownMenu';
import LoginMenu from '../Common/LoginMenu/loginMenu';
import AuthModalContent from '../Common/Modal/AuthModalContent/authModalContent';
import usePortal from '@/hooks/usePortal';

import { Montserrat } from 'next/font/google';
import { Open_Sans } from 'next/font/google';

const montserratFont = Montserrat({
    weight: ['400', '500', '600', '700', '900'],
    subsets: ['latin', 'cyrillic'],
});

const openSansFont = Open_Sans({
    weight: ['400'],
    subsets: ['latin', 'cyrillic'],
});

export default function Layout({ children }: PropsWithChildren) {
    const { isOpen: isOpenPortal, openPortal, closePortal, Portal } = usePortal();
    const token = useSelector((state: RootState) => state.auth.token);
    const prevToken = useRef(token);
    const { push } = useRouter();

    const handleRoutClick = (item: string) => { // Возможность переходить в корзину после авторизации
        if (token !== null) push(item);
    };

    useEffect(() => {  // Перенаправдение на страницу профиля после авторизации
        if (token !== prevToken.current && token !== null) {
            push('/profile');
        }
        prevToken.current = token;
    }, [token, push]);

    return (
        <>
            <Head>
                <title>Book store</title>
                <meta name="description" content="Book store Next.js project" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={`${styles.layout} ${montserratFont.className}`}>
                <Header>
                    <BurgerButton>
                        <DropdownMenu itemsMenu={itemsNavigation} insert={'burgerMenu'}/>
                    </BurgerButton>
                    <Link href ="/" className={styles.logo}>
                        <div>Bookshop</div>
                    </Link>
                    <Navigation itemsNavigation={itemsNavigation}/>
                    <UserTools
                        itemsTools={itemsTools}
                        handleItemClick={openPortal}
                        handleRoutClick={handleRoutClick}
                    >
                        { token ? <DropdownMenu itemsMenu={itemsProfileMenu} insert={'profileMenu'}/> : <LoginMenu position='absolute'/> }
                    </UserTools>
                    { !token && isOpenPortal && <Portal><Modal closeModal={closePortal} insert={<AuthModalContent/>}/></Portal> }
                </Header>
                <main className={styles.main}>
                    <div className={styles.container}>{children}</div>
                </main>
                <Footer/>
            </div>
        </>
    );
}