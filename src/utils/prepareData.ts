import { IDataResponse, IBookResponse, IBookData } from '../types/typeBook';

export default function prepareData(data: IDataResponse): IBookData[] {

    let booksData: IBookData[] = [];
    data.items.forEach((item: IBookResponse) => {
        booksData.push({
            id: item.id,
            imageCoverLinks: item.volumeInfo.imageLinks?.thumbnail ? item.volumeInfo.imageLinks.thumbnail : null,
            author: item.volumeInfo.authors ? item.volumeInfo.authors : null,
            title: item.volumeInfo.title ? item.volumeInfo.title : null,
            rating: item.volumeInfo.averageRating ? item.volumeInfo.averageRating : null,
            review: item.volumeInfo.ratingsCount ? item.volumeInfo.ratingsCount : null,
            description: item.volumeInfo.description ? item.volumeInfo.description : null,
            retailPrice: item.saleInfo.retailPrice ? item.saleInfo.retailPrice : null,
        });
    });

    return booksData;
}