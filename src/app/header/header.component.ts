import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public studentId: any = localStorage.getItem('studentId') || null;

    constructor(
        public router: Router,
        public route: ActivatedRoute
    ) { }

    ngOnInit(): void {
    }

    isLoggedIn() {
        if (this.studentId == null || this.studentId == '') {
            return false;
        } else {
            return true;
        }
    }

    isLoggedOut() {
        localStorage.clear();
        this.studentId = null;
        this.router.navigate(['/home']);
    }

}
