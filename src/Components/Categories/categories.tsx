import { useSelector, useDispatch } from 'react-redux';
import { RootState, RootDispatch } from '@/redux/store';
import { fetchBooks, setCurrentCategory, setBooksData, setStartIndex } from '@/redux/slices/booksSlice';
import styles from './categories.module.scss';
import { defStartIndex, defMaxResults } from '@/data';

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

    const handleClickCategory = (category: ICategory) => {
        dispatch(setStartIndex(defMaxResults));
        dispatch(setBooksData([]));
        dispatch(setCurrentCategory(category.nameCategory));
        dispatch(fetchBooks({subject: category.nameInRequest, startIndex: defStartIndex}));
    };

    return (
        <ul className={styles.listCategories}>
            {categories.map((category, index) => (
                <li key={index} className={styles.itemCategory}>
                    <button
                        className={`${styles.btnCategory} ${category.nameCategory === currentCategory ? styles.active : ''}`}
                        onClick={() => handleClickCategory(category)}
                    >
                        {category.nameCategory}
                    </button>
                </li>
            ))}
        </ul>
    );
}