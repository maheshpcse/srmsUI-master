import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
import * as moment from 'moment';
declare var $: any;

interface Food {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-add-edit-class',
    templateUrl: './add-edit-class.component.html',
    styleUrls: ['./add-edit-class.component.css']
})
export class AddEditClassComponent implements OnInit {

    selectSchoolId: any = null;
    schoolsList: any = [];
    dropdownList = [];
    selectedClassItems = [];
    classListSettings = {};
    classNamesList: any = [
        { name: 'Class I', value: '1' },
        { name: 'Class II', value: '2' },
        { name: 'Class III', value: '3' },
        { name: 'Class IV', value: '4' },
        { name: 'Class V', value: '5' },
        { name: 'Class VI', value: '6' },
        { name: 'Class VII', value: '7' },
        { name: 'Class VIII', value: '8' },
        { name: 'Class IX', value: '9' },
        { name: 'Class X', value: '10' },
        // { name: 'Other', value: 'other' },
    ];
    selectedSectionItems = [];
    sectionListSettings = {};
    sectionTypesList: any = [
        { name: 'Section A', value: 'a' },
        { name: 'Section B', value: 'b' },
        { name: 'Section C', value: 'c' },
        { name: 'Section D', value: 'd' },
        { name: 'Section E', value: 'e' },
        { name: 'Section F', value: 'f' },
        { name: 'Section G', value: 'g' },
        { name: 'Section H', value: 'h' },
    ];
    showOther: any = false;
    className: any = null;
    sectionName: any = null;
    sectionGroup: FormGroup;
    @ViewChild('classForm', { static: false }) classFormRef: NgForm;
    submitReq: any = 0;
    pageId: any = null;
    action: any = 'Add';

    textMsg: any = '';
    foodName: any = 'steak-0';
    foods: Food[] = [
        { value: 'steak-0', viewValue: 'Steak' },
        { value: 'pizza-1', viewValue: 'Pizza' },
        { value: 'tacos-2', viewValue: 'Tacos' }
    ];

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public toastr: ToastrManager
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((item?: any) => {
            console.log('Get param item isss', item);
            this.pageId = item && Object.keys(item).length > 0 ? Number(item['classId']) : null;
        });
        if (this.pageId) {
            this.action = 'Update';
            this.getClassData();
        }

        this.classListSettings = {
            singleSelection: false,
            text: "Select Classes",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: "myclass custom-class",
            badgeShowLimit: 2,
            noDataLabel: 'No Data Available'
        };

        this.sectionListSettings = {
            singleSelection: false,
            text: "Select Sections",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: "myclass custom-class",
            badgeShowLimit: 2,
            noDataLabel: 'No Data Available'
        };

        let id: any = 0;
        for (const item of this.classNamesList) {
            item['id'] = id + 1;
            item['itemName'] = item['name'];
            this.schoolsList.push({
                school_id: id + 1,
                schoolName: `Test School ${id + 1}`,
                status: 1
            });
            id += 1;
        }

        let idx: any = 0;
        for (const item of this.sectionTypesList) {
            item['id'] = idx + 1;
            item['itemName'] = item['name'];
            idx += 1;
        }

        this.sectionGroup = this.formBuilder.group({
            sections: new FormArray([])
        });
    }

    onMouseEvent() {
        this.textMsg = this.foodName;
    }

    initForm(itemName: any = '') {
        return this.formBuilder.group({
            className: new FormControl({ value: itemName, disabled: true }),
            // sectionName: new FormControl(null, Validators.required),
            sectionName: new FormArray([], Validators.required),
            totalSubjects: new FormControl(null, Validators.required),
        });
    }

    addInput(value?: any) {
        const control: any = this.sectionGroup.controls['sections'] as FormArray;
        control.push(this.initForm(value));
    }

    removeInput(i: any) {
        const control = this.sectionGroup.controls['sections'] as FormArray;
        control.removeAt(i);
    }

    // class events
    onClassItemSelect(item: any) {
        console.log(item);
        console.log(this.selectedClassItems);
        _.sortBy(this.selectedClassItems, 'id');
        this.addInput(item['itemName']);
    }

    OnClassItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedClassItems);
        _.sortBy(this.selectedClassItems, 'id');
        if (this.selectedClassItems.length === 0) {
            this.sectionGroup.reset();
            this.sectionGroup = this.formBuilder.group({
                sections: new FormArray([])
            });
        }
        this.removeInput(Number(item['id']) - 1);
    }

    onClassSelectAll(items: any) {
        console.log(items);
        _.sortBy(this.selectedClassItems, 'id');
        this.sectionGroup = this.formBuilder.group({
            sections: new FormArray([])
        });
        for (let data of this.selectedClassItems) {
            this.addInput(data['itemName']);
        }
    }

    onClassDeSelectAll(items: any) {
        console.log(items);
        this.selectedClassItems = _.sortBy(this.selectedClassItems, 'id');
        this.sectionGroup = this.formBuilder.group({
            sections: new FormArray([])
        });
        this.sectionGroup.reset();
    }

    // section events
    onSectionItemSelect(item: any) {

    }
    
    onSectionItemDeSelect(item: any) {

    }

    onSectionItemSelectAll(items: any) {

    }

    onSectionItemDeSelectAll(items: any) {

    }

    getClassData() {

    }

    saveData() {
        console.log(this.sectionGroup.controls['sections'] as FormArray);
        this.submitReq = 1;
        setTimeout(async () => {
            this.submitReq = 2;
        }, 2000);
    }

}
