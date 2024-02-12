import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Profile from '../../components/Profile/Profile';
import Users from '../../components/Users/Users';
import authStore from '../../store/authStore';
// import cls from './UsersPage.module.scss';
import usersStore from '../../store/usersStore';


const UsersPage: FC = observer(() => {
    const isFetching = usersStore.isFetching;
    const users = usersStore.users;

    useEffect(() => {
        usersStore.fetchUsers()
    }, []);

    return (
        <div  >

            <Users isFetching={isFetching} users={users} />
        </div>
    );
});

export default UsersPage;