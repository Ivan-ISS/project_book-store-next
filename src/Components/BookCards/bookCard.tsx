import { ButtonHTMLAttributes } from 'react';
import Image from 'next/image';
import styles from './bookCard.module.scss';
import { IBookData } from '@/types/typeBook';
import Button from '../Common/Button/button';

export interface BookCardProps extends ButtonHTMLAttributes<HTMLDivElement>{
    bookData: IBookData;
}

export default function BookCard({ bookData, ...props }: BookCardProps) {

    return (
        <div {...props} className={styles.bookCard}>
            <div className={styles.cover}>
                <Image className={styles.coverImg} src=/* {`${bookData.imageCoverLinks ? bookData.imageCoverLinks :  */'/images/png/placeholder.png'/* }`} */ width={212} height={300} alt="Book cover" />
            </div>
            <div className={styles.info}>
                <div className={styles.data}>
                    <p className={styles.author}>{bookData.author}</p>
                    <h3 className={styles.title}>{bookData.title}</h3>
                    <div className={styles.rating}>
                        <div className={styles.stars}>
                            <svg width="60" height="11" xmlns="http://www.w3.org/2000/svg">
                                <path d="m5.8718,0.03648l1.80568,3.51469l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147l0,0.00001z
                                m11.92307,0.03647l1.80568,3.5147l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147z
                                m12.10257,0.03648l1.80568,3.5147l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147z
                                m12.28205,0.03647l1.80568,3.5147l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147z
                                m12.33333,0.03648l1.80568,3.5147l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147z" 
                                fill="#f2c94c" clip-path={`inset(0 ${bookData.rating ? (1 - bookData.rating / 5) * 100 : null}% 0 0)`} id="svg_1"/>
                            </svg>
                        </div>
                        <span className={styles.review}>{bookData.review}</span>
                    </div>
                </div>
                <p className={styles.description}>{bookData.description}</p>
                <span className={styles.price}>{bookData.retailPrice?.amount}</span>
                <Button isDisabled={false} text={'Buy now'}/>
            </div>
        </div>
    );
}