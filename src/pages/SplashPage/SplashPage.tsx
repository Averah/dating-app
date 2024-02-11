import React, { FC } from 'react';
import cls from './SplashPage.module.scss';
import { NavLink } from 'react-router-dom';
import { memo } from 'react';

interface SplashPageProps {
    className?: string;
}

export const SplashPage: FC<SplashPageProps> = memo(() => {
    return (
        <div className={cls.SplashPage}>
            <NavLink to="/login">Войдите,</NavLink> чтобы просматривать контент</div>
    )
});
