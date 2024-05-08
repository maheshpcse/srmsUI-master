import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
import * as _ from 'underscore';
declare var $: any;

@Component({
    selector: 'app-bulk-upload-subject',
    templateUrl: './bulk-upload-subject.component.html',
    styleUrls: ['./bulk-upload-subject.component.css']
})
export class BulkUploadSubjectComponent implements OnInit {

    excelSpinner: any = false;
    excelFile: any = null;
    @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;
    formStep: any = 1;
    showOther: any = false;
    @ViewChild('subjectForm', { static: false }) subjectFormRef: NgForm;
    submitReq: any = 0;
    pageId: any = null;
    action: any = 'Add';
    schoolsList: any = [];
    selectSchoolId: any = null;

    rowsOnPage: any = 5;
    pageNumber: any = 1;
    count: any = 0;
    pager: any = {};
    totalPages: any = 0;
    searchQuery: any = '';
    statusFilter: any = 'all';
    showFilter: any = false;
    subjectsList: any = [];
    subjectsCount: any = 0;
    editSchoolItem: any = {};
    editClassItem: any = {};
    editSubjectItem: any = {};
    viewSubjects: any = false;
    selectUpload: any = 'valid';
    validSubjects: any = [];
    invalidSubjects: any = [];
    uploadReq: any = 0;
    deleteSchoolReq: any = 0;
    deleteClassReq: any = 0;
    deleteSubjectReq: any = 0;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public toastr: ToastrManager
    ) { }

    ngOnInit(): void {
        $(document).ready(function () {
            $(".files").attr('data-before', "Drag file here or click the above button");
        });

        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });

        let id: any = 0;
        for (const item of [0,1,2,3,4,5]) {
            this.schoolsList.push({
                school_id: id + 1,
                schoolName: `Test School ${id + 1}`,
                status: 1
            });
            id += 1;
        }

        // for (let i = 0; i <= 4; i += 1) {
        //     this.subjectsList.push({
        //         school_id: i + 1,
        //         schoolName: `Test School ${i}`,
        //         classes: [],
        //         status: i % 2 == 0 ? 1 : 0,
        //     });
        // }

        // const classes  = ['I', 'II', 'III', 'IV', 'V', 'VI'];
        // const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
        // const sectionNamesA = [];
        // const sectionNamesB = [];
        // for (let i = 0; i <= sections.length; i += 1) {
        //     if (i <= 1) {
        //         sectionNamesA.push({
        //             sectionId: i + 1,
        //             sectionName: `Section ${sections[i]}`,
        //             studentsCount: i % 2 == 0 ? 25 : 30,
        //             status: 1
        //         });
        //     }
        //     if (i <= 2) {
        //         sectionNamesB.push({
        //             sectionId: i + 1,
        //             sectionName: `Section ${sections[i]}`,
        //             studentsCount: i % 2 == 0 ? 30 : 35,
        //             status: 1
        //         });
        //     }
        // }
        // for (let i = 0; i <= 4; i += 1) {
        //     for (let j = 0; j <= 4; j += 1) {
        //         const newItem = {
        //             classId: j + 1,
        //             className: `Class ${classes[j]}`,
        //             // classSection: `Section ${sections[j]}`,
        //             sections: j % 2 == 0 ? sectionNamesA : sectionNamesB,
        //             sectionsCount: j % 2 == 0 ? sectionNamesA.length : sectionNamesB.length,
        //             studentsCount: j % 2 == 0 ? _.reduceRight(sectionNamesA, (a: any, b: any) => {
        //                 return Number(a) + Number(b.studentsCount)
        //             }, 0) : _.reduceRight(sectionNamesB, (a: any, b: any) => {
        //                 return Number(a) + Number(b.studentsCount)
        //             }, 0),
        //             subjectsCount: j % 2 == 0 ? 10 : 7,
        //             subjects: [],
        //             status: j % 2 == 0 ? 1 : 0,
        //         }
        //         this.subjectsList[i]['classes'].push(newItem);
        //         for (let k = 0; k <= 5; k += 1) {
        //             const newItem = {
        //                 subjectId: k + 1,
        //                 subjectName: `Subject ${k}`,
        //                 subjectType: k % 2 == 0 ? 'Language' : 'Subject',
        //                 status: k % 2 == 0 ? 1 : 0,
        //             }
        //             this.subjectsList[i]['classes'][j]['subjects'].push(newItem);
        //         }
        //     }
        // }

        for (let i = 0; i <= 4; i += 1) {
            const newSubject = {
                school_id: i + 1,
                schoolName: `Test School ${i}`,
                classes: [],
                status: i % 2 == 0 ? 1 : 0,
            }
            newSubject.classes = this.getSubjectsData(i);
            this.subjectsList.push(newSubject);
        }
        console.log('subjectsList isss', this.subjectsList);

        this.validSubjects = this.subjectsList;
        this.invalidSubjects = this.subjectsList;
    }

    getSubjectsData(id: any) {
        const subjectsList = [];
        const classes  = ['I', 'II', 'III', 'IV', 'V', 'VI'];
        const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
        const sectionNamesA = [];
        const sectionNamesB = [];
        for (let i = 0; i <= sections.length; i += 1) {
            if (i <= 1) {
                sectionNamesA.push({
                    sectionId: i + 1,
                    sectionName: `Section ${sections[i]}`,
                    studentsCount: (id + i) % 2 == 0 ? 25 : 30,
                    status: 1
                });
            }
            if (i <= 2) {
                sectionNamesB.push({
                    sectionId: i + 1,
                    sectionName: `Section ${sections[i]}`,
                    studentsCount: (id + i) % 2 == 0 ? 30 : 35,
                    status: 1
                });
            }
        }
        for (let i = 0; i <= 4; i += 1) {
            const newItem = {
                classId: i + 1,
                className: `Class ${classes[i]}`,
                // classSection: `Section ${sections[i]}`,
                sections: (id + i) % 2 == 0 ? sectionNamesA : sectionNamesB,
                sectionsCount: (id + i) % 2 == 0 ? sectionNamesA.length : sectionNamesB.length,
                studentsCount: (id + i) % 2 == 0 ? _.reduceRight(sectionNamesA, (a: any, b: any) => {
                    return Number(a) + Number(b.studentsCount)
                }, 0) : _.reduceRight(sectionNamesB, (a: any, b: any) => {
                    return Number(a) + Number(b.studentsCount)
                }, 0),
                subjectsCount: (id + i) % 2 == 0 ? 10 : 7,
                subjects: [],
                status: (id + i) % 2 == 0 ? 1 : 0,
            }
            subjectsList.push(newItem);
            for (let j = 0; j <= 4; j += 1) {
                const newItem = {
                    subjectId: j + 1,
                    subjectName: `Subject ${j}`,
                    subjectType: (id + j) % 2 == 0 ? 'Language' : 'Subject',
                    status: (id + j) % 2 == 0 ? 1 : 0,
                }
                subjectsList[i]['subjects'].push(newItem);
            }
        }
        return subjectsList;
    }

    handleFile(event?: any) {
        $(document).ready(function () {
            this.excelFile = event.target.files[0].name;
            $(".files").attr('data-before', this.excelFile);
        });
        console.log('excelFile isss', this.excelFile);
    }

    resetUpload() {
        $(document).ready(function () {
            $(".files").attr('data-before', "Drag file here or click the above button");
        });
        if (this.fileInputRef) {
            this.fileInputRef.nativeElement.value = '';
        }
        this.excelFile = null;
    }

    downloadExcelFile() {
        this.excelSpinner = true;
        setTimeout(async () => {
            this.excelSpinner = false;
        }, 2000);
    }

    openUploadModal() {
        $('#uploadReqModal').modal('show');
        this.action = 'upload';
        this.uploadReq = 0;
    }

    uploadExcelFile(step?: any) {
        this.uploadReq = 1;
        setTimeout(async() => {
            this.uploadReq = 2;
        }, 2000);
    }

    gotoForm(step?: any) {
        this.formStep = Number(step);
        this.viewSubjects = false;
        this.resetUpload();
    }

    onSearchSchool() {
        if (this.searchQuery) {
            this.getSchoolsList();
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
            this.getSchoolsList();
        }
    }

    resetFilter() {
        if (this.statusFilter !== 'all') {
            this.statusFilter = 'all';
            this.getSchoolsList();
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
            this.getSchoolsList();
        }
    }

    onSelectSchool(item?: any, type?: any) {
        console.log('Selected item isss', item);
        this.editSchoolItem = item;
        this.action = type;
        this.deleteSchoolReq = 0;
        $('#deleteSchoolReqModal').modal('show');
    }

    onSelectClass(data?: any, item?: any, type?: any) {
        console.log('Selected item isss', item);
        this.editSchoolItem = data;
        this.editClassItem = item;
        this.action = type;
        if (type == 'delete') {
            $('#deleteClassReqModal').modal('show');
            this.deleteClassReq = 0;
        } else if (type == 'subjects') {
            this.viewSubjects = true;
        } else if (type == 'sections') {
            $('#viewSectionsModal').modal('show');
        }
    }

    onSelectSubject(value?: any, data?: any, item?: any, type?: any) {
        console.log('Selected item isss', item);
        this.editSubjectItem = item;
        this.action = type;
        if (type == 'delete') {
            $('#deleteSubjectReqModal').modal('show');
            this.deleteSubjectReq = 0;
        }
    }

    // API's

    getSchoolsList() {

    }

    deleteSchoolData() {
        this.deleteSchoolReq = 1;
        setTimeout(async() => {
            this.deleteSchoolReq = 2;
        }, 2000);
    }

    deleteClassData() {
        this.deleteClassReq = 1;
        setTimeout(async() => {
            this.deleteClassReq = 2;
        }, 2000);
    }

    deleteSubjectData() {
        this.deleteSubjectReq = 1;
        setTimeout(async() => {
            this.deleteSubjectReq = 2;
        }, 2000);
    }

    saveData() {
        this.submitReq = 1;
        setTimeout(async () => {
            this.submitReq = 2;
            this.formStep = 1;
            this.resetUpload();
        }, 2000);
    }

}
