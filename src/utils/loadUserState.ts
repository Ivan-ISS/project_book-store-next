export interface IUserData {
    name: string,
    email: string,
    password: string,
    about: string
}

export const loadUserState = (email: string) => {
    try {
        const serializedState = localStorage.getItem(email);
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);
        return undefined;
    }
};