import { ButtonHTMLAttributes } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styles from './bookCard.module.scss';
import { IBookData } from '@/types/typeBook';
import Modal from '../Common/Modal/modal';
import ContentAuthModal from '../AuthModal/contentAuthModal';
import usePortal from '@/hooks/usePortal';
import BookCard from './bookCard';

export interface BookCardGroupProps extends ButtonHTMLAttributes<HTMLDivElement>{
    booksData: IBookData[];
}

export default function BookCardGroup({ booksData, ...props }: BookCardGroupProps) {
    const { isOpen: isOpenPortal, openPortal, closePortal, Portal } = usePortal();
    const token = useSelector((state: RootState) => state.auth.token);

    return (
        <div {...props} className={styles.setBooks}>
            {booksData.map((bookData, index) => (
                <BookCard key={index} bookData={bookData} token={token} handleClickBtn={openPortal}/>
            ))}
            { !token && isOpenPortal && <Portal><Modal closeModal={closePortal} content={<ContentAuthModal/>}/></Portal> }
        </div>
    );
};