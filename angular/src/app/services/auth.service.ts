import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable()
export class AuthService {

    constructor() {}
          
    setLocalStorage(responseObj) {
        const expires = moment().add(responseObj.expiresIn);

        localStorage.setItem('token', responseObj.token);
        localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
    }          

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires');
    }

    isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiiration = localStorage.getItem('expires');
        const expiresAt = JSON.parse(expiiration);
        return moment(expiresAt);
    }    
}