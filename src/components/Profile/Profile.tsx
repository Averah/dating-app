import { Button } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import defaultAvatar from '../../assets/defaultAvatar.png';
import { IProfileData } from '../../store/usersStore';
import MessageForm from '../MessageForm/MessageForm';
import PhotoCarousel from '../PhotoCarousel/PhotoCarousel';
import cls from './Profile.module.scss';
import { Modal } from '../Modal/Modal';


const checkHasSameInterests = (myInterests: string, userInterests: string) => {
    const myInterestsArr = myInterests.split(',').map(interest => interest.toLocaleLowerCase().trim())
    const userInterestsArr = userInterests.split(',').map(interest => interest.toLocaleLowerCase().trim())

    if (!myInterestsArr.length || !userInterests.length) {
        return false
    }

    for (let interest of myInterestsArr) {
        if (userInterestsArr.includes(interest)) {
            return true
        }
    }

    return false
}

interface ProfileProps {
    profileData: IProfileData
    isOwner: boolean
    ownerInterests?: string
}
const Profile: React.FC<ProfileProps> = ({ profileData, isOwner, ownerInterests }) => {

    const { username, photos, friends, messages, age, city, interests, gender } = profileData;

    const [isEditMode, setIsEditMode] = useState(false);

    const closeModal = useCallback(() => {
        setIsEditMode(false);
    }, []);

    const openModal = useCallback(() => {
        setIsEditMode(true);
    }, []);

    const hasSomeInterests = useMemo(
        () => checkHasSameInterests(ownerInterests ?? '', interests ?? ''),
        [interests, ownerInterests])


    const actionsBlock = isOwner ? (
        <div className={cls.actions}>
            <Button>Открыть новые сообщения</Button>
        </div>
    )
        : (
            <div className={cls.actions}>
                {hasSomeInterests && <Button onClick={openModal}>Написать сообщение</Button>}
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
                <p>Друзья: {friends.length}</p>
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