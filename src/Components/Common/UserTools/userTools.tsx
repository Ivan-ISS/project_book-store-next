import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './userTools.module.scss';

export type Item = {
    icon: string;
    action: 'dropdown' | 'none' | 'redirect';
    route?: string;
}

export interface UserToolsProps {
    itemsTools: Item[];
}

export default function UserTools({ itemsTools }: UserToolsProps) {
    const { push } = useRouter();

    const handleItemClick = (item: Item) => {
        switch (item.action) {
            case 'dropdown':
                console.log('Dropdown menu clicked for icon:', item.icon);
                break;
            case 'redirect':
                push(item.route as string);
                break;
            default:
                break;
        }
    };

    return (
        <div className={styles.userTools}>
            {itemsTools.map((item, index) => (
                <button key={index} className={styles.btnTool} onClick={() => handleItemClick(item)}>
                    <Image width={15} height={15} src={item.icon} alt={item.icon}/>
                </button>
            ))}
        </div>
    );
}