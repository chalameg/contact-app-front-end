import axios from 'axios';

export class APIService{

    constructor(){
    }

    getContacts() {
        const url = 'http://localhost:3000/contacts/';
        return axios.get(url).then(response => response.data);
    }

}