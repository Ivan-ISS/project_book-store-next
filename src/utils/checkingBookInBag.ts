import { IBookData } from '@/types/typeBook';

export default function checkingBooksInShopBag(book: IBookData, booksInBag: IBookData[]): boolean {
    let isInBag = false;
    booksInBag.forEach((bookInBag) => {
        if (bookInBag.id === book.id) return isInBag = true;
    });
    return isInBag;
}