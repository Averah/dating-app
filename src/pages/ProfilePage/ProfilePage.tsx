import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import Profile from '../../components/Profile/Profile';
import authStore from '../../store/authStore';
import usersStore from '../../store/usersStore';
import cls from './ProfilePage.module.scss';

export const ProfilePage: FC = observer(() => {

    const { isAuthorized, userData: { id: authorizedUserId, interests: ownerInterests } } = authStore;
    const { profileData, isMessageSent, messages, friends: storeFriends } = usersStore;

    const params = useParams();

    const userId = params.userId;

    const addToFriends = useCallback(() => {
        (userId && authorizedUserId) && usersStore.addToFriends(userId, authorizedUserId);

    }, [userId, authorizedUserId]);


    const sendMessage = useCallback((message: string) => {
        authorizedUserId && usersStore.sendMessage(message, authorizedUserId);
    }, [authorizedUserId]);

    useEffect(() => {
        let userId = params.userId ? params.userId : null;
        if (!userId) {
            userId = authorizedUserId ?? null;
        };

        userId && usersStore.fetchProfile(userId);
        usersStore.fetchUsers(true);
    }, [params.userId, authorizedUserId]);

    useEffect(() => {
        return usersStore.clearProfileData();
    }, [])

    if (!isAuthorized) {
        return <Navigate to='/login' />
    }

    return (
        <div className={cls.ProfilePage} >
            {profileData ? (
                <Profile profileData={profileData}
                    isOwner={!params.userId}
                    ownerInterests={ownerInterests}
                    sendMessage={sendMessage}
                    messages={messages}
                    addToFriends={addToFriends}
                    storeFriends={storeFriends}
                    isMessageSent={isMessageSent}
                    userId={userId}
                />
            ) : (
                <Loader className={cls.profileLoader} />
            )
            }
        </div>
    );
});
