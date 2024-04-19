// import Layout from "@/components/Layout/layout";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBooksData, fetchBooks, setCurrentPage } from '@/redux/slices/booksSlice';
import { RootState, RootDispatch } from '@/redux/store';
import styles from '../styles/pageStyles/index.module.scss';
import { IBookData, IBookDataResponse } from '@/types/typeBook';
import Layout from '../Components/Layout/layout';
import Slider from '../Components/Common/Slider/slider';
import PromoCard from '../Components/Common/PromoCard/promoCard';
import Categories from '../Components/Categories/categories';
import Button from '../Components/Common/Button/button';
import BookCardGroup from '@/Components/BookCards/bookCardGroup';
import { slides } from '@/data';
import { categories } from '@/data';

export interface HomeProps {
    receivedBooksData: IBookData[];
}

export async function getStaticProps() {

    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=Subject:${categories[0].nameInRequest}`);
    const receivedData = await response.json();

    let booksData: IBookData[] = [];
    receivedData.items.forEach((item: IBookDataResponse) => {
        booksData.push({
            id: item.id,
            imageCoverLinks: item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : null,
            author: item.volumeInfo.authors ? item.volumeInfo.authors : null,
            title: item.volumeInfo.title ? item.volumeInfo.title : null,
            rating: item.volumeInfo.averageRating ? item.volumeInfo.averageRating : null,
            review: item.volumeInfo.ratingsCount ? item.volumeInfo.ratingsCount : null,
            description: item.volumeInfo.description ? item.volumeInfo.description : null,
            retailPrice: item.saleInfo.retailPrice ? item.saleInfo.retailPrice : null,
        });
    });

    return {
        props: { receivedBooksData: booksData }
    };
}

export default function Home({ receivedBooksData }: HomeProps) {
    const dispatch = useDispatch<RootDispatch>();
    const setCurrentPage = useSelector((state: RootState) => state.books.currentPage);
    const booksData = useSelector((state: RootState) => state.books.booksData);

    const handleClick = () => {
        dispatch(fetchBooks('business'));
    };

    useEffect(() => {
        dispatch(setBooksData(receivedBooksData));
    }, []);

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
                    <BookCardGroup booksData={booksData}/>
                    <Button isDisabled={false} text={'Load more'}/>
                </div>
            </section>
            Контент для главной страницы
            <button onClick={() => handleClick()}>getBooks</button>
            {
                receivedBooksData.map((book: any, index: any) => (
                    <div key={index}>{book.id}</div>
                ))
            }
        </Layout>
    );
}