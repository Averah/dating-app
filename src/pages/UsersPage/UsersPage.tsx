import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import Users from '../../components/Users/Users';
import usersStore from '../../store/usersStore';
import cls from './UsersPage.module.scss';


const UsersPage: FC = observer(() => {
    const users = usersStore.users;

    useEffect(() => {
        usersStore.fetchUsers()
    }, []);

    return (
        <div className={cls.UsersPage} >
            <Users users={users} />
        </div>
    );
});

export default UsersPage;