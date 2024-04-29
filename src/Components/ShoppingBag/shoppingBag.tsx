import styles from './shoppingBag.module.scss';
import { columnsBag } from '@/data';
import { IBookDataInBag } from '@/types/typeBook';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '@/redux/store';
import { setQuantity } from '@/redux/slices/authSlice';
import Counter from '../Common/Counter/counter';
import BookCardInBag from '../BookCardInBag/bookCardInBag';
import formatToPrice from '@/utils/formatToPrice';

export interface ShoppingBagProps {
    booksInBag: IBookDataInBag[];
}

export default function ShoppingBag({ booksInBag }: ShoppingBagProps) {
    const dispatch = useDispatch<RootDispatch>();

    const handleClickCounter = (id: string, quantity: number) => {
        dispatch(setQuantity({id, quantity}));
    };

    return (
        <div className={styles.shoppingBag}>
            <h2 className={styles.title}>Shopping cart</h2>
            <div className={styles.setGoods}>
                {columnsBag.map((item, index) => (
                    <p key={index} className={styles.nameColumn}>{item}</p>
                ))}
                {booksInBag.map((bookInBag, index) => (
                    <Fragment key={index}>
                        <BookCardInBag bookInBag={bookInBag}/>
                        <Counter
                            idEntity={bookInBag.id}
                            currentAccount={bookInBag.quantity}
                            indicatorOfChange={booksInBag.length}
                            handleClickCounter={(id, quantity) => handleClickCounter(id, quantity)}
                        />
                        <p className={styles.price}>
                            {
                                `${bookInBag.retailPrice
                                ? formatToPrice((bookInBag.retailPrice.amount * bookInBag.quantity).toFixed(2)) + ' ' + bookInBag.retailPrice.currencyCode
                                : '---'}`
                            }
                        </p>
                        <p className={styles.delivery}>Shipping: delivery</p>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};