import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { SignupForm } from '../../components/SignUpForm/SignUpForm';
import authStore, { IUserData } from '../../store/authStore';

export const SignupPage: FC = observer(() => {

    const onSignUpHandler = useCallback((data: IUserData) => {
        authStore.signup(data);
    }, [])

    const onClearErrors = useCallback(() => {
        authStore.clearError();
    }, [])



    const isLoading = authStore.isLoading;
    const error = authStore.error;
    const isAuthorized = authStore.isAuthorized;
    const isSignedUp = authStore.isSignedUp;

    if (isAuthorized) {
        return <Navigate to='/profile' />
    }

    return (
        <div>
            <div>Регистрация</div>
            <SignupForm signUp={onSignUpHandler} isLoading={isLoading} clearErrors={onClearErrors} />
            {error && <div>{error}</div>}
            {isSignedUp && <div> Регистрация прошла успешно. </div>}
        </div>
    );
});


export default SignupPage;