import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React, { memo } from 'react';
import { IUser } from '../../../store/usersStore';
import defaultAvatar from "../../../assets/defaultAvatar.png";
import cls from './UserCard.module.scss';

interface IUserCardProps {
    user: IUser
}
const UserCard: React.FC<IUserCardProps> = memo(({ user }) => {
    const { username, age, city, interests, gender, photos } = user;
    const title = age ? `${username}, ${age}` : username

    return (
        <Card
            hoverable
            className={cls.Card}
            cover={<img alt="avatar" src={photos[0] ? photos[0] : defaultAvatar} style={{ maxHeight: 120, objectFit: "cover" }} />}
        >
            <Meta title={title} />
            <p>{city}</p>
            <p>Пол: {gender}</p>
            <p>Интересы: {interests}</p>
        </Card>
    )
})

export default UserCard;