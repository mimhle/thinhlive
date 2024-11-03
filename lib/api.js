import { toBase64 } from "./utils";

const API_URL = "/api/v1";

export async function signUp(username, password) {
    return fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error(res.status.toString());
    });
}

export async function signIn(username, password) {
    return fetch(`${API_URL}/users/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error(res.status.toString());
    });
}

export async function logOut(username, session_id) {
    return fetch(`${API_URL}/users/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, session_id }),
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error(res.status.toString());
    });
}

export async function getUserData() {
    return fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error(res.status.toString());
    });
}

export async function setUserData(username, data) {
    return fetch(`${API_URL}/users/${username}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error(res.status.toString());
    });
}

export async function uploadMedia(imgFile) {
    return fetch(`${API_URL}/media`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({media: await toBase64(imgFile)}),
    }).then(res => {
        if (res.ok) return res.json();
        throw new Error(res.status.toString());
    });
}