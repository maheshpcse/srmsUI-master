import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as _ from 'underscore';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-add-edit-student-result',
    templateUrl: './add-edit-student-result.component.html',
    styleUrls: ['./add-edit-student-result.component.css']
})
export class AddEditStudentResultComponent implements OnInit {

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
    selectSectionId: any = null;
    selectSectionItem: any = {};
    formStep: any = 1;
    showOther: any = false;
    @ViewChild('studentResultForm', { static: false }) studentResultFormRef: NgForm;
    submitReq: any = 0;
    pageId: any = null;
    action: any = 'Add';

    rowsOnPage: any = 5;
    pageNumber: any = 1;
    count: any = 0;
    pager: any = {};
    totalPages: any = 0;
    searchQuery: any = '';
    statusFilter: any = 'all';
    showFilter: any = false;
    studentsList: any = [];
    studentsCount: any = 0;
    subjectsList: any = [
        { name: 'Telugu', marks: 96, grade: 'A' },
        { name: 'Hindi', marks: 80, grade: 'B' },
        { name: 'English', marks: 75, grade: 'C' },
        { name: 'Mathe Matics', marks: 99, grade: 'A' },
        { name: 'Physics', marks: 95, grade: 'A' },
        { name: 'Biology', marks: 95, grade: 'A' },
        { name: 'Social Studies', marks: 97, grade: 'A' }
    ];
    editStudentItem: any = {};
    Marks: any = [];
    totalMarks: any = 0;

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
            this.getStudentResultData();
        }

        let id: any = 0;
        for (const item of this.classesList) {
            item['subjects'] = 7;
            this.schoolsList.push({
                school_id: id + 1,
                schoolName: `Test School ${id + 1}`,
                status: 1
            });
            if (id <= 4) {
                this.studentsList.push({
                    std_id: id + 1,
                    studentId: `STU00${id + 1}`,
                    fullName: `test ${id + 1}`,
                    studentName: `test ${id + 1}`,
                    status: id % 2 == 0 ? 1 : 0
                });
            }
            id += 1;
        }
        this.studentsCount = this.studentsList.length;

        for (const item of this.subjectsList) {
            this.Marks.push(item['marks']);
            this.totalMarks += item['marks'];
        }
    }

    gotoForm(step?: any) {
        this.formStep = Number(step);
    }

    onGetStudents() {
        this.getStudentsList();
    }

    onSelectClass(value?: any) {
        console.log('Select class item value isss', value);
        const filterItem = _.filter(this.classesList, (ele: any) => {
            return ele.value == value;
        });
        console.log('Filtered item isss', filterItem);
        this.selectClassItem = filterItem && filterItem.length > 0 ? filterItem[0] : {};
    }

    onSelectSectionType(value?: any) {
        console.log('Select section item value isss', value);
        const filterItem = _.filter(this.sectionTypesList, (ele: any) => {
            return ele.value == value;
        });
        console.log('Filtered item isss', filterItem);
        this.selectSectionItem = filterItem && filterItem.length > 0 ? filterItem[0] : {};
    }

    onSelectStudent(item?: any, type?: any) {
        console.log('Selected item isss', item);
        this.editStudentItem = item;
        this.action = type;
    }

    onSearchStudent() {
        if (this.searchQuery) {
            this.getStudentsList();
        }
    }

    openFilters() {
        this.showFilter = !this.showFilter;
        if (this.showFilter) {
            document.getElementById("mySidenav").style.width = "255px";
        } else {
            document.getElementById("mySidenav").style.width = "0";
        }
    }

    closeFilters() {
        document.getElementById("mySidenav").style.width = "0";
    }

    applyFilter() {
        if (this.statusFilter !== 'all') {
            this.statusFilter = Number(this.statusFilter);
            this.getStudentsList();
        }
    }

    resetFilter() {
        if (this.statusFilter !== 'all') {
            this.statusFilter = 'all';
            this.getStudentsList();
        }
    }

    resetSearchFilters() {
        if (this.searchQuery) {
            this.searchQuery = '';
            this.rowsOnPage = 5;
            this.pageNumber = 1;
            this.count = 0;
            this.totalPages = 0;
            this.pager = [];
            this.getStudentsList();
        }
    }

    getMarks(id?: any) {
        return this.Marks[id];
    }

    changeMarks(id?: any, event?: any) {
        this.Marks[id] = Number(event.target.value);
        this.totalMarks = _.reduceRight(this.Marks, (a: any, b: any) => {
            return Number(a) + Number(b);
        }, 0);
    }

    getStudentsList() {

    }

    getStudentResultData() {

    }

    saveData() {
        this.submitReq = 1;
        setTimeout(async() => {
            this.submitReq = 2;
        }, 2000);
    }

}
