import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment';
import * as _ from 'underscore';
declare var $: any;

@Component({
    selector: 'app-manage-class',
    templateUrl: './manage-class.component.html',
    styleUrls: ['./manage-class.component.css']
})
export class ManageClassComponent implements OnInit {

    rowsOnPage: any = 5;
    pageNumber: any = 1;
    count: any = 0;
    pager: any = {};
    totalPages: any = 0;
    searchQuery: any = '';
    statusFilter: any = 'all';
    showFilter: any = false;
    viewSchoolDetails: any = false;
    viewClassDetails: any = false;
    classesList: any = [];
    classesCount: any = 0;
    editSchoolItem: any = {};
    editClassItem: any = {};
    updateSchoolReq: any = 0;
    updateClassReq: any = 0;
    action: any = '';

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public toastr: ToastrManager
    ) { }

    ngOnInit(): void {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });

        // for (let i = 0; i <= 4; i += 1) {
        //     this.classesList.push({
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
        //             status: j % 2 == 0 ? 1 : 0,
        //         }
        //         this.classesList[i]['classes'].push(newItem);
        //     }
        // }

        for (let i = 0; i <= 4; i += 1) {
            const newClass = {
                school_id: i + 1,
                schoolName: `Test School ${i}`,
                classes: [],
                status: i % 2 == 0 ? 1 : 0,
            }
            newClass.classes = this.getClassesData(i);
            this.classesList.push(newClass);
        }
        console.log('classesList isss', this.classesList);
    }

    getClassesData(id: any) {
        const classesList = [];
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
                status: (id + i) % 2 == 0 ? 1 : 0,
            }
            classesList.push(newItem);
        }
        return classesList;
    }

    addNewClass() {
        this.router.navigate(['/admin/class/add-edit-class']);
    }

    openSchoolViewDetails() {
        this.viewSchoolDetails = !this.viewSchoolDetails;
        if (this.viewSchoolDetails) {
            document.getElementById("mySidenav_school_view").style.width = "550px";
        } else {
            document.getElementById("mySidenav_school_view").style.width = "0";
        }
    }

    closeSchoolViewDetails() {
        document.getElementById("mySidenav_school_view").style.width = "0";
    }

    openClassViewDetails() {
        this.viewClassDetails = !this.viewClassDetails;
        if (this.viewClassDetails) {
            document.getElementById("mySidenav_class_view").style.width = "450px";
        } else {
            document.getElementById("mySidenav_class_view").style.width = "0";
        }
    }

    closeClassViewDetails() {
        document.getElementById("mySidenav_class_view").style.width = "0";
    }

    onSearchClass() {
        if (this.searchQuery) {
            this.getClassesList();
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
            this.getClassesList();
        }
    }

    resetFilter() {
        if (this.statusFilter !== 'all') {
            this.statusFilter = 'all';
            this.getClassesList();
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
            this.getClassesList();
        }
    }

    onSelectSchool(item?: any, type?: any) {
        console.log('Selected item isss', item);
        this.editSchoolItem = item;
        this.action = type;
        if (type === 'update') {
            this.router.navigate(['/admin/class/add-edit-class'], { queryParams: { school_id: Number(item['school_id']) }});
        } else if (type === 'deactivate' || type === 'reactivate') {
            $('#updateSchoolReqModal').modal('show');
            this.updateClassReq = 0;
        } else if (type === 'view') {
            this.openSchoolViewDetails();
        }
    }

    onSelectClass(data?: any, item?: any, type?: any) {
        console.log('Selected item isss', item);
        this.editClassItem = item;
        this.action = type;
        if (type === 'update') {
            this.router.navigate(['/admin/class/add-edit-class'], { queryParams: { school_id: Number(data['school_id']), classId: Number(item['classId']) }});
        } else if (type === 'deactivate' || type === 'reactivate') {
            $('#updateClassReqModal').modal('show');
            this.updateClassReq = 0;
        } else if (type === 'view') {
            this.openClassViewDetails();
        } else if (type == 'sections') {
            $('#viewSectionsModal').modal('show');
        }
    }

    // API Services

    getClassesList() {

    }

    updateSchoolData() {
        this.updateSchoolReq = 1;
        setTimeout(async() => {
            this.updateSchoolReq = 2;
        }, 2000);
    }

    updateClassData() {
        this.updateClassReq = 1;
        setTimeout(async() => {
            this.updateClassReq = 2;
        }, 2000);
    }

}
