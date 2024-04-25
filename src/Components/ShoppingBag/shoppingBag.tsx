import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '@/redux/store';
import { setQuantity } from '@/redux/slices/authSlice';
import styles from './shoppingBag.module.scss';
import BookCardInBag from '../BookCardInBag/bookCardInBag';
import { IBookDataInBag } from '@/types/typeBook';
import Counter from '../Common/Counter/counter';
import { columnsBag } from '@/data';

export interface ShoppingBagProps{
    booksInBag: IBookDataInBag[];
}

export default function ShoppingBag({ booksInBag, ...props }: ShoppingBagProps) {
    const dispatch = useDispatch<RootDispatch>();

    const handleClickCounter = (id: string, quantity: number) => {
        dispatch(setQuantity({ id, quantity }));
    };

    return (
        <div {...props} className={styles.shoppingBag}>
            <h2 className={styles.title}>Shopping cart</h2>
            <div className={styles.setGoods}>
                {columnsBag.map((item, index) => (
                    <p key={index} className={styles.nameColumn}>{item}</p>
                ))}
                {booksInBag.map((bookInBag, index) => (
                    <Fragment key={index}>
                        <BookCardInBag bookInBag={bookInBag}/>
                        <Counter
                            currentAccount={bookInBag.quantity}
                            idEntity={bookInBag.id}
                            handleClickCounter={(id, quantity) => handleClickCounter(id, quantity)}
                        />
                        <p>{`${bookInBag.retailPrice?.amount} ${bookInBag.retailPrice?.currencyCode}`}</p>
                        <p>Shipping: delivery</p>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};