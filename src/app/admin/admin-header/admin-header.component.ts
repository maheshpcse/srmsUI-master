import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
declare var $: any;
declare function getValue(): any;

@Component({
    selector: 'app-admin-header',
    templateUrl: './admin-header.component.html',
    styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

    public role: any = sessionStorage.getItem('role');
    public refreshToken: any = sessionStorage.getItem('refreshToken');
    public adminname: any = sessionStorage.getItem('adminname');
    startSession: any = null;
    endSession: any = null;
    sessionTime: any = '00:15:00';
    public colorObj: any = {
        'blue': this.sessionTime > '00:00:30' && this.sessionTime <= '00:01:00',
        'red': this.sessionTime >= '00:00:00' && this.sessionTime <= '00:00:30'
    }

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        private cookieService: CookieService,
        public toastr: ToastrManager
    ) { }

    ngOnInit(): void {
        // this.setStartSessionTime();
    }

    showHide() {
        return getValue();
    }

    // Not required, just token validation checking purpose
    checkValidateToken() {
        this.authAdminService.checkValidateLogin().subscribe(async (response: any) => {
            console.log('Get validate login response isss:', response);
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

    reSignIn() {
        const tokenPayload = {
            adminname: this.adminname,
            refreshToken: this.refreshToken
        }
        console.log('Post payload to get admin reSignIn data isss', tokenPayload);

        this.authAdminService.adminReSignIn(tokenPayload).subscribe(async (response: any) => {
            console.log('Get admin reSignIn data response isss', response);
            if (response && response.success) {
                for (const [key, value] of Object.entries(response.data)) {
                    let newItem: any = value;
                    localStorage.setItem(key, newItem);
                    sessionStorage.setItem(key, newItem);
                }
                setTimeout(() => {
                    clearInterval(this.startSession);
                    this.setStartSessionTime();
                }, 500);
            } else {
                this.toastr.errorToastr(response.message);
            }
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
        });
    }

    setStartSessionTime() {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const expiresTime = sessionStorage.getItem('expired');
        console.log('In admin header component, currentTime isss:', currentTime);
        console.log('In admin header component, expiresTime isss:', expiresTime);

        let zero: any = 0;
        const minutes = `00:${(Number(moment(expiresTime).diff(moment(currentTime), 'minutes')) + 1).toString().padStart(2, zero)}:00`;
        console.log('minutes isss:', minutes);
        this.getSessionTime(minutes);
    }

    getSessionTime(minutes?: any) {
        console.log('called getSessionTime()');
        this.sessionTime = minutes;

        this.startSession = setInterval(() => {
            const tempSessionTime = `${moment().format('YYYY-MM-DD')} ${this.sessionTime}`;
            // console.log('tempSessionTime isss:', tempSessionTime);

            let seconds: any = moment(tempSessionTime).subtract(1, 'seconds').format('ss');
            // console.log(seconds);

            let minutes: any = moment(tempSessionTime).subtract(1, 'seconds').format('mm');
            // console.log(minutes);

            let hours: any = moment(tempSessionTime).subtract(1, 'seconds').format('HH');
            // console.log(hours);

            this.sessionTime = `${hours}:${minutes}:${seconds}`;
            // console.log('sessionTime isss:', this.sessionTime);

            if (this.sessionTime === '00:02:00') {
                console.log('Current session time isss:', this.sessionTime);
                $('#restartConfirmModal').modal('show');
            }

            if (this.sessionTime === '00:00:00') {
                console.log('Admin login session time is expired', this.sessionTime);
                setTimeout(async () => {
                  this.clearSessionTime(this.startSession);
                }, 500);
            }
        }, 1000);
    }

    clearSessionTime(time?: any) {
        clearInterval(time);
        this.startSession = null;
        this.endSession = null;
        this.sessionTime = '00:15:00';
        $('#restartConfirmModal').modal('hide');
        $('#logoutConfirmModal').modal('hide');
        this.authAdminService.isLoggedOut(this.role);
    }

    logOut() {
        this.clearSessionTime(this.startSession);
    }

    ngOnDestroy() {
        clearInterval(this.startSession);
        this.startSession = null;
        this.endSession = null;
        this.sessionTime = '00:15:00';
        $('#restartConfirmModal').modal('hide');
        $('#logoutConfirmModal').modal('hide');
    }

}
