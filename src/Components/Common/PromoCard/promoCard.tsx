import { HTMLAttributes } from 'react';
import Image from 'next/image';
import styles from './promoCard.module.scss';
import arrow from '@/images/svg/arrow.svg';

export interface BlockProps extends HTMLAttributes<HTMLAnchorElement> {
    text: string,
    color: string,
}

export default function PromoCard({ text, color = 'cornflower', ...props }: BlockProps) {
    return (
        <a href='#' {...props} className={`${styles.promo} ${styles[color]}`}>
            <p>{text}</p>
            <Image src={arrow} alt="arrow" />
        </a>
    );
};