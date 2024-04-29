import styles from './bookCard.module.scss';
import { IBookData } from '@/types/typeBook';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, RootDispatch } from '@/redux/store';
import { addToBag } from '@/redux/slices/authSlice';
import Image from 'next/image';
import Modal from '../Common/Modal/modal';
import Button from '../Common/Button/button';
import AuthModalContent from '../Common/Modal/AuthModalContent/authModalContent';
import usePortal from '@/hooks/usePortal';
import checkingBookInBag from '@/utils/checkingBookInBag';

export interface BookCardProps {
    bookData: IBookData;
}

export default function BookCard({ bookData }: BookCardProps) {
    const { imageCoverLinks, author, title, review, rating, description, retailPrice } = bookData;
    const { isOpenPortal, openPortal, closePortal, Portal } = usePortal();
    const dispatch = useDispatch<RootDispatch>();
    const token = useSelector((state: RootState) => state.auth.token);
    const booksInBag = useSelector((state: RootState) => state.auth.bag);

    const handleClickBtn = (bookData: IBookData) => {
        if (token !== null && !checkingBookInBag(bookData, booksInBag)) {
            dispatch(addToBag(bookData));
        }
        if (!token) {
            openPortal();
        }
    };

    return (
        <div className={styles.bookCard}>
            <div className={styles.cover}>
                <Image
                    className={styles.coverImg}
                    src={`${imageCoverLinks ? imageCoverLinks : '/images/png/placeholder.png'}`}
                    width={636}
                    height={900}
                    alt="Book cover"
                />
            </div>
            <div className={styles.info}>
                <div className={styles.data}>
                    <p className={styles.author}>{author ? author?.join(', ') : 'Author unknown'}</p>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.rating}>
                        <div className={styles.stars}>
                            <svg width="60" height="11" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="m5.8718,0.03648l1.80568,3.51469l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147l0,0.00001z
                                    m11.92307,0.03647l1.80568,3.5147l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147z
                                    m12.10257,0.03648l1.80568,3.5147l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147z
                                    m12.28205,0.03647l1.80568,3.5147l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147z
                                    m12.33333,0.03648l1.80568,3.5147l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147z" 
                                    fill={`${review ? '#f2c94c' : '#eeedf5'}`}
                                    clipPath={`inset(0 ${rating ? (1 - rating / 5) * 100 : 0}% 0 0)`} id="svg_1"
                                />
                            </svg>
                        </div>
                        <span className={styles.review}>{review ? review + ' review' : 'No views'}</span>
                    </div>
                </div>
                <p className={styles.description}>{description ? description : 'No description'}</p>
                <span className={styles.price}>{retailPrice ? retailPrice.amount + ' ' + retailPrice.currencyCode : null}</span>
                <Button
                    text={checkingBookInBag(bookData, booksInBag) ? 'In the cart' : 'Buy now'}
                    fontSize={'small'}
                    color={'transparent'}
                    onClick={() => handleClickBtn(bookData)}
                    isDisabled={checkingBookInBag(bookData, booksInBag)}
                />
            </div>
            { !token && isOpenPortal && <Portal><Modal closeModal={closePortal} insert={<AuthModalContent/>}/></Portal> }
        </div>
    );
}