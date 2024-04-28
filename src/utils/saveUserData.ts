import { IBookDataInBag } from '@/types/typeBook';
import { IUserData } from '@/types/typeUser';

export interface IUserDataWithBag {
    userData: IUserData;
    bag: IBookDataInBag[];
}

export const saveUserData = (userData: IUserData, bag: IBookDataInBag[]) => {
    try {
        const userDataWithBag: IUserDataWithBag = {userData, bag};
        const serializedState = JSON.stringify(userDataWithBag);
        localStorage.setItem(`${userData.email}`, serializedState);
    } catch (error) {
        console.log(error);
    }
};