import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({ error: true, message: 'Only POST' });
    }

    const { email, password } = req.body;
    
    const validate = (email: string, password: string) => {
        const isEmailValid = email.includes('@');
        const isPasswordValid = password.length >= 6;

        if (!isEmailValid && !isPasswordValid) {
            return {error: true, message: 'Email or password are incorrect'};
        } else if (!isEmailValid) {
            return {error: true, message: 'Email is not valid'};
        } else if (!isPasswordValid) {
            return {error: true, message: 'Your password must be at least 6 characters long'};
        }
        return {error: false};
    };

    const validatedInfo = validate(email, password);

    if (validatedInfo.error) {
        res.status(400).send(validatedInfo);
    } else {
        res.status(200).send({ success: true, token: 'testToken' });
    }
}