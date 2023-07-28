import "isomorphic-unfetch";
import notify from "../utils/notify";

let { PORT, ROOT_URL } = process.env || {};
PORT = PORT || 9001;
ROOT_URL = ROOT_URL || `http://127.0.0.1:${PORT}`;
// let { BACKEND_URL } = process.env || {};
// const PORT = 9001;
// const ROOT_URL = `http://10.90.138.37:9001`;

const sendRequest = async (path, options = {}) => {
    const removeContentType =
        options.headers && options.headers["Remove-Content-Type"];
    let headers;
    if (removeContentType) {
        headers = { ...(options.headers || {}) };
        delete options.headers["Remove-Content-Type"];
    } else {
        headers = {
            "Content-Type": "application/json; charset=UTF-8",
            ...(options.headers || {})
        };
    }

    const response = await fetch(`${ROOT_URL}${path}`, {
        method: "POST",
        credentials: "include",
        ...options,
        headers
    });

    if (!response.ok) {
        const failedInformation = await response.json();
        notify({ notificationMessage: failedInformation.detail });
        throw new Error(failedInformation.detail);
    }
    const jsonData = await response.json();

    return jsonData;
};

export default sendRequest;
