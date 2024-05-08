import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './api-url.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class AuthAdminService {

	public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

	constructor(
		private http: HttpClient,
        public router: Router
	) { }

	// ******************* Mysql Database *****************************

    checkValidateLogin() {
        return this.http.get(APIURL.CHECK_VALIDATE_ADMIN_LOGIN);
    }

    // ADMIN authentication API Service's
    adminLogin(data: any) {
        return this.http.post<any>(APIURL.ADMIN_LOGIN, data);
    }

	adminReSignIn(data: any) {
        return this.http.post<any>(APIURL.ADMIN_RESIGNIN, data);
    }

    getLoginId(role?: any) {
		return sessionStorage.getItem(`${role}_id`);
    }

    getLoginRole() {
        return sessionStorage.getItem('role');
    }

	getLoginToken() {
        return sessionStorage.getItem('token');
    }

    getLoginPayload() {
        const authToken = this.getLoginToken();
        if (authToken) {
            return JSON.parse(atob(authToken.split('.')[1]));
        } else {
            return null;
        }
    }

    isLoggedIn(role?: any): boolean {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const expiresTime = sessionStorage.getItem('expired');
        // console.log('currentTime isss:', currentTime);
        // console.log('expiresTime isss:', expiresTime);

        const loginPayload = this.getLoginPayload();
        // console.log('loginPayload isss:', loginPayload);

        if (loginPayload && expiresTime) {
            return expiresTime > currentTime;
            // return loginPayload.exp > Date.now() / 1000;
        } else {
            return false;
        }
    }

    isLoggedOut(role?: any) {
        localStorage.clear();
        sessionStorage.clear();
        if (role) {
            this.router.navigate([`/${role}/login`]);
        } else {
            this.router.navigate(['/home']);
        }
    }
}
