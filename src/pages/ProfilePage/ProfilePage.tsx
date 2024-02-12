import React, { FC } from 'react';
import classNames from 'classnames';
// import cls from './ProfilePage.module.scss';
import authStore from '../../store/authStore';
import { useNavigate, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';


export const ProfilePage: FC = observer(() => {
    
    const isAuthorized = authStore.isAuthorized;

    if (!isAuthorized) {
            return <Navigate to='/login' />
    }
    return (
        <div >
            Profile Page
        </div>
    );
});
