import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { IUser } from '../../store/usersStore';
import UserCard from './UserCard/UserCard';
import cls from './Users.module.scss';
import { Loader } from '../Loader/Loader';

interface IUsersProps {
    users: Array<IUser>;
    isFetching: boolean;
}

const Users: React.FC<IUsersProps> = memo(({ users, isFetching }) => {

    if (isFetching) {
        return <Loader className={cls.usersLoader} />
    } else if (users.length === 0) {
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
