import BookCard from './bookCard';
import styles from './bookCard.module.scss';

/* export interface BookCardGroupProps {
    ticketsData: ITicket[],
} */

export default function BookCardGroup({/* { ticketsData }: BookCardGroupProps */...props}) {

    return (
        <div {...props} className={styles.setBooks}>
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <li key={index}>
                    <BookCard/>
                </li>
            ))}
        </div>
    );
};