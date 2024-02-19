import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import Messages from '../../components/Messages/Messages';
import authStore from '../../store/authStore';
import usersStore from '../../store/usersStore';
import cls from './MessagesPage.module.scss';

export const MessagesPage: FC = observer(() => {

    const messages = usersStore.messages;
    const isAuthorized = authStore.isAuthorized;

    if (!isAuthorized) {
        return <Navigate to='/login' />
    }

    return (
        <div className={cls.MessagesPage}>
            <div className={cls.title}>Cообщения</div>
            <Messages messages={messages} />
        </div>
    );
});


export default MessagesPage;