import styles from './userView.module.scss';
import { IUserData } from '@/types/typeUser';
import Image from 'next/image';
import Button from '../Button/button';

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
                        onClick={handleClickBtn}
                    />
                </div>
            </div>
        </div>
    );
}