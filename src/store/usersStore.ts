import axios from 'axios';
import { makeAutoObservable, flow } from 'mobx';
import { addQueryParams } from '../lib/helpers/addQueryParams';

export interface IUser {
    id: string
    username: string
    age: string
    city: string
    interests: string
    gender: string
    photos: string[]
    // friends: IFriend[]
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
}

class UsersStore {
    isFetching: boolean = false
    users: IUser[] = []
    profileData: IProfileData | null = null
    age: string | undefined = undefined
    search: string | undefined = undefined
    messages: string[] = []
    isMessageSent: boolean = false
    isMessageReceived: boolean = false
    messageError: string = ''
    friends: IFriend[] = []
    isFriendRequestSent: boolean = false
    friendshipError: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    fetchProfile = flow(function* (this: UsersStore, userId) {
        const response = yield axios.get(`http://localhost:8000/users/${userId}`);
        this.profileData = response.data
    })

    fetchUsers = flow(function* (this: UsersStore) {
        try {
            this.isFetching = true
            const response = yield axios.get('http://localhost:8000/664/users', {
                params: {
                    q: this.search || undefined,
                    age: this.age || undefined,
                },
            })
            this.users = response.data
            console.log(this.users);

            addQueryParams({
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
    sendMessage(message: string, id = "ZgGEuFz") {
        const userIndex = this.users.findIndex((user) => user.id === id);

        if (userIndex !== -1) {
            this.isMessageSent = false
            //также добавляю сообщение в массив в сторе т.к. сервер не поддерживает изменение этих данных
            this.messages.push(message)
            this.isMessageSent = true
        } else {
            this.messageError = 'Ошибка! Сообщение не отправлено'
        }
    }

    //ownerId авторизованного пользователя в кач-ве заглушки, чтобы показать уведомление о дружбе на странице профиля
    addToFriends(friendId: string, ownerId = "ZgGEuFz") {
        const user1 = this.users.find((user) => user.id === ownerId);
        const user2 = this.users.find((user) => user.id === friendId);
        if (user1 && user2) {
            this.isFriendRequestSent = false
            this.friends.push(user2);
            this.isFriendRequestSent = true
        }
        else {
            this.friendshipError = 'Ошибка!'
        }
    }

    readMessage() {
        this.isMessageReceived = true
        this.isFriendRequestSent = false
        this.isMessageSent = false
    }

    

}

const usersStore = new UsersStore();
export default usersStore;