import styles from './bookCard.module.scss';
import { IBookData } from '@/types/typeBook';
import { HTMLAttributes } from 'react';
import BookCard from './bookCard';

export interface BookCardGroupProps extends HTMLAttributes<HTMLDivElement>{
    booksData: IBookData[];
}

export default function BookCardGroup({ booksData, ...props }: BookCardGroupProps) {

    return (
        <div {...props} className={styles.setBooks}>
            {booksData.map((bookData, index) => (
                <BookCard key={index} bookData={bookData}/>
            ))}
        </div>
    );
};