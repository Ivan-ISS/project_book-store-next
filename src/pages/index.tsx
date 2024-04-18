// import Layout from "@/components/Layout/layout";
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setCurrentPage } from '@/redux/slices/booksSlice';
import { RootState, RootDispatch } from '@/redux/store';
import Layout from '../Components/Layout/layout';
import Slider from '../Components/Common/Slider/slider';
import PromoCard from '../Components/Common/PromoCard/promoCard';
import Categories from '../Components/Categories/categories';
import Button from '../Components/Common/Button/button';
import BookCardGroup from '@/Components/BookCards/bookCardGroup';
import { slides } from '@/data';
import { categories } from '@/data';
import styles from '../styles/pageStyles/index.module.scss';

export default function Home() {
    const dispatch = useDispatch<RootDispatch>();
    const setCurrentPage = useSelector((state: RootState) => state.books.currentPage);
    const books = useSelector((state: RootState) => state.books.books);

    /* const fetchBooks = async () => {
            const res = await fetch(`api/books?subject=${'business'}`);
            const data = await res.json();
            console.log(data);
            return data;
        }; */

    const handleClick = () => {
        dispatch(fetchBooks('business'));
    };

    const click = () => {
        console.log('here');
    };

    return (
        <Layout>
            <section className={styles.performance}>
                <Slider slides={slides}/>
                <PromoCard style={{position: 'absolute', top: '10%', right: '-5%'}} color='cornflower' text='Change old book on new'/>
                <PromoCard style={{position: 'absolute', top: '50%', right: '-10%'}} color='pink' text='Top 100 books 2022'/>
            </section>
            <section className={styles.showcase}>
                <Categories categories={categories}/>
                <div className={styles.goods}>
                    <BookCardGroup/>
                    <Button isDisabled={false} text={'BUY NOW'}/>
                </div>
            </section>
            Контент для главной страницы
            <button onClick={() => handleClick()}>getBooks</button>
            {
                books.map((book: any, index: any) => (
                    <div key={index}>{book}</div>
                ))
            }
        </Layout>
    );
}