import { flow, makeAutoObservable } from "mobx";
import axios, { AxiosError } from 'axios';

export interface IUserData {
    email: string
    password?: string
    username?: string,
    id?: string
}

export interface IProfileData {
    username: string,
    avatar: string,
    friends: string,
    messages: string,
    age: string,
    city: string,
    interests: string,
    gender: string,
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
    isSignedUp = false;

    constructor() {
        makeAutoObservable(this)
    }

    clearError() {
        this.error = ''
    }

    login = flow(function* (this: AuthStore, loginData) {
        try {
            this.isLoading = true
            const response = yield axios.post('http://localhost:8000/login', loginData)
            console.log(response);

            localStorage.setItem('token', (JSON.stringify(response.data.user)));
            this.isAuthorized = true;
            this.userData = response.data.user
            console.log(this.userData);
            this.clearError()

        } catch (error) {
            const err = error as AxiosError
            const errorMessage = err.response?.data as string
            this.error = errorMessage;
        } finally {
            this.isLoading = false
        }
    })


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

    signup = flow(function* (this: AuthStore, signUpData: IUserData) {
        try {
            this.isLoading = true;
            const response = yield axios.post('http://localhost:8000/signup', signUpData)
            console.log(response);
            if (response.status === 201) {
                this.isSignedUp = true;
                this.clearError();
            }

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
            this.userData = JSON.parse(isAuthorized)
        }
    }
}

const authStore = new AuthStore();
export default authStore;