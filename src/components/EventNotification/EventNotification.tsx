import React, { useEffect } from 'react';
import { notification } from 'antd';

interface NotificationProps {
    isFriendRequestSent?: boolean
    isMessageSent?: boolean
    isMessageReceived?: boolean
    lastMessage: string
    onClose: () => void
}

const EventNotification: React.FC<NotificationProps> = ({ isFriendRequestSent, isMessageSent, lastMessage, onClose, isMessageReceived }) => {
    useEffect(() => {
        if (isFriendRequestSent) {
          showNotification('Запрос в друзья', 'У вас новый запрос в друзья!');
        }
    
        if (isMessageSent) {
          showNotification('У вас новое сообщение', lastMessage);
        }

        if (isMessageReceived) {
            showNotification('Cообщение прочитано', 'Вашей сообщение прочитано');
        }
      }, [isFriendRequestSent, isMessageSent, lastMessage, isMessageReceived]);
    
      const showNotification = (message: string, description: string) => {
    
        notification.open({
          message,
          description,
          duration: 0,
          placement: 'bottomRight',
          onClose: onClose
        });
      };
    
      return null;
}

export default EventNotification;
