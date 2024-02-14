import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import authStore, { IUserData } from '../../store/authStore';
import cls from './LoginPage.module.scss'

export const LoginPage: FC = observer(() => {

    const onAuthorizeHandler = useCallback((data: IUserData) => {
        authStore.login(data);
    }, [])

    const onClearErrors = useCallback(() => {
        authStore.clearError();
    }, [])

    const isLoading = authStore.isLoading;
    const error = authStore.error;
    const isAuthorized = authStore.isAuthorized;

    if (isAuthorized) {
        return <Navigate to='/profile' />
    }

    return (
        <div className={cls.LoginPage}>
            <div className={cls.title}>Авторизация</div>
            <LoginForm authorize={onAuthorizeHandler} isLoading={isLoading} clearErrors={onClearErrors} error={error} />
        </div>
    );
});


export default LoginPage;