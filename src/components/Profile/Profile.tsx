import React from 'react';
import cls from './Profile.module.scss';

interface ProfileProps {
    name: string;
    photo: string;
    friendsCount: number;
    messagesCount: number;
    age: number;
    city: string;
    interests: string[];
    gender: 'male' | 'female';
}

const Profile: React.FC = () =>  {

    return (
        <div>
            <h2>Jk</h2>
            <img src={'/'} alt={'Avatar'} />
            <p>Друзей: </p>
            <p>Сообщений: </p>
            <p>Возраст: 18</p>
            <p>Город: </p>
            <p>Интересы: </p>
            <p>Пол: </p>
        </div>
)
};

export default Profile;