import styles from '../styles/pageStyles/bag.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, RootDispatch } from '@/redux/store';
import { fetchOrder } from '@/redux/slices/orderSlice';
import Layout from '../Components/Layout/layout';
import ShoppingBag from '../Components/ShoppingBag/shoppingBag';
import Button from '../Components/Common/Button/button';
import Modal from '../Components/Common/Modal/modal';
import usePortal from '@/hooks/usePortal';
import PriceCounter from '../Components/PriceCounter/priceCounter';

export default function Bag() {
    const { isOpenPortal, openPortal, closePortal, Portal } = usePortal();
    const dispatch = useDispatch<RootDispatch>();
    const email = useSelector((state: RootState) => state.auth.userData.email);
    const message = useSelector((state: RootState) => state.order.message);
    const booksInBag = useSelector((state: RootState) => state.auth.bag);

    const handleClick = () => {
        if (email && booksInBag) {
            dispatch(fetchOrder({ email: email, bag: booksInBag }));
            openPortal();
        }
    };

    return (
        <Layout>
            <section className={styles.goods}>
                <ShoppingBag booksInBag={booksInBag}/>
            </section>
            <section className={styles.orderPanel}>
                <PriceCounter/>
                <Button
                    text={'Checkout'}
                    fontSize={'small'}
                    color={'transparent'}
                    isDisabled={!booksInBag.length}
                    onClick={handleClick}
                />
                { message && isOpenPortal && <Portal><Modal closeModal={closePortal} insert={<div>{message}</div>}/></Portal> }
            </section>
        </Layout>
    );
}