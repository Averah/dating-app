import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ReactComponent as EyeIcon } from '../../assets/eyeIcon.svg';
import cls from './SignUpForm.module.scss';
import { Input } from '../../ui/Input/Input';
import Button from "../../ui/Button/Button";
import { IUserData } from "../../store/authStore";
import { NavLink } from 'react-router-dom';

interface ISignupFormProps {
    signUp: (data: IUserData) => void;
    clearErrors: () => void;
    isLoading: boolean;
    error?: string;
}

export const SignupForm: React.FC<ISignupFormProps> = memo(({ signUp, isLoading, clearErrors, error }) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordShown((prev) => !prev);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IUserData>({ mode: 'onBlur' });

    const onSubmit = (data: IUserData) => {
        signUp(data);
        reset()
    };

    useEffect(() => {
        return () => clearErrors();
    }, [clearErrors])

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cls.SignupForm}>
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
                    <Input
                        placeholder="Введите имя пользователя"
                        type="username"
                        {...register('username', {
                            required: 'Имя пользователя обязательно'
                        })}
                    />
                    <div className={cls.usernameError}>
                        {errors?.username && (`${errors.username?.message}` || 'Ошибка')}
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
            <NavLink to='/login' className={cls.loginLink}>Войти</NavLink>
            <Button type="submit" className={cls.submitBtn} disabled={isLoading}>
                {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>

        </form>
    );
});
