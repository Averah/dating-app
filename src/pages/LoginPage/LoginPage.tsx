import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import authStore from '../../store/authStore';
import { IUserData } from '../../store/authStore';


export const LoginPage: FC = observer(() => {

    const onAuthorizeHandler = useCallback((data: IUserData) => {
        authStore.login(data);
    }, [])

    return (
        <div>
            <LoginForm authorize={onAuthorizeHandler} />
        </div>
    );
});


export default LoginPage;