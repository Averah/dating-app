import React, { FC } from 'react';
import classNames from 'classnames';
// import cls from './ProfilePage.module.scss';
import authStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';


export const ProfilePage: FC = () => {
    const navigate = useNavigate();

    if (authStore.isAuthorized) {
        navigate('/profile')
    }
    return (
        <div >
            Profile Page
        </div>
    );
};
