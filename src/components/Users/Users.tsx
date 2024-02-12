import { Spin } from 'antd';
import React, { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { IUser } from '../../store/usersStore';
import UserCard from './UserCard/UserCard';
import cls from './Users.module.scss';

interface IUsersProps {
    users: Array<IUser>
}

const Users: React.FC<IUsersProps> = memo(({ users }) => {

    if (users.length === 0) {
        return <div className={cls.emptyUsersList}> No matches found</div>
    }

    return (
        <div className={cls.Users}>
            {users.map((user) => (
                <NavLink to={`/profile/${user.id}`} className={cls.userCardLink} key={user.id}>
                    <UserCard
                        user={user}
                    />
                </NavLink>
            ))}
        </div>
    )
});

export default Users;
