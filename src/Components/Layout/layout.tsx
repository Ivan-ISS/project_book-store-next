import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import styles from './layout.module.scss';
import Head from 'next/head';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Navigation from '../Common/Navigation/navigation';
import UserTools from '../Common/UserTools/userTools';
import BurgerButton from '../Common/BurgerButton/burgerButton';
import DropdownMenu from '../Common/DropdownMenu/dropdownMenu';
import LoginMenu from '../Common/LoginMenu/loginMenu';
import { itemsNavigation } from '@/data';
import { itemsTools } from '@/data';
import { itemsProfileMenu } from '@/data';

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
    const token = useSelector((state: RootState) => state.auth.token);

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
                        <DropdownMenu itemsMenu={itemsNavigation}/>
                    </BurgerButton>
                    <Link href ="/" className={styles.logo}>
                        <div>Bookshop</div>
                    </Link>
                    <Navigation itemsNavigation={itemsNavigation}/>
                    <UserTools itemsTools={itemsTools}>
                        {token ? <DropdownMenu itemsMenu={itemsProfileMenu}/> : <LoginMenu/>}
                    </UserTools>
                </Header>
                <main className={styles.main}>
                    <div className={styles.container}>{children}</div>
                </main>
                <Footer/>
            </div>
        </>
    );
}