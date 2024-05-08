import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore';
declare var $: any;
@Component({
    selector: 'app-admin-sidemenu',
    templateUrl: './admin-sidemenu.component.html',
    styleUrls: ['./admin-sidemenu.component.css']
})
export class AdminSidemenuComponent implements OnInit {

    public href: any = null;

    constructor(
        public router: Router,
        public route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        console.log(this.router.url);
        this.href = this.router.url;
    }

}
