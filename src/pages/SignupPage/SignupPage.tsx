import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect } from 'react';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import authStore from '../../store/authStore';
import { IUserData } from '../../store/authStore';
import { SignupForm } from '../../components/SignUpForm/SignUpForm';



export const SignupPage: FC = observer(() => {

    const onSignUpHandler = useCallback((data: IUserData) => {
        authStore.signup(data);
    }, [])

    return (
        <div>
            <SignupForm signUp={onSignUpHandler} />
        </div>
    );
});


export default SignupPage;