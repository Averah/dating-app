import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { SignupForm } from '../../components/SignUpForm/SignUpForm';
import authStore, { IUserData } from '../../store/authStore';
import cls from './SignupPage.module.scss';

export const SignupPage: FC = observer(() => {

    const onSignUpHandler = useCallback((data: IUserData) => {
        authStore.signup(data);
    }, [])

    const onClearErrors = useCallback(() => {
        authStore.clearError();
    }, [])

    const { isLoading, error, isAuthorized, isSignedUp } = authStore;

    if (isAuthorized) {
        return <Navigate to='/profile' />
    }

    return (
        <div className={cls.SignupPage}>
            <div className={cls.title}>Регистрация</div>
            {isSignedUp && (
                <div className={cls.signupSuccess}>
                    Регистрация прошла успешно.
                    <NavLink to='/login' className={cls.signUpLink}>Войти</NavLink>

                </div>
            )}
            <SignupForm signUp={onSignUpHandler} isLoading={isLoading} clearErrors={onClearErrors} error={error} />
        </div>
    );
});


export default SignupPage;