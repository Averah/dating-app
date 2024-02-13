import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useCallback, useMemo } from 'react';
import Users from '../../components/Users/Users';
import usersStore from '../../store/usersStore';
import cls from './UsersPage.module.scss';
import { UserFilters } from '../../components/UsersFilters/UserFilters';
import authStore from '../../store/authStore';


const UsersPage: FC = observer(() => {
    const users = usersStore.users;
    const isFetching = usersStore.isFetching;

    const filteredUsers = useMemo(() => users.filter(user => user.id !== authStore.userData.id), [users]);

    useEffect(() => {
        usersStore.fetchUsers()
    }, []);

    const onFiltersChange = useCallback(() => {
        usersStore.fetchUsers();
    }, []);

    return (
        <div className={cls.UsersPage} >
            <UserFilters onFiltersChange={onFiltersChange} />
            <Users users={filteredUsers} isFetching={isFetching} />
        </div>
    );
});

export default UsersPage;