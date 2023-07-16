import sendRequest from './sendRequest';
const BASE_USER_PATH = '/api/v1/user';

export const loginRegularUser = async ({ email, password }) => {

    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)
    // { 'username': email, 'password': password };
    const options = {
        headers: {
            "accept": "application/json",
            'Remove-Content-Type': true,
        },
        body: formData
    }
    const userToken = await sendRequest(
        `${BASE_USER_PATH}/login`,
        options,
    );
    return userToken;
};


export const registerRegularUser = async ({ name, email, password, confirmPassword }, options = {}) => {
    const registrationFeedback = await sendRequest(
        `${BASE_USER_PATH}/register`,
        {
            ...options,
            body: JSON.stringify({
                name, email, password,
                confirm_password: confirmPassword
            })
        },
    );
    return registrationFeedback;
};


export const loginWithInnoSSO = async (options = {}) => {
    const redirectURL = await sendRequest(
        `${BASE_USER_PATH}/login_sso`,
        { method: 'GET', ...options },
    );
    return redirectURL;
};

export const getCurrentUser = async ({ accessToken }) => {
    const userInfo = await sendRequest(
        `${BASE_USER_PATH}/`,
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        },
    );
    return userInfo;
};

/*
{
  "requested_date": "2023-07-14",
  "guests": [
    "string"
  ],
  "description": "string"
}
*/
const BASE_PASS_PATH = '/api/v1/request_pass';
export const createPassRequest = async ({ request }, options = {}) => {
    const accessToken = window.sessionStorage.getItem('alumniToken') || ""
    const response = await sendRequest(
        `${BASE_PASS_PATH}/`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify(request)
        },
    );
    return response;
};

export const getPassRequestHistory = async () => {
    const accessToken = window.sessionStorage.getItem('alumniToken') || ""
    const passRequests = await sendRequest(
        `${BASE_PASS_PATH}/`,
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        },
    );
    return passRequests;
};


const BASE_ELECTIVE_PATH = '/api/v1/elective_course';
export const getAllElectiveCourses = async () => {
    const accessToken = window.sessionStorage.getItem('alumniToken') || ""
    const electives = await sendRequest(
        `${BASE_ELECTIVE_PATH}/`,
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        },
    );
    return electives;
};

export const getBookedElectiveCourses = async () => {
    const accessToken = window.sessionStorage.getItem('alumniToken') || ""
    const electives = await sendRequest(
        `${BASE_ELECTIVE_PATH}/booked`,
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        },
    );
    return electives;
};

// http://127.0.0.1:9001/api/v1/elective_course/request?course_id=dadfasdf
export const makeElectiveRequest = async ({ courseId }) => {
    const accessToken = window.sessionStorage.getItem('alumniToken') || ""
    const response = await sendRequest(
        `${BASE_ELECTIVE_PATH}/request?course_id=${courseId}`,
        {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        },
    );
    return response;
};