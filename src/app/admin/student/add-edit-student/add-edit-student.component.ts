import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-add-edit-student',
    templateUrl: './add-edit-student.component.html',
    styleUrls: ['./add-edit-student.component.css']
})
export class AddEditStudentComponent implements OnInit {

    schoolsList: any = [];
    selectSchoolId: any = null;
    classesList: any = [
        { name: 'Class I', value: '1' },
        { name: 'Class II', value: '2' },
        { name: 'Class III', value: '3' },
        { name: 'Class IV', value: '4' },
        { name: 'Class V', value: '5' },
        { name: 'Class VI', value: '6' },
        { name: 'Class VII', value: '7' },
        { name: 'Class VIII', value: '8' },
        { name: 'Class IX', value: '9' },
        { name: 'Class X', value: '10' }
    ];
    selectClassId: any = null;
    selectClassItem: any = {};
    studentData: any = {
        std_id: null, // PRIMARY KEY, AUTO INCREMENT
        // Personal Info
        schoolId: 1,
        classId: 1,
        admissionNum: '0001',
        studentId: 'STU001', // UNIQUE KEY
        fullName: 'test zero zero one',
        email: 'test001@gmail.com', // Optional
        gender: 'male',
        age: 12,
        dateOfBirth: '2000-01-10',
        // Family Info
        familyData: {
            fatherName: '',
            fatherOccupation: '',
            motherName: '',
            motherOccupation: '',
            siblings: [],
            primaryContact: '',
            secondaryContact: ''
        },
        // Address Info
        address: 'test address',
        city: 'test city',
        state: 'test state',
        country: 'india',
        zipcode: '000001',
        dateOfJoining: moment().format('YYYY-MM-DD'),
        status: 1 // 0-Not joined, 1-Joined, 2-Exit
    };
    formStep: any = 1;
    showOther: any = false;
    @ViewChild('studentForm', { static: false }) studentFormRef: NgForm;
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
            this.pageId = item && Object.keys(item).length > 0 ? Number(item['std_id']) : null;
        });
        if (this.pageId) {
            this.action = 'Update';
            this.getStudentData();
        }

        let id: any = 0;
        for (const item of this.classesList) {
            item['subjects'] = 7;
            this.schoolsList.push({
                school_id: id + 1,
                schoolName: `Test School ${id + 1}`,
                status: 1
            });
            id += 1;
        }
    }

    gotoForm(step?: any) {
        this.formStep = Number(step);
    }

    onSelectClass(value?: any) {
        console.log('Select class item value isss', value);
        const filterItem = _.filter(this.classesList, (ele: any) => {
            return ele.value == value;
        });
        console.log('Filtered item isss', filterItem);
        this.selectClassItem = filterItem && filterItem.length > 0 ? filterItem[0] : {};
    }

    getStudentData() {

    }

    saveData() {
        this.submitReq = 1;
        setTimeout(async() => {
            this.submitReq = 2;
        }, 2000);
    }

}
