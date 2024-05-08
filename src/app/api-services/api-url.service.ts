import { environment } from '../../environments/environment';

export const APIURL = {
	// check server connection
	CHECK_SERVER_CONNECTION: environment.apiUrl + '/server',

	// Admin authentication & authorization API URL's
	CHECK_VALIDATE_ADMIN_LOGIN: environment.apiUrl + '/check_validate_login',
	ADD_NEW_ADMIN_DATA: environment.apiUrl + '/add_new_admin_data',
	ADMIN_LOGIN: environment.apiUrl + '/admin_login',
	ADMIN_RESIGNIN: environment.apiUrl + '/admin_resignin',
}