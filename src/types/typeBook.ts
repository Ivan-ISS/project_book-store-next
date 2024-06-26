export interface IBookResponse {
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

export interface IDataResponse {
    items: IBookResponse[];
};

export interface IBookData {
    id: string,
    imageCoverLinks: string | null,
    author: string[] | null,
    title: string | null,
    rating: number | null,
    review: number | null,
    description: string | null,
    retailPrice: {
        amount: number;
        currencyCode: string;
    } | null,
}

export interface IBookDataInBag extends IBookData {
    quantity: number;
}