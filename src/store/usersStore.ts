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
}

export interface IFriend {
    id: string
}

export interface IProfileData {
    username: string
    photos: string[]
    friends: IFriend[]
    messages: string
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

    clearUsers() {
        this.users = []
    }

    changeSearch(search?: string) {
        this.search = search;
    }

    changeAge(age?: string) {
        this.age = age;
    }

}

const usersStore = new UsersStore();
export default usersStore;