import Image from 'next/image';
import iconClose from '@/images/svg/close.svg';
import styles from './buttonClose.module.scss';

export default function ButtonClose({ ...props }) {

    return (
        <button {...props} className={styles.btnClose}>
            <Image className={styles.iconClose} width={15} height={15} src={iconClose} alt="close icon" />
        </button>
    );
}