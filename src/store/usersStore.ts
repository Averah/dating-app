import axios from 'axios';
import { makeAutoObservable, flow } from 'mobx';
import { addQueryParams } from '../lib/helpers/addQueryParams';

export type NotificationType = 'newFriend' | 'newMessage' | 'messageReceived'

export interface IUser {
    id: string
    username: string
    age: string
    city: string
    interests: string
    gender: string
    photos: string[]
}

export interface IFriend {
    id: string
}

export interface IProfileData {
    username: string
    photos: string[]
    friends: IFriend[]
    age: string
    city: string
    interests: string
    gender: string
    id: string
}

class UsersStore {
    isFetching: boolean = false
    users: IUser[] = []
    profileData: IProfileData | null = null
    age: string | undefined = undefined
    search: string | undefined = undefined
    messages: string[] = []
    isMessageSent: boolean = false
    messageReceivedNotificationsCount: number = 0
    messageError: string = ''
    friends: IFriend[] = []
    friendRequestNotificationsCount: number = 0
    friendshipError: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    fetchProfile = flow(function* (this: UsersStore, userId) {

        try {
            const response = yield axios.get(`http://localhost:8000/users/${userId}`);
            this.profileData = response.data
        } catch (error) {
            console.log(error);
        }
    })

    fetchUsers = flow(function* (this: UsersStore, isProfilePage?: boolean) {
        try {
            this.isFetching = true
            const response = yield axios.get('http://localhost:8000/664/users', {
                params: {
                    q: this.search || undefined,
                    age: this.age || undefined,
                },
            })
            this.users = response.data

            !isProfilePage && addQueryParams({
                search: this.search,
                age: this.age ?? '',
            })
        } catch (error) {
            console.log(error);

        } finally {
            this.isFetching = false
        }
    })

    clearProfileData() {
        this.profileData = null
    }

    changeSearch(search?: string) {
        this.search = search;
    }

    changeAge(age?: string) {
        this.age = age;
    }

    //id авторизованного пользователя в кач-ве заглушки, чтобы показать уведомление о сообщении на странице профиля
    sendMessage(message: string, id: string) {
        const userIndex = this.users.findIndex((user) => user.id === id);

        if (userIndex !== -1) {
            this.isMessageSent = false
            //добавляю сообщение в массив в сторе т.к.сервер пока не поддерживает изменение этих данных
            this.messages.push(message)
            this.isMessageSent = true
            this.messageReceivedNotificationsCount = 0
        } else {
            this.messageError = 'Ошибка! Сообщение не отправлено'
        }
    }

    //ownerId авторизованного пользователя в кач-ве заглушки, чтобы показать уведомление о дружбе на странице профиля
    addToFriends(friendId: string, ownerId: string) {
        const user1 = this.users.find((user) => user.id === ownerId);
        const user2 = this.users.find((user) => user.id === friendId);
        if (user1 && user2) {
            this.friends.push(user2);
            this.friendRequestNotificationsCount += 1
        }
        else {
            this.friendshipError = 'Ошибка!'
        }
    }

    readMessage(type: NotificationType) {
        this.friendRequestNotificationsCount = 0
        this.isMessageSent = false
        if (type === 'newMessage') {
            this.messageReceivedNotificationsCount += 1
        }
    }

    clearData() {
        this.messageError = '';
        this.friendshipError = '';
        this.messages = [];
        this.friends = [];
        this.messageReceivedNotificationsCount = 0;
        this.friendRequestNotificationsCount = 0;
    }



}

const usersStore = new UsersStore();
export default usersStore;