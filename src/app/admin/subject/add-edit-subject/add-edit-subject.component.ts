import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-add-edit-subject',
    templateUrl: './add-edit-subject.component.html',
    styleUrls: ['./add-edit-subject.component.css']
})
export class AddEditSubjectComponent implements OnInit {

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
    subjectsCount: any = null;
    subjectGroup: FormGroup;
    subjectName: any = null;
    subjectType: any = null;
    @ViewChild('subjectForm', { static: false }) subjectFormRef: NgForm;
    submitReq: any = 0;
    pageId: any = null;
    action: any = 'Add';

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public toastr: ToastrManager
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((item?: any) => {
            console.log('Get param item isss', item);
            this.pageId = item && Object.keys(item).length > 0 ? Number(item['subjectId']) : null;
        });
        if (this.pageId) {
            this.action = 'Update';
            this.getSubjectData();
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

        this.subjectGroup = this.formBuilder.group({
            subjects: new FormArray([])
        });
    }

    initForm() {
        return this.formBuilder.group({
            subjectName: new FormControl(null, Validators.required),
            subjectType: new FormControl(null, Validators.required),
        });
    }

    addInput(id?: any) {
        if (id + 1 <= Number(this.subjectsCount) - 1) {
            const control: any = this.subjectGroup.controls['subjects'] as FormArray;
            control.push(this.initForm());
        } else {
            this.toastr.errorToastr('Subjects limit reached.');
        }
    }

    removeInput(i: any) {
        const control = this.subjectGroup.controls['subjects'] as FormArray;
        control.removeAt(i);
    }

    onSelectClass(value?: any) {
        console.log('Select class item value isss', value);
        this.subjectGroup.reset();
        this.subjectGroup = this.formBuilder.group({
            subjects: new FormArray([])
        });
        const filterItem = _.filter(this.classesList, (ele: any) => {
            return ele.value == value;
        });
        console.log('Filtered item isss', filterItem);
        this.selectClassItem = filterItem && filterItem.length > 0 ? filterItem[0] : {};
        this.subjectsCount = filterItem && filterItem.length > 0 ? filterItem[0]['subjects'] : null;
        this.addInput(0);
    }

    getSubjectData() {

    }

    saveData() {
        this.submitReq = 1;
        setTimeout(async () => {
            this.submitReq = 2;
        }, 2000);
    }

}
