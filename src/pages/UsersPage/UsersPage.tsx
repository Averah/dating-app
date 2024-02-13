import { observer } from 'mobx-react-lite';
import React, { FC, useEffect, useCallback } from 'react';
import Users from '../../components/Users/Users';
import usersStore from '../../store/usersStore';
import cls from './UsersPage.module.scss';
import { UserFilters } from '../../components/UsersFilters/UserFilters';


const UsersPage: FC = observer(() => {
    const users = usersStore.users;
    const isFetching = usersStore.isFetching;

    useEffect(() => {
        usersStore.fetchUsers()
    }, []);

    const onFiltersChange = useCallback(() => {
        usersStore.fetchUsers();
    }, []);

    return (
        <div className={cls.UsersPage} >
            <UserFilters onFiltersChange={onFiltersChange} />
            <Users users={users} isFetching={isFetching} />
        </div>
    );
});

export default UsersPage;