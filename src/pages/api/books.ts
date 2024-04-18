import { NextApiRequest, NextApiResponse } from 'next';
import { IBookDataResponse, IBookData } from '@/types/typeBook';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { subject, page } = req.query;

    const gbooksReqParams = new URLSearchParams();
    gbooksReqParams.set('q', `Subject:${subject}`);
    
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${gbooksReqParams.toString()}`);
    
    const data = await response.json();

    let booksData: IBookData[] = [];
    data.items.forEach((item: IBookDataResponse) => {
        booksData.push({
            id: item.id,
            imageCoverLinks: item.volumeInfo.imageLinks?.thumbnail,
            author: item.volumeInfo.authors,
            title: item.volumeInfo.title,
            rating: item.volumeInfo.averageRating,
            review: item.volumeInfo.ratingsCount,
            description: item.volumeInfo.description,
            retailPrice: item.saleInfo.retailPrice,
        });
    });

    res.status(200).send({
        data: booksData,
    });

    if (!req.query.subject) {
        res.status(400).send({
            error: true,
            message: 'No subject in query params'
        });
    }
}