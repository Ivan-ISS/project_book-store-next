import { ReactNode } from 'react';
import styles from './modal.module.scss';
import ContentAuthModal from '../../AuthModal/contentAuthModal';
import ButtonClose from '../ButtonClose/buttonClose';

import { Montserrat } from 'next/font/google';

const montserratFont = Montserrat({
    weight: ['400', '500', '600', '700', '900'],
    subsets: ['latin', 'cyrillic'],
});

export interface ModalProps {
    closeModal: () => void;
    content: JSX.Element | ReactNode;
}

export default function Modal({ closeModal, content }: ModalProps) {

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={`${styles.modal} ${montserratFont.className}`}>
                {content}
                <ButtonClose onClick={closeModal}></ButtonClose>
            </div>
        </>
    );
}