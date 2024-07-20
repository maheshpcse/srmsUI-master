import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddEditClassComponent } from './admin/class/add-edit-class/add-edit-class.component';
import { ManageClassComponent } from './admin/class/manage-class/manage-class.component';
import { AddEditSubjectComponent } from './admin/subject/add-edit-subject/add-edit-subject.component';
import { ManageSubjectComponent } from './admin/subject/manage-subject/manage-subject.component';
import { AddEditStudentComponent } from './admin/student/add-edit-student/add-edit-student.component';
import { ManageStudentComponent } from './admin/student/manage-student/manage-student.component';
import { AddEditStudentResultComponent } from './admin/student-result/add-edit-student-result/add-edit-student-result.component';
import { ManageStudentResultComponent } from './admin/student-result/manage-student-result/manage-student-result.component';
import { AddEditNoticeComponent } from './admin/notice/add-edit-notice/add-edit-notice.component';
import { ManageNoticeComponent } from './admin/notice/manage-notice/manage-notice.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { StudentLoginComponent } from './student/student-login/student-login.component';
import { StudentSignupComponent } from './student/student-signup/student-signup.component';
import { AddEditSchoolComponent } from './admin/school/add-edit-school/add-edit-school.component';
import { ManageSchoolComponent } from './admin/school/manage-school/manage-school.component';
import { BulkUploadSchoolComponent } from './admin/school/bulk-upload-school/bulk-upload-school.component';
import { BulkUploadClassComponent } from './admin/class/bulk-upload-class/bulk-upload-class.component';
import { ViewProfileComponent } from './admin/profile/view-profile/view-profile.component';
import { BulkUploadSubjectComponent } from './admin/subject/bulk-upload-subject/bulk-upload-subject.component';
import { BulkUploadStudentComponent } from './admin/student/bulk-upload-student/bulk-upload-student.component';
import { ChangePasswordComponent } from './admin/settings/change-password/change-password.component';
import { BulkUploadStudentResultComponent } from './admin/student-result/bulk-upload-student-result/bulk-upload-student-result.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './api-services/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'login',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePageComponent,
    },
    {
        path: 'student/login',
        component: StudentLoginComponent
    },
    {
        path: 'student/signup',
        component: StudentSignupComponent
    },
    {
        path: 'employee/login',
        component: EmployeeLoginComponent
    },
    {
        path: 'admin/login',
        component: AdminLoginComponent
    },
    
    // **************** Admin routes *************************
    {
        path: 'admin/home',
        // canActivate: [AuthGuardService],
        component: AdminHomeComponent
    },

    // School routes
    {
        path: 'admin/school/add-edit-school',
        // canActivate: [AuthGuardService],
        component: AddEditSchoolComponent
    },
    {
        path: 'admin/school/bulk-upload-school',
        // canActivate: [AuthGuardService],
        component: BulkUploadSchoolComponent
    },
    {
        path: 'admin/school/manage-school',
        // canActivate: [AuthGuardService],
        component: ManageSchoolComponent
    },

    // Class routes
    {
        path: 'admin/class/add-edit-class',
        // canActivate: [AuthGuardService],
        component: AddEditClassComponent
    },
    {
        path: 'admin/class/bulk-upload-class',
        // canActivate: [AuthGuardService],
        component: BulkUploadClassComponent
    },
    {
        path: 'admin/class/manage-class',
        // canActivate: [AuthGuardService],
        component: ManageClassComponent
    },

    // Subject routes
    {
        path: 'admin/subject/add-edit-subject',
        // canActivate: [AuthGuardService],
        component: AddEditSubjectComponent
    },
    {
        path: 'admin/subject/bulk-upload-subject',
        // canActivate: [AuthGuardService],
        component: BulkUploadSubjectComponent
    },
    {
        path: 'admin/subject/manage-subject',
        // canActivate: [AuthGuardService],
        component: ManageSubjectComponent
    },

    // Student routes
    {
        path: 'admin/student/add-edit-student',
        // canActivate: [AuthGuardService],
        component: AddEditStudentComponent
    },
    {
        path: 'admin/student/bulk-upload-student',
        // canActivate: [AuthGuardService],
        component: BulkUploadStudentComponent
    },
    {
        path: 'admin/student/manage-student',
        // canActivate: [AuthGuardService],
        component: ManageStudentComponent
    },

    // Student Result routes
    {
        path: 'admin/student-result/add-edit-student-result',
        // canActivate: [AuthGuardService],
        component: AddEditStudentResultComponent
    },
    {
        path: 'admin/student-result/bulk-upload-student-result',
        // canActivate: [AuthGuardService],
        component: BulkUploadStudentResultComponent
    },
    {
        path: 'admin/student-result/manage-student-result',
        // canActivate: [AuthGuardService],
        component: ManageStudentResultComponent
    },

    // Notice routes
    {
        path: 'admin/notice/add-edit-notice',
        // canActivate: [AuthGuardService],
        component: AddEditNoticeComponent
    },
    {
        path: 'admin/notice/manage-notice',
        // canActivate: [AuthGuardService],
        component: ManageNoticeComponent
    },

    // Admin Profile routes
    {
        path: 'admin/profile/view-profile',
        // canActivate: [AuthGuardService],
        component: ViewProfileComponent
    },
    {
        path: 'admin/profile/update-profile',
        // canActivate: [AuthGuardService],
        component: ViewProfileComponent
    },

    // Admin Settings routes
    {
        path: 'admin/settings/change-password',
        // canActivate: [AuthGuardService],
        component: ChangePasswordComponent
    },

    // **************** Employee routes *************************
    {
        path: 'employee/home',
        // canActivate: [AuthGuardService],
        component: EmployeeHomeComponent
    },

    // **************** Student routes **************************

    {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
