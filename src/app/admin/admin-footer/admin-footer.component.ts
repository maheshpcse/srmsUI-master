import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin-footer',
    templateUrl: './admin-footer.component.html',
    styleUrls: ['./admin-footer.component.css']
})
export class AdminFooterComponent implements OnInit {

    lastLoginTime: any = localStorage.getItem('lastLogin');

    constructor() { }

    ngOnInit(): void {
    }

}
