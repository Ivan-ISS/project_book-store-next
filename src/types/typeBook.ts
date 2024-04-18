export interface IBookDataResponse {
    id: string;
    volumeInfo: {
        title: string;
        authors: string[];
        description: string;
        imageLinks: {
            thumbnail: string;
        };
        averageRating: number;
        ratingsCount: number;
    };
    saleInfo: {
        retailPrice: {
            amount: number;
            currencyCode: string;
        }
    }
};

export interface IBookData {
    id: string,
    imageCoverLinks: string,
    author: string[],
    title: string,
    rating: number,
    review: number,
    description: string,
    retailPrice: {
        amount: number;
        currencyCode: string;
    },
}