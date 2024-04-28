import { useSelector, useDispatch } from 'react-redux';
import { RootState, RootDispatch } from '@/redux/store';
import { setDataUser } from '@/redux/slices/authSlice';
import styles from '../styles/pageStyles/profile.module.scss';
import Layout from '../Components/Layout/layout';
import UserView from '../Components/Common/UserView/userView';
import UserModalContent from '../Components/UserModalContent/userModalContent';
import Modal from '@/Components/Common/Modal/modal';
import usePortal from '@/hooks/usePortal';
import EditableArea from '../Components/Common/EditableArea/editableArea';
import { itemsUserView } from '@/data';

export default function Profile() {
    const userData = useSelector((state: RootState) => state.auth.userData);
    const dispatch = useDispatch<RootDispatch>();
    const { isOpen: isOpenPortal, openPortal, closePortal, Portal } = usePortal();
    
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setDataUser({about: event.target.value}));
    };

    const handleClickBtn = () => {
        openPortal();
    };

    return (
        <Layout>
            <section className={styles.blockUser}>
                <UserView itemsUserView={itemsUserView} userData={userData} handleClickBtn={handleClickBtn}/>
                <EditableArea
                    title={'About me'}
                    description={userData.about ? userData.about : ''}
                    handleChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(event)}
                />
                { isOpenPortal && <Portal><Modal closeModal={closePortal} content={<UserModalContent closeModal={closePortal}/>}/></Portal> }
            </section>
        </Layout>
    );
}