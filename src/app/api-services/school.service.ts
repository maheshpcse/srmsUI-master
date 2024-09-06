import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from './api-url.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class SchoolService {

	public role: any = sessionStorage.getItem('role');
    bSubject: any = new BehaviorSubject('default');

	constructor(
		private http: HttpClient,
        public router: Router
	) { }

	// School API Service's
    addOrUpdateSchoolInfo(data: any) {
        return this.http.post<any>(APIURL.ADD_OR_UPDATE_SCHOOL_INFO, data);
    }

	getSchoolInfoById(school_id: any) {
		return this.http.get<any>(APIURL.GET_SCHOOL_INFO_BY_ID + `/${school_id}`);
	}
}
