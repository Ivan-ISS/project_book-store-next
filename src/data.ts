// Данные навигации
export const itemsNavigation = [ 'books', 'audiobooks', 'stationery & gifts', 'blog' ];

// Инструменты пользователя
export type Item = {
    icon: string;
    action: 'dropdown' | 'none' | 'redirect';
    route?: string;
}

export const itemsTools: Item[] = [
    { icon: '/images/svg/iconProfile.svg', action: 'dropdown' },
    { icon: '/images/svg/iconSearch.svg', action: 'none' },
    { icon: '/images/svg/iconShopBag.svg', action: 'redirect', route: '/bag' },
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
