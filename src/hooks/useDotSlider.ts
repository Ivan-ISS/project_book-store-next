import { useState, useEffect } from 'react';

export type TReturnedBySlider = [
    number,
    (index: number) => void,
    () => void,
]

export default function  useDotSlider(slides: string[]): TReturnedBySlider {
    const [indexSlide, setIndexSlide] = useState<number>(0);

    useEffect(() =>{
        const ID = setInterval(nextSlide, 5000);

        return () => clearInterval(ID);
    }, []);

    const nextSlide = () => {
        setIndexSlide((v) => (v + 1) % slides.length);
    };

    const handleClickDot = (index: number) => {
        setIndexSlide(index);
    };

    return [indexSlide, handleClickDot, nextSlide];
}