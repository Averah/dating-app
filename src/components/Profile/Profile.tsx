import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useState } from 'react';
import defaultAvatar from '../../assets/defaultAvatar.png';
import { IFriend, IProfileData } from '../../store/usersStore';
import MessageForm from '../MessageForm/MessageForm';
import { Modal } from '../Modal/Modal';
import PhotoCarousel from '../PhotoCarousel/PhotoCarousel';
import cls from './Profile.module.scss';

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
    messages: string[]
    sendMessage: (message: string) => void
    addToFriends: () => void
    storeFriends: IFriend[]
}

const Profile: React.FC<ProfileProps> = observer((props) => {

    const { profileData, isOwner, ownerInterests, sendMessage, messages, addToFriends, storeFriends } = props;
    const { username, photos, friends, age, city, interests, gender } = profileData;

    const [isEditMode, setIsEditMode] = useState(false);

    const closeModal = useCallback(() => {
        setIsEditMode(false);
    }, []);

    const openModal = useCallback(() => {
        setIsEditMode(true);
    }, []);

    const addFriendHandler = () => {
        addToFriends()
    }

    const hasSomeInterests = useMemo(
        () => checkHasSameInterests(ownerInterests ?? '', interests ?? ''),
        [interests, ownerInterests])


    const actionsBlock = isOwner ? (
        <div className={cls.actions}>
            <Button>Открыть сообщения</Button>
        </div>
    )
        : (
            <div className={cls.actions}>
                {hasSomeInterests && <Button onClick={openModal}>Написать сообщение</Button>}
                <Button onClick={addFriendHandler}>Добавить в друзья</Button>
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
                {isOwner ? (
                    <p>Друзья: {storeFriends.length}</p>
                ) : (
                    <p>Друзья: {friends.length}</p>
                )}
                {isOwner && <p>Сообщения: {messages.length}</p>}
                <p>Город: {city}</p>
                <p>Интересы: {interests} </p>
                <Modal isOpen={isEditMode} closeModal={closeModal}>
                    <MessageForm sendMessage={sendMessage} />
                </Modal>
            </div>
        </div>
    )
});

export default Profile;