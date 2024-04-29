import styles from './modal.module.scss';
import { HTMLAttributes, ReactNode } from 'react';
import ButtonClose from '../ButtonClose/buttonClose';

import { Montserrat } from 'next/font/google';

const montserratFont = Montserrat({
    weight: ['400', '500', '600', '700', '900'],
    subsets: ['latin', 'cyrillic'],
});

export interface ModalProps extends HTMLAttributes<HTMLDivElement>{
    closeModal: () => void;
    insert: JSX.Element | ReactNode;
}

export default function Modal({ closeModal, insert, ...props }: ModalProps) {

    return (
        <>
            <div className={styles.overlay}></div>
            <div {...props} className={`${styles.modal} ${montserratFont.className}`}>
                {insert}
                <ButtonClose onClick={closeModal}></ButtonClose>
            </div>
        </>
    );
}