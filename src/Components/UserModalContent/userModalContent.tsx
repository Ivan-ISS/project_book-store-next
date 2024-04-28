import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RootDispatch } from '@/redux/store';
import { setDataUser } from '@/redux/slices/authSlice';
import styles from './userModalContent.module.scss';
import Input from '../Common/Input/input';
import Button from '../Common/Button/button';
import { formProfile } from '@/data';

export default function UserModalContent({ closeModal }: { closeModal: () => void }) {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const dispatch = useDispatch<RootDispatch>();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setDataUser(formData));
        closeModal();
    };

    const handleChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
        field = field.toLowerCase();
        setFormData(prevData => ({
            ...prevData,
            [field]: event.target.value
        }));
        console.log(formData);
    };

    return (
        <div className={styles.contentUser}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <legend className={styles.legend}>Profile</legend>
                <div className={styles.fileds}>
                    {formProfile.map((field, index) => (
                        <Input
                            key={index}
                            type={field}
                            isValid={'valid'}
                            onChange={(e) => handleChange(field, e)}
                        />
                    ))}
                </div>
                <Button
                    type="submit"
                    isDisabled={false}
                    text={'Apply'}
                    fontSize={'big'}
                    color={'purple'}
                />
            </form>
        </div>
    );
}