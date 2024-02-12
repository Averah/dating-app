import React from 'react';
import { IProfileData } from '../../store/authStore';
import { Button, Image } from 'antd';
import defaultAvatar from '../../assets/defaultAvatar.png';
import cls from './Profile.module.scss';

interface ProfileProps {
    profileData: IProfileData;
    isOwner: boolean
}
const Profile: React.FC<ProfileProps> = ({ profileData, isOwner }) => {
    const { username, avatar, friends, messages, age, city, interests, gender } = profileData;

    const actionsBlock = isOwner ? (
        <div>
            <Button>Открыть новые сообщения</Button>
        </div>
    )
        : (
            <div>
                <Button>Написать сообщение</Button>
                <Button>Добавить в друзья</Button>
            </div>
        )

    return (
        <div className={cls.Profile}>
            <div>
                {avatar ? (
                    <Image
                        src={avatar}
                        className={cls.avatar}
                        width={220}
                    />
                )
                    : <img className={cls.avatar} src={defaultAvatar} />}
            </div>
            {actionsBlock}
            <div className={cls.description}>
                <h2>{username}, {age}</h2>
                <p>Пол: {gender} </p>
                <p>Друзья: {friends}</p>
                <p>Сообщения: {messages}</p>
                <p>Город: {city}</p>
                <p>Интересы: {interests} </p>
            </div>

        </div>
    )
};

export default Profile;