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