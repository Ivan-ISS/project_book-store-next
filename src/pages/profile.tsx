import styles from '../styles/pageStyles/profile.module.scss';
import { itemsUserView } from '@/data';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, RootDispatch } from '@/redux/store';
import { setDataUser } from '@/redux/slices/authSlice';
import Layout from '../Components/Layout/layout';
import UserView from '../Components/Common/UserView/userView';
import EditableArea from '../Components/Common/EditableArea/editableArea';

export default function Profile() {
    const userData = useSelector((state: RootState) => state.auth.userData);
    const dispatch = useDispatch<RootDispatch>();
    
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setDataUser({about: event.target.value}));
    };

    return (
        <Layout>
            <section className={styles.blockUser}>
                <UserView itemsUserView={itemsUserView} userData={userData}/>
                <EditableArea
                    title={'About me'}
                    description={userData.about ? userData.about : ''}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(event)}
                />
            </section>
        </Layout>
    );
}