import React, { FC, memo } from 'react';
import classNames from 'classnames';
import cls from './Users.module.scss';
import { Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import { IUser } from '../../store/usersStore';
import UserCard from './UserCard/UserCard';


interface IUsersProps {
    isFetching: boolean
    users: Array<IUser>
}

const Users: React.FC<IUsersProps> = memo(({ isFetching, users }) => {

    if (users.length === 0) {
        return <div className={cls.emptyUsersList}> No matches found</div>
    }
    return (
        <div className={cls.Users}>
            {isFetching ? <Spin /> : null}
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

// users, followingInProgress, follow, unfollow 