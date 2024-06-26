import styles from '../styles/pageStyles/index.module.scss';
import { slides, categories, defaultCategory, defStartIndex, defMaxResults } from '@/data';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBooksData, fetchBooks, setStartIndex, setCurrentCategory } from '@/redux/slices/booksSlice';
import { RootState, RootDispatch } from '@/redux/store';
import { IDataResponse, IBookData } from '@/types/typeBook';
import Layout from '../Components/Layout/layout';
import Slider from '../Components/Common/Slider/slider';
import PromoCard from '../Components/Common/PromoCard/promoCard';
import Categories from '../Components/Categories/categories';
import Button from '../Components/Common/Button/button';
import BookCardGroup from '../Components/BookCards/bookCardGroup';
import Loader from '../Components/Common/Loader/loader';
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

export default function Home({ receivedData }: HomeProps) {
    const dispatch = useDispatch<RootDispatch>();
    const loading = useSelector((state: RootState) => state.books.status);
    const booksData = useSelector((state: RootState) => state.books.booksData);
    const startIndex = useSelector((state: RootState) => state.books.startIndex);
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
                    {
                        loading === 'in progress'
                        ? <Loader />
                        : null
                    }
                    <Button onClick={() => handleLoadMore()} isDisabled={false} text={'Load more'} fontSize={'small'} color={'transparent'}/>
                </div>
            </section>
        </Layout>
    );
}