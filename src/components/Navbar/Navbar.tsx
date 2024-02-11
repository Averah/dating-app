
import React, { memo, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import cls from './Navbar.module.scss'

export const Navbar: React.FC = memo(() => {
    const navlinkClassname = useCallback(({ isActive }: { isActive: boolean }) => isActive ? cls.active : "", []);

    return (
        <div className={cls.Navbar}>
            <NavLink to='/profile' className={navlinkClassname}>Профиль</NavLink>
            <NavLink to='/users' className={navlinkClassname}>Пользователи</NavLink>
        </div>
    )
});