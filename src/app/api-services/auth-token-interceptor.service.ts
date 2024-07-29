import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class AuthTokenInterceptorService implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('Called token intercept() function');

        const token = sessionStorage.getItem('token');
        const role = sessionStorage.getItem('role');
        let userHeaders: any = [];
        let userSetHeaders: any = {};   

        if (!token || !role) {
            return next.handle(request);
        } else {
            userSetHeaders = {
                [`${role}_id`]: sessionStorage.getItem(`${role}_id`),
                user_id: sessionStorage.getItem('user_id'),
                [`${role}name`]: sessionStorage.getItem(`${role}name`),
                username: sessionStorage.getItem('username'),
                email: sessionStorage.getItem('email')
            }
            userHeaders = [`${token}`, userSetHeaders[`${role}_id`], role];

            const clientRequest = request.clone({
                // headers: request.headers.set('Authorization', [`Bearer ${token}`, user_id, role]),
                headers: request.headers.set('Authorization', userHeaders),
                setHeaders: userSetHeaders
            });
    
            return next.handle(clientRequest);
        }
    }
}
