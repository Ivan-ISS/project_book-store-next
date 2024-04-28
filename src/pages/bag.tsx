import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, RootDispatch } from '@/redux/store';
import { fetchOrder } from '@/redux/slices/orderSlice';
import styles from '../styles/pageStyles/bag.module.scss';
import Layout from '../Components/Layout/layout';
import ShoppingBag from '../Components/ShoppingBag/shoppingBag';
import Button from '../Components/Common/Button/button';
import Modal from '../Components/Common/Modal/modal';
import usePortal from '@/hooks/usePortal';
import formatToPrice from '@/utils/formatToPrice';

export default function Bag() {
    const [ total, setTotal ] = useState<number>(0);
    const booksInBag = useSelector((state: RootState) => state.auth.bag);
    const email = useSelector((state: RootState) => state.auth.userData.email);
    const message = useSelector((state: RootState) => state.order.message);
    const dispatch = useDispatch<RootDispatch>();
    const { isOpen: isOpenPortal, openPortal, closePortal, Portal } = usePortal();

    useEffect(() => {
        let summ = 0;
        booksInBag.map((bookInbag) => {
            if (bookInbag.retailPrice) {
                summ = summ + bookInbag.retailPrice.amount * bookInbag.quantity;
            }
        });
        setTotal(summ);
    }, [booksInBag]);

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
                <p className={styles.totalPrice}>
                    {`Total Price: ${formatToPrice(total.toFixed(2))} RUB`}
                </p>
                <Button
                    text={'Checkout'}
                    fontSize={'small'}
                    color={'transparent'}
                    isDisabled={!booksInBag.length}
                    onClick={handleClick}
                />
                { message && isOpenPortal && <Portal><Modal closeModal={closePortal} content={<div>{message}</div>}/></Portal> }
            </section>
        </Layout>
    );
}