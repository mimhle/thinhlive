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
    return fetch(`${API_URL}/users/login`, {
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