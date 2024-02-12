import React, { FC, useEffect } from 'react';
import classNames from 'classnames';
// import cls from './ProfilePage.module.scss';
import authStore from '../../store/authStore';
import { useNavigate, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Profile from '../../components/Profile/Profile';
import usersStore from '../../store/usersStore';


export const ProfilePage: FC = observer(() => {

    const isAuthorized = authStore.isAuthorized;
    useEffect(() => {
        usersStore.fetchUsers()
    }, [])

    if (!isAuthorized) {
            return <Navigate to='/login' />
    }
    return (
        <div >
           <Profile />
        </div>
    );
});
