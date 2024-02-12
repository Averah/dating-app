import { flow, makeAutoObservable } from "mobx";
import axios, { AxiosError } from 'axios';

export interface IUserData {
    email: string
    password?: string
    username?: string,
    id?: string
}

class AuthStore {
    userData = {
        email: '',
        password: '',
        username: '',
        id: ''
    }
    isAuthorized = false;
    error = '';
    isLoading = false;

    profileData = {
        photo: '',
        friendsCount: '',
        messagesCount: '',
        age: null,
        city: '',
        interests: '',
        gender: '',
    }

    constructor() {
        makeAutoObservable(this)
    }

    login = flow(function* (this: AuthStore, loginData) {
        try {
            this.isLoading = true
            const response = yield axios.post('http://localhost:8000/login', loginData)
            console.log(response);

                localStorage.setItem('token', (response.data.accessToken));
                this.isAuthorized = true;
                this.userData = response.data.user
                console.log( this.userData);
                this.clearError()

        } catch (error) {
            const err = error as AxiosError
            const errorMessage = err.response?.data as string
            this.error = errorMessage;
        } finally {
            this.isLoading = false
        }
    })

    signup = flow(function* (this: AuthStore, signUpData: IUserData) {
        try {
            this.isLoading = true;
            const response = yield axios.post('http://localhost:8000/signup', signUpData)

            this.clearError()

        } catch (error) {
            const err = error as AxiosError
            const errorMessage = err.response?.data as string
            this.error = errorMessage;
        } finally {
            this.isLoading = false;
        }
    })

    initAuthData() {
        const isAuthorized = localStorage.getItem('token');
        if (isAuthorized) {
            this.isAuthorized = true;
        }
    }

    logout() {
        this.isAuthorized = false;
        this.userData = {
            email: '',
            password: '',
            username: '',
            id: ''
        }
        localStorage.removeItem('token');
    }

    clearError() {
        this.error = ''
    }
}

const authStore = new AuthStore();
export default authStore;