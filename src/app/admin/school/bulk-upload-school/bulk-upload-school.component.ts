import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
declare var $: any;

@Component({
    selector: 'app-bulk-upload-school',
    templateUrl: './bulk-upload-school.component.html',
    styleUrls: ['./bulk-upload-school.component.css']
})
export class BulkUploadSchoolComponent implements OnInit {

    excelSpinner: any = false;
    excelFile: any = null;
    @ViewChild('fileInput', { static: false }) fileInputRef: ElementRef;
    formStep: any = 1;
    showOther: any = false;
    @ViewChild('schoolForm', { static: false }) schoolFormRef: NgForm;
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
    schoolsList: any = [];
    schoolCount: any = 0;
    editSchoolItem: any = {};
    selectUpload: any = 'valid';
    validSchools: any = [];
    invalidSchools: any = [];
    uploadReq: any = 0;
    deleteReq: any = 0;

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

        for (let i = 1; i <= 5; i += 1) {
            const newItem = {
                school_id: i,
                schoolName: `Test Name ${i}`,
                schoolAddress: `Test Address ${i}`,
                status: 1,
            }
            this.schoolsList.push(newItem);
        }
        this.validSchools = this.schoolsList;
        this.invalidSchools = this.schoolsList;
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
        this.deleteReq = 0;
        $('#deleteReqModal').modal('show');
    }

    getSchoolsList() {

    }

    deleteData() {
        this.deleteReq = 1;
        setTimeout(async() => {
            this.deleteReq = 2;
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
