import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $: any;

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

    public role: any = localStorage.getItem('role');
    public searchQuery: any = '';

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public toastr: ToastrManager
    ) { }

    ngOnInit(): void {
    }

    backToHome() {
        this.router.navigate([`/${this.role}/home`]);
    }

    searchPage() {
        this.router.navigate([`/${this.searchQuery}`]);
    }

}
