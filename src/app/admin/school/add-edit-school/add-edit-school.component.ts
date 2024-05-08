import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
declare var $: any;


@Component({
    selector: 'app-add-edit-school',
    templateUrl: './add-edit-school.component.html',
    styleUrls: ['./add-edit-school.component.css']
})
export class AddEditSchoolComponent implements OnInit {

    showOther: any = false;
    @ViewChild('schoolForm', { static: false }) schoolFormRef: NgForm;
    submitReq: any = 0;
    pageId: any = null;
    action: any = 'Add';

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public toastr: ToastrManager
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((item?: any) => {
            console.log('Get param item isss', item);
            this.pageId = item && Object.keys(item).length > 0 ? Number(item['school_id']) : null;
        });
        if (this.pageId) {
            this.action = 'Update';
            this.getSchoolData();
        }
    }

    getSchoolData() {

    }

    saveData() {
        this.submitReq = 1;
        setTimeout(async() => {
            this.submitReq = 2;
        }, 2000);
    }

}
