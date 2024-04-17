// import Layout from "@/components/Layout/layout";
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setCurrentPage } from '@/redux/slices/booksSlice';
import { RootState, RootDispatch } from '@/redux/store';
import Layout from '../Components/Layout/layout';
import Slider from '../Components/Common/Slider/slider';
import PromoCard from '../Components/Common/PromoCard/promoCard';
import { slides } from '@/data';

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
        dispatch(fetchBooks());
    };

    const click = () => {
        console.log('here');
    };

    return (
        <Layout>
            <Slider slides={slides}/>
            <PromoCard style={{position: 'absolute', top: '10%', right: '0'}} color='cornflower' text='Change old book on new'/>
            <PromoCard style={{position: 'absolute', top: '50%', right: '-2vw'}} color='pink' text='Top 100 books 2022'/>
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