import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-student-signup',
    templateUrl: './student-signup.component.html',
    styleUrls: ['./student-signup.component.css']
})
export class StudentSignupComponent implements OnInit {

    spinner: any = false;

    constructor(
        public router: Router,
        public route: ActivatedRoute
    ) { }

    ngOnInit(): void {
    }

    studentLogin() {
        this.router.navigate(['/student/login']);
    }

    studentSignup() {
        this.spinner = true;
        setTimeout(() => {
            this.spinner = false;
        }, 2000);
    }

}
