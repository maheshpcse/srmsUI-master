import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

    countArr: any = [];

    constructor(
        public router: Router,
        public route: ActivatedRoute
    ) { }

    ngOnInit(): void {
    }

    goToPage(url?: any) {
        this.router.navigate([`${url}`]);
    }

}
