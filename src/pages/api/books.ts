import { NextApiRequest, NextApiResponse } from 'next';
import { IDataResponse } from '@/types/typeBook';
import prepareData from '@/utils/prepareData';
import { defMaxResults } from '@/data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { subject, startIndex } = req.query;

    const params = {
        q: `subject:${subject}`,
        startIndex: `${startIndex}`,
        maxResults: `${defMaxResults}`
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