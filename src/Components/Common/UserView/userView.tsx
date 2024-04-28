import Image from 'next/image';
import styles from './userView.module.scss';
import Button from '../Button/button';
import avatar from '@/images/png/avatarPlaceholder.png';
import { IUserData } from '@/types/typeUser';

export interface UserViewProps {
    itemsUserView: string[];
    userData: IUserData;
    handleClickBtn?: () => void;
}

export default function UserView({ itemsUserView, handleClickBtn, userData }: UserViewProps) {

    return (
        <div className={styles.userView}>
            <h2 className={styles.title}>Profile</h2>
            <div className={styles.user}>
                <div className={styles.userAvatar}>
                    <Image src={avatar} width={235} height={235} alt="avatar"/>
                </div>
                <div className={styles.userInfo}>
                    {itemsUserView.map((item, index) => (
                        <div key={index} className={styles.lineInfo}>
                            <span className={styles.signature}>{`Your ${item}`}</span>
                            <p className={styles.meaning}>{userData[item]}</p>
                        </div>
                    ))}
                    <Button style={{marginTop: '16px'}} text={'Edit profile'} fontSize={'small'} color={'transparent'} onClick={handleClickBtn}/>
                </div>
            </div>
        </div>
    );
}