// import Layout from "@/components/Layout/layout";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBooksData, fetchBooks, setStartIndex, setCurrentCategory } from '@/redux/slices/booksSlice';
import { RootState, RootDispatch } from '@/redux/store';
import styles from '../styles/pageStyles/index.module.scss';
import { IDataResponse, IBookData } from '@/types/typeBook';
import Layout from '../Components/Layout/layout';
import Slider from '../Components/Common/Slider/slider';
import PromoCard from '../Components/Common/PromoCard/promoCard';
import Categories from '../Components/Categories/categories';
import Button from '../Components/Common/Button/button';
import BookCardGroup from '@/Components/BookCards/bookCardGroup';
import { slides, categories, defaultCategory, defStartIndex, defMaxResults } from '@/data';
import prepareData from '@/utils/prepareData';

export interface HomeProps {
    receivedData: IBookData[];
}

export async function getStaticProps() {

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${defaultCategory.nameInRequest}&startIndex=${defStartIndex}&maxResults=${defMaxResults}`);
    const data: IDataResponse = await response.json();

    return {
        props: { receivedData: prepareData(data) }
    };
}

/* console.log('UserData:', localStorage.getItem('persist:root'));
const a = localStorage.getItem('persist:root');
if (a) console.log('PARSE ', JSON.parse(a)); */

export default function Home({ receivedData }: HomeProps) {
    const dispatch = useDispatch<RootDispatch>();
    const startIndex = useSelector((state: RootState) => state.books.startIndex);
    const booksData = useSelector((state: RootState) => state.books.booksData);
    const currentCategory = useSelector((state: RootState) => state.books.currentCategory);

    const handleLoadMore = () => {
        dispatch(fetchBooks({subject: currentCategory, startIndex: startIndex}));
        dispatch(setStartIndex(startIndex + defMaxResults));
    };

    useEffect(() => {
        dispatch(setBooksData(receivedData));
        dispatch(setStartIndex(defMaxResults));

        if (currentCategory !== defaultCategory.nameCategory) {
            dispatch(setCurrentCategory(defaultCategory.nameCategory));
        }
    }, []);

    return (
        <Layout>
            <section className={styles.performance}>
                <Slider slides={slides}/>
                <PromoCard style={{position: 'absolute', top: '10%', right: '-5%'}} color={'cornflower'} text={'Change old book on new'}/>
                <PromoCard style={{position: 'absolute', top: '50%', right: '-10%'}} color={'pink'} text={'Top 100 books 2022'}/>
            </section>
            <section className={styles.showcase}>
                <Categories categories={categories}/>
                <div className={styles.goods}>
                    <BookCardGroup booksData={booksData}/>
                    <Button onClick={() => handleLoadMore()} isDisabled={false} text={'Load more'} fontSize={'small'} color={'transparent'}/>
                </div>
            </section>
            Контент для главной страницы
            <button onClick={() => handleLoadMore()}>getBooks</button>
            {
                receivedData.map((book, index) => (
                    <div key={index}>{book.id}</div>
                ))
            }
        </Layout>
    );
}