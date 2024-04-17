import Image from 'next/image';
import styles from './slider.module.scss';
import useDotSlider from '@/hooks/useDotSlider';

export interface SliderProps {
    slides: {
        images: string[];
        width: number;
        height: number;
    }
}

export default function Slider({ slides }: SliderProps) {
    const [indexSlide, handleClickDot] = useDotSlider(slides.images);

    // console.log('count ', indexSlide);

    return (
        <div className={styles.slider}>
            <Image
                src={slides.images[indexSlide]}
                className={styles.slide}
                width={slides.width}
                height={slides.height}
                alt="banner"
            />
            <div className={styles.groupDots}>
                {slides.images.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.dot} ${index === indexSlide ? styles.active : styles.inactive}`}
                        onClick={() => handleClickDot(index)}>
                    </button>
                ))}
            </div>
        </div>
    );
}