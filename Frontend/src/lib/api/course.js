import sendRequest from './sendRequest';

const BASE_PATH = '/courses';

export const getAllCourseApiMethod = async () => {
    const courses = await sendRequest(`${BASE_PATH}/books`, { method: 'GET' });
    return courses;
};