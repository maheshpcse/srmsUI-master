import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $: any;


@Component({
    selector: 'app-manage-school',
    templateUrl: './manage-school.component.html',
    styleUrls: ['./manage-school.component.css']
})
export class ManageSchoolComponent implements OnInit {

    rowsOnPage: any = 5;
    pageNumber: any = 1;
    count: any = 0;
    pager: any = {};
    totalPages: any = 0;
    searchQuery: any = '';
    statusFilter: any = 'all';
    viewDetails: any = false;
    showFilter: any = false;
    schoolList: any = [];
    schoolCount: any = 0;
    editSchoolItem: any = {};
    updateReq: any = 0;
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

        for (let i = 1; i <= 5; i += 1) {
            const newItem = {
                school_id: i,
                schoolName: `Test Name ${i}`,
                schoolAddress: `Test Address ${i}`,
                status: i % 2 == 0 ? 1 : 0,
            }
            this.schoolList.push(newItem);
        }
    }

    addNewSchool() {
        this.router.navigate(['/admin/school/add-edit-school']);
    }

    openViewDetails() {
        this.viewDetails = !this.viewDetails;
        if (this.viewDetails) {
            document.getElementById("mySidenav_view").style.width = "400px";
        } else {
            document.getElementById("mySidenav_view").style.width = "0";
        }
    }

    closeViewDetails() {
        document.getElementById("mySidenav_view").style.width = "0";
    }

    onSearchSchool() {
        if (this.searchQuery) {
            this.getSchoolsList();
        }
    }

    openFilters() {
        this.showFilter = !this.showFilter;
        if (this.showFilter) {
            document.getElementById("mySidenav").style.width = "275px";
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
        if (type === 'update') {
            this.router.navigate(['/admin/school/add-edit-school'], { queryParams: { school_id: Number(item['school_id']) }});
        } else if (type === 'deactivate' || type === 'reactivate') {
            $('#updateReqModal').modal('show');
            this.updateReq = 0;
        } else if (type === 'view') {
            this.openViewDetails();
        }
    }

    getSchoolsList() {

    }

    updateData() {
        this.updateReq = 1;
        setTimeout(async() => {
            this.updateReq = 2;
        }, 2000);
    }

}
