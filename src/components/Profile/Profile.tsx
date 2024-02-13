import { Button } from 'antd';
import React, { useCallback, useState } from 'react';
import defaultAvatar from '../../assets/defaultAvatar.png';
import { IProfileData } from '../../store/usersStore';
import { Loader } from '../Loader/Loader';
import MessageForm from '../MessageForm/MessageForm';
import PhotoCarousel from '../PhotoCarousel/PhotoCarousel';
import cls from './Profile.module.scss';
import { Modal } from '../Modal/Modal';

interface ProfileProps {
    profileData: IProfileData | null
    isOwner: boolean
}
const Profile: React.FC<ProfileProps> = ({ profileData, isOwner }) => {
    const [isEditMode, setIsEditMode] = useState(false);

    const closeModal = useCallback(() => {
        setIsEditMode(false);
      }, []);

      const openModal = useCallback(() => {
        setIsEditMode(true);
      }, []);


    if (!profileData) {
        return <Loader className={cls.profileLoader} />
    }

    const { username, photos, friends, messages, age, city, interests, gender } = profileData;

    const actionsBlock = isOwner ? (
        <div className={cls.actions}>
            <Button>Открыть новые сообщения</Button>
        </div>
    )
        : (
            <div className={cls.actions}>
                <Button onClick={openModal}>Написать сообщение</Button>
                <Button>Добавить в друзья</Button>
            </div>
        )

    return (
        <div className={cls.Profile}>
            <div>
                {photos.length ? <PhotoCarousel photos={photos} /> : <img className={cls.photo} src={defaultAvatar} />}
            </div>
            {actionsBlock}
            <div className={cls.description}>
                <h2>{username}, {age}</h2>
                <p>Пол: {gender} </p>
                <p>Друзья: {friends}</p>
                <p>Сообщения: {messages}</p>
                <p>Город: {city}</p>
                <p>Интересы: {interests} </p>
                <Modal isOpen={isEditMode} closeModal={closeModal}>
                    <MessageForm />
                </Modal>
            </div>
        </div>
    )
};

export default Profile;