import { notification } from "antd";
import { useEffect } from "react";
import authStore from "../../store/authStore";
import usersStore, { NotificationType } from "../../store/usersStore";

export const useEventNotification = () => {
    const { friendRequestNotificationsCount, messages, isMessageSent, messageReceivedNotificationsCount } = usersStore;
    const lastMessage = messages[messages.length - 1]
    const showNotification = (type: NotificationType, message: string, description: string) => {
        if (authStore.isAuthorized) {
            notification.open({
                message,
                description,
                duration: 0,
                placement: 'bottomRight',
                onClose: () => usersStore.readMessage(type)
            });
        }
    };

    useEffect(() => {
        if (friendRequestNotificationsCount) {
            showNotification('newFriend', 'Запрос в друзья', 'У вас новый запрос в друзья!');
        }
    }, [friendRequestNotificationsCount]);
    useEffect(() => {
        if (isMessageSent) {
            showNotification('newMessage', 'У вас новое сообщение', lastMessage);
        }
    }, [isMessageSent, lastMessage]);
    useEffect(() => {
        if (messageReceivedNotificationsCount) {
            showNotification('messageReceived', 'Сообщение прочитано', 'Вашей сообщение прочитано');
        }
    }, [messageReceivedNotificationsCount]);
};