import 'isomorphic-unfetch';

let { PORT, ROOT_URL } = process.env || {};
PORT = PORT || 8000;
ROOT_URL = ROOT_URL || `http://localhost:${PORT}`;

const sendRequest = async (path, options = {}) => {
    const headers = { ...(options.headers || {}), 'Content-Type': 'application/json; charset=UTF-8' };
    
    const response = await fetch(`${ROOT_URL}${path}`, {
        method: 'POST',
        credentials: 'include',
        ...options,
        headers,
    });
    const jsonData = await response.json();

    if (jsonData.error) {
        throw new Error(jsonData.error);
    }

    return jsonData;
};

export default sendRequest;
