import styles from './userView.module.scss';
import { IUserData } from '@/types/typeUser';
import Image from 'next/image';
import Button from '../Button/button';
import UserModalContent from '../Modal/UserModalContent/userModalContent';
import Modal from '../Modal/modal';
import usePortal from '@/hooks/usePortal';

export interface UserViewProps {
    itemsUserView: string[];
    userData: IUserData;
}

export default function UserView({ itemsUserView, userData }: UserViewProps) {
    const { isOpenPortal, openPortal, closePortal, Portal } = usePortal();

    return (
        <div className={styles.userView}>
            <h2 className={styles.title}>Profile</h2>
            <div className={styles.user}>
                <div className={styles.userAvatar}>
                    <Image className={styles.avaterImage} src={'/images/png/avatarPlaceholder.png'} width={235} height={235} alt="avatar"/>
                </div>
                <div className={styles.userInfo}>
                    {itemsUserView.map((item, index) => (
                        <div key={index} className={styles.lineInfo}>
                            <span className={styles.signature}>{`Your ${item}`}</span>
                            <p className={styles.meaning}>{userData[item]}</p>
                        </div>
                    ))}
                    <Button
                        style={{marginTop: '16px'}}
                        text={'Edit profile'}
                        fontSize={'small'}
                        color={'transparent'}
                        onClick={openPortal}
                    />
                </div>
            </div>
            { isOpenPortal && <Portal><Modal closeModal={closePortal} insert={<UserModalContent closeModal={closePortal}/>}/></Portal> }
        </div>
    );
}