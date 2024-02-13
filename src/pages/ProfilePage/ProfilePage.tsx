import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import Profile from '../../components/Profile/Profile';
import authStore from '../../store/authStore';
import usersStore from '../../store/usersStore';
import cls from './ProfilePage.module.scss';


export const ProfilePage: FC = observer(() => {
    const isAuthorized = authStore.isAuthorized;
    const authorizedUserId = authStore.userData.id;
    const profileData = usersStore.profileData;
    const ownerInterests = authStore.userData.interests;

    const params = useParams();

    useEffect(() => {
        let userId = params.userId ? params.userId : null;
        if (!userId) {
            userId = authorizedUserId ?? null;
        }
        userId && usersStore.fetchProfile(userId)
    }, [params.userId, authorizedUserId]);

    useEffect(() => {
        return usersStore.clearProfileData()
    }, [])

    if (!isAuthorized) {
        return <Navigate to='/login' />
    }

    return (
        <div className={cls.ProfilePage} >
            {profileData ? <Profile profileData={profileData} isOwner={!params.userId} ownerInterests={ownerInterests} /> : <Loader className={cls.profileLoader} />
            }
            {/* <Profile profileData={profileData} isOwner={!params.userId} ownerInterests={ownerInterests} /> */}
        </div>
    );
});
