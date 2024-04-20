import { useSelector, useDispatch } from 'react-redux';
import { RootState, RootDispatch } from '@/redux/store';
import { fetchBooks, setCurrentCategory } from '@/redux/slices/booksSlice';
import styles from './categories.module.scss';

export interface ICategory {
    nameCategory: string;
    nameInRequest: string;
}

export interface CategoriesProps {
    categories: ICategory[];
}

export default function Categories({ categories }: CategoriesProps) {
    const dispatch = useDispatch<RootDispatch>();
    const currentCategory = useSelector((state: RootState) => state.books.currentCategory);

    return (
        <ul className={styles.listCategories}>
            {categories.map((category, index) => (
                <li key={index} className={styles.itemCategory}>
                    <button
                        className={`${styles.btnCategory} ${category.nameCategory === currentCategory ? styles.active : ''}`}
                        /* onClick={() => { dispatch(fetchBooks(category.nameInRequest)); dispatch(setCurrentCategory(category.nameCategory)); }} */
                    >
                        {category.nameCategory}
                    </button>
                </li>
            ))}
        </ul>
    );
}