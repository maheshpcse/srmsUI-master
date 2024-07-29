import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { NgOtpInputModule } from 'ng-otp-input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminSidemenuComponent } from './admin/admin-sidemenu/admin-sidemenu.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
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
import { UpdateProfileComponent } from './admin/profile/update-profile/update-profile.component';
import { ViewProfileComponent } from './admin/profile/view-profile/view-profile.component';
import { ChangePasswordComponent } from './admin/settings/change-password/change-password.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentLoginComponent } from './student/student-login/student-login.component';
import { StudentSignupComponent } from './student/student-signup/student-signup.component';
import { StudentHomeComponent } from './student/student-home/student-home.component';
import { AddEditSchoolComponent } from './admin/school/add-edit-school/add-edit-school.component';
import { ManageSchoolComponent } from './admin/school/manage-school/manage-school.component';
import { BulkUploadSchoolComponent } from './admin/school/bulk-upload-school/bulk-upload-school.component';
import { BulkUploadClassComponent } from './admin/class/bulk-upload-class/bulk-upload-class.component';
import { BulkUploadSubjectComponent } from './admin/subject/bulk-upload-subject/bulk-upload-subject.component';
import { BulkUploadStudentComponent } from './admin/student/bulk-upload-student/bulk-upload-student.component';
import { BulkUploadStudentResultComponent } from './admin/student-result/bulk-upload-student-result/bulk-upload-student-result.component';
import { EmployeeLoginComponent } from './employee/employee-login/employee-login.component';
import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';
import { AuthAdminService } from './api-services/auth-admin.service';
import { AuthEmployeeService } from './api-services/auth-employee.service';
import { AuthStudentService } from './api-services/auth-student.service';
import { AuthGuardService } from './api-services/auth-guard.service';
import { CommonService } from './api-services/common.service';
import { SharedService } from './api-services/shared.service';
import { AuthTokenInterceptorService } from './api-services/auth-token-interceptor.service';
import { SchoolService } from './api-services/school.service';
import { ClassService } from './api-services/class.service';
import { SubjectService } from './api-services/subject.service';
import { StudentService } from './api-services/student.service';
import { AdminProfileService } from './api-services/admin-profile.service';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        AdminSidemenuComponent,
        AdminHeaderComponent,
        AdminFooterComponent,
        AdminHomeComponent,
        AddEditClassComponent,
        ManageClassComponent,
        AddEditSubjectComponent,
        ManageSubjectComponent,
        AddEditStudentComponent,
        ManageStudentComponent,
        AddEditStudentResultComponent,
        ManageStudentResultComponent,
        AddEditNoticeComponent,
        ManageNoticeComponent,
        UpdateProfileComponent,
        ViewProfileComponent,
        ChangePasswordComponent,
        AdminLoginComponent,
        HeaderComponent,
        FooterComponent,
        StudentLoginComponent,
        StudentSignupComponent,
        StudentHomeComponent,
        AddEditSchoolComponent,
        ManageSchoolComponent,
        BulkUploadSchoolComponent,
        BulkUploadClassComponent,
        BulkUploadSubjectComponent,
        BulkUploadStudentComponent,
        BulkUploadStudentResultComponent,
        EmployeeLoginComponent,
        EmployeeHomeComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
        ToastrModule.forRoot(),
        AngularMultiSelectModule,
        NgMultiSelectDropDownModule.forRoot(),
        // NgOtpInputModule,
        // MatFormFieldModule,
        // MatInputModule,
        // MatSelectModule,
        // MatTooltipModule
    ],
    // exports: [
    //     MatFormFieldModule,
    //     MatInputModule,
    //     MatSelectModule,
    //     MatTooltipModule
    // ],
    providers: [
        CookieService,
        AuthAdminService,
        AuthEmployeeService,
        AuthStudentService,
        AuthGuardService,
        CommonService,
        SharedService,
        SchoolService,
        ClassService,
        SubjectService,
        StudentService,
        AdminProfileService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptorService, multi: true }
    ],
    bootstrap: [AppComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
