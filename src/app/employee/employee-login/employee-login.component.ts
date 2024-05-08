import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-employee-login',
    templateUrl: './employee-login.component.html',
    styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {

    spinner: any = false;

    constructor(
        public router: Router,
        public route: ActivatedRoute
    ) { }

    ngOnInit(): void {
    }

    employeeLogin() {
        this.spinner = true;
        setTimeout(async () => {
            this.spinner = false;
            this.router.navigate(['/employee/home']);
        }, 2000);
    }

}
