import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
import { SchoolService } from 'src/app/api-services/school.service';
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
    spinner: any = false;
    
    schoolName: any = 'T John Institute Of Technology';
    schoolStatus: any = 1;
    isoCertified: any = "1";
    address: any = 'Bannerghatta Road';
    cityName: any = 'Bengaluru';
    stateName: any = 'Karnataka';
    zipCode: any = '560083';
    emailAddress: any = 'admin@tjohncollege.com';
    phonenumber: any = '8040250555';
    adminId: any = sessionStorage.getItem('admin_id');

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public schoolService: SchoolService,
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

    addOrUpdateSchool() {
        // school_id,
        // name, status, isocertified
        // address, city, state, zipcode
        // email, phonenumber
        // website (pending)
        this.spinner = true;
        if (this.checkFormValidation(this.schoolFormRef)) {
            this.spinner = false;
            return this.toastr.errorToastr('Please fill the required fields.');
        }
        this.submitReq = 1;
        const schoolPayload = {
            school_id: this.action == 'Add' ? null : Number(this.pageId),
            schoolname: this.schoolName,
            status: Number(this.schoolStatus),
            isocertified: Number(this.isoCertified),
            address: this.address,
            city: this.cityName,
            state: this.stateName,
            zipcode: this.zipCode.toString(),
            email: this.emailAddress,
            phonenumber: this.phonenumber.toString(),
            created_by: Number(this.adminId)
        }
        console.log('Post payload to add or update school data isss:', schoolPayload);

        this.schoolService.addOrUpdateSchoolInfo(schoolPayload).subscribe(async (response: any) => {
            console.log('Get add or update school data response isss', response);
            if (response && response.success) {
                // this.toastr.successToastr(response.message);
                this.submitReq = 2;
                this.resetForm();
            } else {
                // this.toastr.errorToastr(response.message);
                this.submitReq = 3;
            }
            this.spinner = false;
        }, (error: any) => {
            // this.toastr.errorToastr('Network failed, Please try again.');
            this.spinner = false;
            this.submitReq = 3;
        });        
    }

    checkFormValidation(form?: any) {
        return form.invalid;
    }

    resetForm() {
        if (this.schoolFormRef) {
            this.schoolFormRef.reset();
        }
        this.schoolName = null;
        this.schoolStatus = null;
        this.isoCertified = null;
        this.address = null;
        this.cityName = null;
        this.stateName = null;
        this.zipCode = null;
        this.emailAddress = null;
        this.phonenumber = null;
    }

    saveData() {
        // this.submitReq = 1;
        // setTimeout(async() => {
        //     this.submitReq = 2;
        // }, 2000);
        this.addOrUpdateSchool();
    }

}
