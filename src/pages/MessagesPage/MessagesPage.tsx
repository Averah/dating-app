import { observer } from 'mobx-react-lite';
import React, { FC, useCallback } from 'react';
import Messages from '../../components/Messages/Messages';
import usersStore from '../../store/usersStore';
import cls from './MessagesPage.module.scss';

export const MessagesPage: FC = observer(() => {

    const messages = usersStore.messages;

    return (
        <div className={cls.MessagesPage}>
            <div className={cls.title}>Cообщения</div>
            <Messages messages={messages} />
        </div>
    );
});


export default MessagesPage;