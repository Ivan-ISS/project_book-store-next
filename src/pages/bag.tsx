import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styles from '../styles/pageStyles/bag.module.scss';
import Layout from '../Components/Layout/layout';
import ShoppingBag from '../Components/ShoppingBag/shoppingBag';
import Button from '../Components/Common/Button/button';
import formatToPrice from '@/utils/formatToPrice';

export default function Bag() {
    const [ total, setTotal ] = useState<number>(0);
    const booksInBag = useSelector((state: RootState) => state.auth.bag);

    useEffect(() => {
        let summ = 0;
        booksInBag.map((bookInbag) => {
            if (bookInbag.retailPrice) {
                summ = summ + bookInbag.retailPrice.amount * bookInbag.quantity;
            }
        });
        setTotal(summ);
    }, [booksInBag]);

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
                />
            </section>
        </Layout>
    );
}