import { memo, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ReactComponent as EyeIcon } from '../../assets/eyeIcon.svg';
import cls from './LoginForm.module.scss'
import { Input } from '../../ui/Input/Input';
import Button from "../../ui/Button/Button";
import { IUserData } from "../../store/authStore";
import { NavLink } from 'react-router-dom';

interface FormProps {
    authorize: (data: IUserData) => void;
    clearErrors: () => void;
    isLoading: boolean;
    error: string;
}

export const LoginForm: React.FC<FormProps> = memo(({ authorize, isLoading, clearErrors, error }) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown((prev) => !prev);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserData>({ mode: 'onBlur' });

    const onSubmit = (data: IUserData) => {
        authorize(data);
    };

    useEffect(() => {
        return () => clearErrors();
    }, [clearErrors])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cls.LoginForm}>
            <div className={cls.formInputs}>
                <div>
                    <Input
                        placeholder="Введите e-mail"
                        type="email"
                        {...register('email', {
                            required: 'E-mail обязателен',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Некорректный e-mail',
                            },
                        })}
                    />
                    <div className={cls.emailError}>
                        {errors?.email && (`${errors.email?.message}` || 'Ошибка')}
                    </div>
                </div>
                <div>
                    <div className={cls.passwordContainer}>
                        <Input
                            placeholder="Введите пароль"
                            className={cls.passwordInput}
                            type={passwordShown ? 'text' : 'password'}
                            {...register('password', { required: 'Пароль обязателен' })}
                        />
                        <EyeIcon className={cls.passwordIcon} onClick={togglePasswordVisibility} />
                    </div>
                    <div className={cls.passwordError}>
                        {errors?.password && (`${errors.password?.message}` || 'Ошибка')}
                    </div>
                </div>
            </div>
            <div className={cls.serverError}>{error && error}</div>
            <NavLink to='/signup' className={cls.signUpLink}>Зарегистрироваться</NavLink>
            <Button type="submit" className={cls.submitBtn} disabled={isLoading}>
                {isLoading ? 'Выполняется вход...' : 'Войти'}
            </Button>


        </form>
    );
});
