import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
declare var $: any;

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

    public role: any = localStorage.getItem('role');
    public searchQuery: any = '';
    public routerConfig: any = {};
    public isValidURL: any = null;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public toastr: ToastrManager
    ) { }

    ngOnInit(): void {
        // console.log('route isss:', this.router);
        this.routerConfig = _.groupBy(this.router.config, 'path');
        // console.log('routerConfig isss:', this.routerConfig);
    }

    backToHomeOrLogin() {
        if (!this.role) this.router.navigate([`/admin/login`]);
        else this.router.navigate([`/${this.role}/home`]);
    }

    searchPage() {
        if (this.routerConfig.hasOwnProperty(this.searchQuery)) {
            this.isValidURL = true;
            this.router.navigate([`/${this.searchQuery}`]);
        } else {
            this.isValidURL = false;
        }
    }

    checkQuery() {
        if (this.searchQuery == '' || !this.searchQuery) this.isValidURL = null;
    }

}
