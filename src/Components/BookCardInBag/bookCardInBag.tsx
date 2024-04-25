import Image from 'next/image';
import { IBookData } from '@/types/typeBook';
import styles from './bookCardInBag.module.scss';

export interface BookCardInBagProps {
    bookInBag: IBookData;
}

export default function BookCardInBag({ bookInBag, ...props }: BookCardInBagProps) {

    return (
        <div {...props} className={styles.bookCard}>
            <div className={styles.cover}>
                <Image className={styles.coverImg} src={`${bookInBag.imageCoverLinks ? bookInBag.imageCoverLinks : '/images/png/placeholder.png'}`} width={636} height={900} alt="Book cover" />
            </div>
            <div className={styles.info}>
                <div className={styles.data}>
                    <h3 className={styles.title}>{bookInBag.title}</h3>
                    <p className={styles.author}>{bookInBag.author ? bookInBag.author?.join(', ') : 'Author unknown'}</p>
                    <div className={styles.rating}>
                        <div className={styles.stars}>
                            <svg width="60" height="11" xmlns="http://www.w3.org/2000/svg">
                                <path d="m5.8718,0.03648l1.80568,3.51469l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147l0,0.00001z
                                m11.92307,0.03647l1.80568,3.5147l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147z
                                m12.10257,0.03648l1.80568,3.5147l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147z
                                m12.28205,0.03647l1.80568,3.5147l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147z
                                m12.33333,0.03648l1.80568,3.5147l3.90062,0.6312l-2.78465,2.8034l0.60506,3.9048l-3.52671,-1.7821l-3.52671,1.7821l0.60506,-3.9048l-2.78469,-2.8034l3.90066,-0.6312l1.80568,-3.5147z" 
                                fill={`${bookInBag.review ? '#f2c94c' : '#eeedf5'}`}
                                clipPath={`inset(0 ${bookInBag.rating ? (1 - bookInBag.rating / 5) * 100 : 0}% 0 0)`} id="svg_1"/>
                            </svg>
                        </div>
                        <span className={styles.review}>{bookInBag.review ? bookInBag.review + ' review' : 'No views'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}