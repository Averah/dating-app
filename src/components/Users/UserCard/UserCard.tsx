import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from 'react';
import { IUser } from '../../../store/usersStore';
import defaultAvatar from "../../../assets/defaultAvatar.png";
import cls from './UserCard.module.scss';

interface IUserCardProps {
    user: IUser
}
const UserCard: React.FC<IUserCardProps> = ({ user }) => {
    const { username, age, city, interests, gender, avatar } = user

    const title = age ? `${username}, ${age}` : username
    return (
        <Card
            hoverable
            className={cls.Card}
            cover={<img alt="avatar" src={avatar ? avatar:  defaultAvatar} style={{ maxHeight: 150 }} />}
        >
            <Meta title={title} />
            <p>{city}</p>
            <p>Пол: {gender}</p>
            <p>Интересы: {interests}</p>
        </Card>
    )
}

export default UserCard;