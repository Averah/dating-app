import { flow, makeAutoObservable } from "mobx";
import axios from 'axios';

export interface IUserData {
    email: string
    password: string
    username?: string
}

class AuthStore {
    userData = {
        email: '',
        password: ''
    }
    isAuthorized = false;
    error = '';


    constructor() {
        makeAutoObservable(this)
    }

    login = flow(function* (this: AuthStore, loginData: IUserData) {
        try {
            const response = yield axios.post('http://localhost:8000/login', loginData)
            console.log(response);

            if (response.status === 200) {
                localStorage.setItem('token', (response.data.accessToken));
                this.isAuthorized = true
            }

        } catch (error) {
            console.log(error);

            const err = error as Error;
            console.error('Ошибка авторизации:', err.message);
            this.error = err.message
        }
    })

    signup = flow(function* (this: AuthStore, signUpData: IUserData) {
        try {
            const response = yield axios.post('http://localhost:8000/signup', signUpData)
            console.log(response);

            const data = yield response.json();

            if (data.success) {
                this.isAuthorized = true;
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            const err = error as Error;
            console.error('Ошибка регистрации:', err.message);
            this.error = err.message
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
            password: ''
        }
        localStorage.removeItem('token');
    }
}

const authStore = new AuthStore();
export default authStore;