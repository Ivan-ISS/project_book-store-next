import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ error: true, message: 'Only POST' });
    }

    const { email, bag } = req.body;
    
    const validate = (bag: []) => {
        const isPasswordValid = bag.length >= 1;

        if (!isPasswordValid) {
            return {error: true, message: 'Bag is empty'};
        }
        return {error: false};
    };

    const validatedInfo = validate(bag);

    if (validatedInfo.error) {
        res.status(400).send(validatedInfo);
    } else {
        res.status(200).send({ success: true, message: 'The order has been completed' });
    }
}