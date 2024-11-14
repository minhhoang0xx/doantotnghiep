

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

export const initFacebookSDK = () => {
    if (window.FB) {
        window.FB.XFBML.parse();
    }
    let locale = "vi_VN";
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: process.env.REACT_APP_FB_ID,
            cookie: true, // enable cookies to allow the server to access
            // the session
            xfbml: true, // parse social plugins on this page
            version: "v2.1"
        });
    };
    // Load the SDK asynchronously
    (function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = `//connect.facebook.net/${locale}/sdk.js`;
        fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
};