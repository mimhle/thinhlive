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

export function choose(choices) {
    let index = Math.floor(Math.random() * choices.length);
    return choices[index];
}

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

export const secondsToHms = (d, short = false) => {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    if (!short) return `${h > 0 ? `${h}:` : ""}${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
    if (h > 0) return `${h}hour${h > 1 ? "s" : ""}`;
    if (m > 0) return `${m}min${m > 1 ? "s" : ""}`;
    return `${s}sec${s > 1 ? "s" : ""}`;
}