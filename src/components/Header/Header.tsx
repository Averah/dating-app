import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import cls from './Header.module.scss';
import Button from '../../ui/Button/Button';
import { observer } from 'mobx-react-lite';
import authStore from '../../store/authStore';

export const Header: React.FC = observer(() => {
    const logOut = useCallback(() => {
        authStore.logout()
    }, []);

    return (
        <div className={cls.Header}>
            <div className={cls.links}>
                {authStore.isAuthorized
                    ?
                    <Button onClick={logOut}>Выйти </Button>
                    :
                    <NavLink to="/login">Войти</NavLink>}
            </div>

        </div>
    )
});