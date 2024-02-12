import axios from 'axios';
import { makeAutoObservable, flow } from 'mobx';

export interface IUser {
    id: string
    username: string
    age: string
    city: string
    interests: string
    gender: string
    avatar: string
}
class UsersStore {

    isFetching = false
    users = []
    profileData = {
        username: '',
        avatar: '',
        friends: '',
        messages: '',
        age: '',
        city: '',
        interests: '',
        gender: '',
    }

    

    constructor() {
        makeAutoObservable(this)
    }

    fetchProfile = flow(function* (this: UsersStore, userId) {
        const response = yield axios.get(`http://localhost:8000/users/${userId}`);
        this.profileData = response.data
        console.log(this.profileData);
        
    })

    fetchUsers = flow(function* (this: UsersStore) {

        try {
            this.isFetching = true
            const response = yield axios.get('http://localhost:8000/664/users')
            this.users = response.data
        } catch (error) {
            console.log(error);

        } finally {
            this.isFetching = false
        }
    })

    clearProfileData() {
        this.profileData = {
            username: '',
            avatar: '',
            friends: '',
            messages: '',
            age: '',
            city: '',
            interests: '',
            gender: '',
        }
    }

    clearUsers() {
        this.users = []
    }

}

const usersStore = new UsersStore();
export default usersStore;