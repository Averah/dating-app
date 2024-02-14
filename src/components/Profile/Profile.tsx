import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersStore, { IFriend, IProfileData } from '../../store/usersStore';
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

interface IProfileProps {
    profileData: IProfileData
    isOwner: boolean
    isMessageSent: boolean
    ownerInterests?: string
    messages: string[]
    sendMessage: (message: string) => void
    addToFriends: () => void
    storeFriends: IFriend[]
    userId?: string
}

const Profile: React.FC<IProfileProps> = observer((props) => {

    const { profileData, isOwner, ownerInterests, sendMessage, messages, addToFriends, storeFriends, isMessageSent, userId } = props;
    const { username, photos, friends, age, city, interests, gender } = profileData;

    const isOwnerFriend = usersStore.friends?.find(user => user.id === userId);

    const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);

    const closeModal = useCallback(() => {
        setIsMessageFormOpen(false);
    }, []);

    const openModal = useCallback(() => {
        setIsMessageFormOpen(true);
    }, []);

    const navigate = useNavigate();

    const navigateToMessages = () => {
        navigate('/messages');
    };

    const hasSomeInterests = useMemo(
        () => checkHasSameInterests(ownerInterests ?? '', interests ?? ''),
        [interests, ownerInterests])


    const actionsBlock = isOwner ? (
        <div className={cls.actions}>
            <Button className={cls.actionBtn} onClick={navigateToMessages}>Открыть сообщения</Button>
        </div>
    )
        : (
            <div className={cls.actions}>
                {hasSomeInterests && <Button onClick={openModal} className={cls.actionBtn}>Написать сообщение</Button>}
                {!isOwnerFriend ? (
                    <div className={cls.friendRequest}><Button onClick={addToFriends} className={cls.actionBtn}>Добавить в друзья</Button></div>

                ) : (
                    <div className={cls.friendRequest}>Запрос в друзья отправлен</div>
                )}
            </div>
        )

    return (
        <div className={cls.Profile}>
            <h2>{username}, {age}</h2>
            <div className={cls.photoCarousel}>
                <PhotoCarousel photos={photos} />
            </div>
            {actionsBlock}
            <div className={cls.description}>
                <p>Пол: {gender} </p>
                {isOwner ? (
                    <p>Друзья: {storeFriends.length}</p>
                ) : (
                    <p>Друзья: {friends.length}</p>
                )}
                {isOwner && <p>Сообщения: {messages.length}</p>}
                <p>Город: {city}</p>
                <p>Интересы: {interests} </p>
                <Modal isOpen={isMessageFormOpen} closeModal={closeModal}>
                    <MessageForm sendMessage={sendMessage} isMessageSent={isMessageSent} />
                </Modal>
            </div>
        </div>
    )
});

export default Profile;