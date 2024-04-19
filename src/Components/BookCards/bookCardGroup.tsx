import { ButtonHTMLAttributes } from 'react';
import styles from './bookCard.module.scss';
import { IBookData } from '@/types/typeBook';
import BookCard from './bookCard';
import { categories } from '@/data';

export interface BookCardGroupProps extends ButtonHTMLAttributes<HTMLDivElement>{
    booksData: IBookData[];
}

/* export async function getStaticProps() {

    const response = await fetch(`api/books?subject=${categories[0].nameInRequest}`);
    const receivedData: BookCardGroupProps = await response.json();
  
    return {
        props: { booksData: receivedData }
    };
} */

export default function BookCardGroup({ booksData, ...props }: BookCardGroupProps) {

    return (
        <div {...props} className={styles.setBooks}>
            {booksData.map((bookData, index) => (
                <li key={index}>
                    <BookCard bookData={bookData}/>
                </li>
            ))}
        </div>
    );
};