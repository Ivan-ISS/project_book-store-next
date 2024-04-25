import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Layout from '../Components/Layout/layout';
import ShoppingBag from '../Components/ShoppingBag/shoppingBag';

export default function Bag() {
    const booksInBag = useSelector((state: RootState) => state.auth.bag);

    return (
        <Layout>
            <ShoppingBag booksInBag={booksInBag}/>
        </Layout>
    );
}