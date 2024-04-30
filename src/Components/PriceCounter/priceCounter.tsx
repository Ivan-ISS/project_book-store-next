import styles from './priceCounter.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import formatToPrice from '@/utils/formatToPrice';

export default function PriceCounter() {
    const [ total, setTotal ] = useState<number>(0);
    const [ currencyCode, setCurrencyCode ] = useState<string | null>(null);
    const booksInBag = useSelector((state: RootState) => state.auth.bag);

    useEffect(() => {
        let summ = 0;
        booksInBag.map((bookInbag) => {
            if (bookInbag.retailPrice) {
                summ = summ + bookInbag.retailPrice.amount * bookInbag.quantity;
                setCurrencyCode(bookInbag.retailPrice.currencyCode);
            }
        });
        setTotal(summ);
    }, [booksInBag]);

    return (
        <p className={styles.totalPrice}>
            {`Total Price: ${formatToPrice(total.toFixed(2))} ${currencyCode ? currencyCode : ''}`}
        </p>
    );
}