import styles from './loginMenu.module.scss';
import { formFileds } from '@/data';
import { FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, setDataUser } from '@/redux/slices/authSlice';
import { RootState, RootDispatch } from '@/redux/store';
import Input from '../Input/input';
import Button from '../Button/button';

export interface LoginMenuProps {
    position: 'relative' | 'absolute';
}

export default function LoginMenu({ position, ...props }: LoginMenuProps) {
    const [ formData, setFormData ] = useState({ email: '', password: '' });
    const dispatch = useDispatch<RootDispatch>();
    const error = useSelector((state: RootState) => state.auth.error);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(loginUser(formData));
        dispatch(setDataUser(formData));
    };

    const handleChange = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
        field = field.toLowerCase();
        setFormData(prevData => ({
            ...prevData,
            [field]: event.target.value
        }));
    };

    return (
        <div {...props} className={`${styles.loginMenu} ${styles[position]}`}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <legend className={styles.legend}>Log in</legend>
                <div className={styles.fileds}>
                    {formFileds.map((field, index) => (
                        <Input
                            key={index}
                            type={field}
                            isValid={error?.toLowerCase().includes(field.toLowerCase()) ? 'invalid' : 'valid'}
                            onChange={(e) => handleChange(field, e)}
                        />
                    ))}
                    { error && <p className={styles.message}>{error}</p> }
                </div>
                <Button
                    type="submit"
                    isDisabled={false}
                    text={'Log in'}
                    fontSize={'big'}
                    color={'purple'}
                />
            </form>
        </div>
    );
}