// import Layout from "@/components/Layout/layout";
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setCurrentPage } from '@/redux/slices/booksSlice';
import { RootState, RootDispatch } from '@/redux/store';
import Layout from '../Components/Layout/layout';
import Slider from '../Components/Common/Slider/slider';

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
            <Slider />
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