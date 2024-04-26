import { TextareaHTMLAttributes } from 'react';
import styles from './editableArea.module.scss';

export interface EditableAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    title: string;
    description: string;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function EditableArea({ title, description, handleChange, ...props }: EditableAreaProps) {

    return (
        <div className={styles.editableArea}>
            <h3 className={styles.title}>{title}</h3>
            <textarea {...props} className={styles.textArea} value={description} onChange={handleChange}/>
        </div>
    );
}