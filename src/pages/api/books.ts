import { NextApiRequest, NextApiResponse } from 'next';
import { IDataResponse/* , IBookDataResponse, IBookData */ } from '@/types/typeBook';
import prepareData from '@/utils/prepareData';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { subject, startIndex } = req.query;

    const params = {
        q: `Subject:${subject}`,
        startIndex: `${startIndex}`,
        maxResults: '6'
    };
    
    const gbooksReqParams = new URLSearchParams(params);
    // gbooksReqParams.set('q', `Subject:${subject}`);
    
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?${gbooksReqParams.toString()}`);
    
    const data: IDataResponse = await response.json();

    res.status(200).send({
        booksData: prepareData(data),
    });

    if (!req.query.subject) {
        res.status(400).send({
            error: true,
            message: 'No subject in query params'
        });
    }
}