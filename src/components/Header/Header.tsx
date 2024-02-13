import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import cls from './Header.module.scss';
// import Button from '../../ui/Button/Button';
import { observer } from 'mobx-react-lite';
import authStore from '../../store/authStore';
import { Button } from 'antd';

export const Header: React.FC = observer(() => {
    const logOut = useCallback(() => {
        authStore.logout()
    }, []);

    const navlinkClassname = useCallback(({ isActive }: { isActive: boolean }) => isActive ? cls.active : "", []);

    return (
        <div className={cls.Header}>
            <div className={cls.content}>
                <div className={cls.navbar}>
                    <NavLink to='/profile' className={navlinkClassname}>Профиль</NavLink>
                    <NavLink to='/users' className={navlinkClassname}>Пользователи</NavLink>
                </div>
                {authStore.isAuthorized
                    ?
                    <Button type='text' onClick={logOut} className={cls.logOutBtn}>Выйти </Button>
                    :
                    <NavLink to="/login">Войти</NavLink>}
            </div>

        </div>
    )
});