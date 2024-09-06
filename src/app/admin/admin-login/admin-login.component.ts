import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthAdminService } from 'src/app/api-services/auth-admin.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

    spinner: any = false;
    adminname: any = 'master';
    password: any = '1234';
    adminData: any = {
        adminId: 1,
        fullname: 'Test Admin',
        username: 'Test Admin',
        role: 'admin',
        status: 1,
        lastLogin: null
    };

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public authAdminService: AuthAdminService,
        private cookieService: CookieService,
        public toastr: ToastrManager
    ) { }

    ngOnInit(): void {
    }

    getAdminLogin() {
        // this.spinner = true;
        // this.cookieService.set('path', '/myapp');
        // setTimeout(async() => {
        //     this.spinner = false;
        //     this.adminData['lastLogin'] = moment().format('YYYY-MM-DD HH:mm:ss');
        //     for (const [key, value] of Object.entries(this.adminData)) {
        //         localStorage.setItem(key, value.toString());
        //     }
        //     this.router.navigate(['/admin/home']);
        // }, 2000);

        this.spinner = true;

        if (this.setFormValidation()) {
            this.spinner = false;
            return this.toastr.errorToastr('Please fill the required fields.');
        }

        const adminPayload = {
            adminname: this.adminname,
            password: this.password
        }
        console.log('Post payload to get admin login data isss:', adminPayload);

        this.authAdminService.adminLogin(adminPayload).subscribe(async (response: any) => {
            console.log('Get admin login data response isss', response);
            if (response && response.success) {
                this.toastr.successToastr(response.message);
                // this.cookieService.set('path', '/');
                let id: any = 1;
                for (const [key, value] of Object.entries(response.data)) {
                    let newItem: any = value;
                    localStorage.setItem(key, newItem);
                    sessionStorage.setItem(key, newItem);
                    // console.log('id isss:', id);
                    if (id == Object.keys(response.data).length) {
                        setTimeout(() => {
                            this.router.navigate(['/admin/home']);
                        }, 1000);
                    }
                    id += 1;
                }
                // setTimeout(() => {
                //     this.router.navigate(['/admin/home']);
                // }, 2000);
            } else {
                this.toastr.errorToastr(response.message);
            }
            this.spinner = false;
        }, (error: any) => {
            this.toastr.errorToastr('Network failed, Please try again.');
            this.spinner = false;
        });
    }

    setFormValidation() {
        if (!this.adminname || !this.password) {
            return true;
        } else {
            return false;
        }
    }

}
