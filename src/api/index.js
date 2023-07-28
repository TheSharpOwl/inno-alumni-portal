import notify from "../utils/notify";
import sendRequest from "./sendRequest";
const BASE_USER_PATH = "/api/v1/user";

export const loginRegularUser = async ({ email, password }) => {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);
  // { 'username': email, 'password': password };
  const options = {
    headers: {
      accept: "application/json",
      "Remove-Content-Type": true
    },
    body: formData
  };
  try {
    const userToken = await sendRequest(`${BASE_USER_PATH}/login`, options);
    notify({ notificationMessage: "Login Successfull" });
    return userToken;
  } catch (err) {
    notify(err);
  }
};

export const registerRegularUser = async (
  { name, email, password, confirmPassword },
  options = {}
) => {
  try {
    const registrationFeedback = await sendRequest(
      `${BASE_USER_PATH}/register`,
      {
        ...options,
        body: JSON.stringify({
          name,
          email,
          password,
          confirm_password: confirmPassword
        })
      }
    );
    notify({ notificationMessage: "Registration Successfull" });
    return registrationFeedback;
  } catch (err) {
    notify(err);
  }
};

export const registerAdminUser = async ({ name, email, password }) => {
  try {
    const registrationFeedback = await sendRequest(
      `${BASE_USER_PATH}/register-admin`,
      {
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    );
    notify({ notificationMessage: "Admin User Registration Successful" });
    return registrationFeedback;
  } catch (err) {
    notify(err);
  }
};

export const updateUserInformation = async (updateInformation) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const updateFeedback = await sendRequest(`${BASE_USER_PATH}/update`, {
      headers: {
        Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify(updateInformation)
    });
    notify({
      notificationMessage: "User profile information updated Successfully"
    });
    return updateFeedback;
  } catch (err) {
    notify(err);
  }
};

export const updatePasswordInformation = async (passwordInformation) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const updateFeedback = await sendRequest(
      `${BASE_USER_PATH}/update-password`,
      {
        headers: {
          Authorization: "Bearer " + accessToken
        },
        body: JSON.stringify(passwordInformation)
      }
    );
    notify({ notificationMessage: "User password updated Successfully" });
    return updateFeedback;
  } catch (err) {
    notify(err);
  }
};

export const loginWithInnoSSO = async (options = {}) => {
  const redirectURL = await sendRequest(`${BASE_USER_PATH}/login_sso`, {
    method: "GET",
    ...options
  });
  notify({ notificationMessage: "Login with sso Successfull" });
  return redirectURL;
};

export const getCurrentUser = async ({ accessToken }) => {
  try {
    const userInfo = await sendRequest(`${BASE_USER_PATH}/`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return userInfo;
  } catch (err) {
    notify(err);
  }
};

export const getAllRegisteredUsers = async () => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const usersInfo = await sendRequest(`${BASE_USER_PATH}/all`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
    return usersInfo;
  } catch (err) {
    notify(err);
  }
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

/**************************************************************************************/
/****************                START PASS REQUEST               *********************/
/**************************************************************************************/

const BASE_PASS_PATH = "/api/v1/request_pass";
export const createPassRequest = async ({ request }, options = {}) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const response = await sendRequest(`${BASE_PASS_PATH}/`, {
      headers: {
        Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify(request)
    });
    notify({ notificationMessage: "Pass Request Creation Successfull" });
    return response;
  } catch (err) {
    notify(err);
  }
};

export const getPassRequestHistory = async () => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  const passRequests = await sendRequest(`${BASE_PASS_PATH}/`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  return passRequests;
};

export const deletePassRequest = async ({ passRequestId }) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const response = await sendRequest(
      `${BASE_PASS_PATH}/?pass_request_id=${passRequestId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }
    );
    notify({
      notificationMessage: "Request for pass was Successfully deleted"
    });
    return response;
  } catch (err) {
    notify(err);
  }
};

export const getAllPassRequestAdmin = async () => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  const passes = await sendRequest(`${BASE_PASS_PATH}/admin`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  return passes;
};

export const updatePassRequest = async ({ requestId, data }) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const request = await sendRequest(
      `${BASE_PASS_PATH}/?request_id=${requestId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + accessToken
        },
        body: JSON.stringify(data)
      }
    );
    notify({ notificationMessage: "Request status updated Successfully" });
    return request;
  } catch (err) {
    notify(err);
  }
};

/**************************************************************************************/
/****************            START ELECTIVE REQUEST               *********************/
/**************************************************************************************/

const BASE_ELECTIVE_PATH = "/api/v1/elective_course";
export const getAllElectiveCourses = async () => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  const electives = await sendRequest(`${BASE_ELECTIVE_PATH}/`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  return electives;
};

export const getAllElectiveCoursesAdmin = async () => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  const electives = await sendRequest(`${BASE_ELECTIVE_PATH}/admin`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  return electives;
};

export const getBookedElectiveCourses = async () => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  const electives = await sendRequest(`${BASE_ELECTIVE_PATH}/booked`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  return electives;
};

export const getAllElectiveRequests = async () => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  const electives = await sendRequest(`${BASE_ELECTIVE_PATH}/request`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  return electives;
};

export const updateElectiveCourse = async ({ courseId, data }) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const elective = await sendRequest(
      `${BASE_ELECTIVE_PATH}/?course_id=${courseId}`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + accessToken
        },
        body: JSON.stringify(data)
      }
    );
    notify({ notificationMessage: "Course updated Successfully" });
    return elective;
  } catch (err) {
    notify(err);
  }
};

export const updateElectiveCourseRequest = async ({ requestId, data }) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const elective = await sendRequest(
      `${BASE_ELECTIVE_PATH}/?request_id=${requestId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + accessToken
        },
        body: JSON.stringify(data)
      }
    );
    notify({ notificationMessage: "Request status updated Successfully" });
    return elective;
  } catch (err) {
    notify(err);
  }
};

export const createElectiveCourse = async ({ data }) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const elective = await sendRequest(`${BASE_ELECTIVE_PATH}/`, {
      headers: {
        Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify(data)
    });
    notify({ notificationMessage: "Course created Successfully" });
    return elective;
  } catch (err) {
    notify(err);
  }
};

export const bulkUploadElective = async ({ data }) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const elective = await sendRequest(`${BASE_ELECTIVE_PATH}/bulk`, {
      headers: {
        Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify(data)
    });
    notify({ notificationMessage: "New courses uploaded Successfully" });
    return elective;
  } catch (err) {
    notify(err);
  }
};

export const deleteElectiveCourse = async ({ courseId }) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const response = await sendRequest(
      `${BASE_ELECTIVE_PATH}/remove?course_id=${courseId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }
    );
    notify({ notificationMessage: "Course Successfully deleted" });
    return response;
  } catch (err) {
    notify(err);
  }
};

// http://127.0.0.1:9001/api/v1/elective_course/request?course_id=dadfasdf
export const makeElectiveRequest = async ({ courseId }) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const response = await sendRequest(
      `${BASE_ELECTIVE_PATH}/request?course_id=${courseId}`,
      {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }
    );
    notify({
      notificationMessage:
        "Request for elective was Successfull and is in progress"
    });
    return response;
  } catch (err) {
    notify(err);
  }
};

export const deleteElectiveRequest = async ({ courseRequestId }) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const response = await sendRequest(
      `${BASE_ELECTIVE_PATH}/?course_request_id=${courseRequestId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }
    );
    notify({
      notificationMessage: "Request for elective was Successfully deleted"
    });
    return response;
  } catch (err) {
    notify(err);
  }
};

/**************************************************************************************/
/****************              END ELECTIVE REQUEST               *********************/
/**************************************************************************************/

const BASE_DONATION_PATH = "/api/v1/donation";
export const getAdminDonationText = async () => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  const message = await sendRequest(`${BASE_DONATION_PATH}/admin`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  return message;
};

export const getAllAlumniDonations = async () => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  const message = await sendRequest(`${BASE_DONATION_PATH}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken
    }
  });
  return message;
};

export const upsertAdminDonationText = async ({ donation }) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const response = await sendRequest(`${BASE_DONATION_PATH}/admin`, {
      headers: {
        Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify(donation)
    });
    notify({ notificationMessage: "Donation Request Updated Successful" });
    return response;
  } catch (err) {
    notify(err);
  }
};

export const makeDonationText = async ({ donation }) => {
  const accessToken = window.sessionStorage.getItem("alumniToken") || "";
  try {
    const response = await sendRequest(`${BASE_DONATION_PATH}/`, {
      headers: {
        Authorization: "Bearer " + accessToken
      },
      body: JSON.stringify(donation)
    });
    notify({ notificationMessage: "Donation Interest Sent Successful" });
    return response;
  } catch (err) {
    notify(err);
  }
};
