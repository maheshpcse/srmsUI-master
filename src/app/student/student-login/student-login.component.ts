import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-student-login',
    templateUrl: './student-login.component.html',
    styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {

    spinner: any = false;
    studentData: any = {
        userId: 1,
        studentId: 'USER001',
        fullname: 'Test Student',
        role: 'student',
        status: 1,
        lastLogin: null
    };

    constructor(
        public router: Router,
        public route: ActivatedRoute
    ) { }

    ngOnInit(): void {
    }

    studentSignup() {
        this.router.navigate(['/student/signup']);
    }

    studentLogin() {
        this.spinner = true;
        setTimeout(() => {
            this.spinner = false;
            this.studentData['lastLogin'] = moment().format('YYYY-MM-DD HH:mm:ss');
            for (const [key, value] of Object.entries(this.studentData)) {
                localStorage.setItem(key, value.toString());
            }
            this.router.navigate(['/home']);
        }, 2000);
    }

}
