export function randomString(length = 32, unique = true) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return `${unique ? Date.now() : ""}${result}`;
}

export const getCookieValue = (name) => {
    if (typeof document === "undefined") {
        return "";
    }
    return (
        document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""
    );
};

export const removeCookie = (name) => {
    if (typeof document === "undefined") {
        return;
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};