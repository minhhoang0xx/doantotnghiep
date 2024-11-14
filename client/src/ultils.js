

import { jwtDecode } from "jwt-decode";
export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (e) {
        return false;
    }
    return true

}
export const jwtTranslate = (cookiesAccessToken) => {
    if (!cookiesAccessToken) {
        console.log("Invalid access token");
        return null;
    }
    try {
        const decodedToken = jwtDecode(cookiesAccessToken);
        return decodedToken;
    } catch (error) {
        console.error("Error decoding JWT token:", error);
        return null;
    }
};
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });