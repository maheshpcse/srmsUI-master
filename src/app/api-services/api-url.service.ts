import { environment } from '../../environments/environment';

export const APIURL = {
	// check server connection
	CHECK_SERVER_CONNECTION: environment.apiUrl + '/server',

	// Admin authentication & authorization API URL's
	CHECK_VALIDATE_ADMIN_LOGIN: environment.apiUrl + '/check_validate_login',
	ADD_NEW_ADMIN_DATA: environment.apiUrl + '/add_new_admin_data',
	ADMIN_LOGIN: environment.apiUrl + '/admin_login',
	ADMIN_RESIGNIN: environment.apiUrl + '/admin_resignin',

	// School API URL's
	ADD_OR_UPDATE_SCHOOL_INFO: environment.apiUrl + '/add_or_update_school_info',
	BULK_UPLOAD_SCHOOL_INFO: environment.apiUrl + '/bulk_upload_school_info',
	GET_ALL_SCHOOLS_INFO: environment.apiUrl + '/get_all_schools_info'
}