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

    // TODO: submenu active/deactive still inprogress.
    setSubmenuActive(menu?: any) {
        console.log('menu isss:', menu);
        var submenus: any = {
            0: ['/admin/school/add-edit-school','/admin/school/bulk-upload-school','/admin/school/manage-school']
        }
        return submenus[menu].includes(this.href) || false;
    }

}
