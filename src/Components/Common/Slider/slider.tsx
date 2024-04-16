import Image from 'next/image';
import styles from './slider.module.scss';

export default function Slider() {

    return (
        <div>
            <Image src="/images/png/placeholder.png" width={500} height={500} alt="banner"/>
        </div>
    );
}