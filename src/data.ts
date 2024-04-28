// Данные навигации
export const itemsNavigation = [ 'books', 'audiobooks', 'stationery & gifts', 'blog' ];

// Инструменты пользователя
export interface Item {
    icon: string;
    name: string;
    action: 'dropdown' | 'none' | 'redirect';
    route?: string;
}

export const itemsTools: Item[] = [
    { icon: '/images/svg/iconProfile.svg', name: 'profile', action: 'dropdown' },
    { icon: '/images/svg/iconSearch.svg', name: 'search', action: 'none' },
    { icon: '/images/svg/iconShopBag.svg', name: 'bag', action: 'redirect', route: '/bag' },
];

// Массив фото для слайдера
export const slides = {
    images: [ '/images/png/bannera.png', '/images/png/bannerb.png', '/images/png/bannerc.png' ],
    width: 1120,
    height: 702,
};

// Массив категорий книг
export const categories = [
    { nameCategory: 'Architecture', nameInRequest: 'Architecture' },
    { nameCategory: 'Art & Fashion', nameInRequest: 'Art' },
    { nameCategory: 'Biography', nameInRequest: 'Biography & Autobiography' },
    { nameCategory: 'Business', nameInRequest: 'Business' },
    { nameCategory: 'Crafts & Hobbies', nameInRequest: 'Crafts & Hobbies' },
    { nameCategory: 'Drama', nameInRequest: 'Drama' },
    { nameCategory: 'Fiction', nameInRequest: 'Fiction' },
    { nameCategory: 'Food & Drink', nameInRequest: 'Cooking' },
    { nameCategory: 'Health & Wellbeing', nameInRequest: 'Health & Fitness' },
    { nameCategory: 'History & Politics', nameInRequest: 'History' },
    { nameCategory: 'Humor', nameInRequest: 'Humor' },
    { nameCategory: 'Poetry', nameInRequest: 'Poetry' },
    { nameCategory: 'Psychology', nameInRequest: 'Psychology' },
    { nameCategory: 'Science', nameInRequest: 'Science' },
    { nameCategory: 'Technology', nameInRequest: 'Technology' },
    { nameCategory: 'Travel & Maps', nameInRequest: 'Travel' },
];

// Параметры запроса по умолчанию
export const defaultCategory = categories[0];
export const defStartIndex = 0;
export const defMaxResults = 6;

// Поля формы авторизации
export const formFileds = [ 'Email', 'Password' ];

// Данные меню профиля
export const itemsProfileMenu = [ 'profile', 'sign out' ];

// Поля представления пользователя
export const itemsUserView = [ 'name', 'email' ];

// Колонки корзины
export const columnsBag = [ 'item', 'quantity', 'price', 'delivery' ];

// Данные профиля по умолчанию
export const userDataDefault = {
    name: 'Empty',
    email: null,
    password: null,
    about: 'Write about yourself'
};

// Данные редактирования профиля
export const formProfile = [ 'Name', 'Email', 'Password', 'About' ];