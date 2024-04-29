import { IBookData } from '@/types/typeBook';

export default function checkingBookInBag(book: IBookData, booksInBag: IBookData[]): boolean {
    let isInBag = false;
    booksInBag.forEach((bookInBag) => {
        if (bookInBag.id === book.id) return isInBag = true;
    });
    return isInBag;
}