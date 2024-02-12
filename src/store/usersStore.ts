import axios from 'axios';
import { makeAutoObservable, flow } from 'mobx';

class UsersStore {
    constructor() {
        makeAutoObservable(this)
    }

    fetchUsers = flow(function* (this: UsersStore) {
        const response = yield axios.get('http://localhost:8000/users')
        console.log(response);
        
    
    })
}

const usersStore = new UsersStore();
export default usersStore;