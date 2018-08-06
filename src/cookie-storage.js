import {
    objectExtend,
    formatCookie,
    parseCookies
} from './util.js';
/*eslint-disable no-empty*/
export function getCookieDomainUrl() {
    try {
        let domain = window.location.hostname;
        if (domain !== 'localhost') {
            return domain;
        }
        return null;
    } catch (e) { }

    return '';
}

class CookieStorage {
    constructor(defaultOptions) {
        this._defaultOptions = objectExtend({
            domain: getCookieDomainUrl(),
            expires: null,
            path: '/',
            secure: false
        }, defaultOptions);
    }

    setItem(key, value, timeOffset) {
        const options = objectExtend({}, this._defaultOptions);
        const cookie = formatCookie(key, value, objectExtend(options, {
            expires: timeOffset ? (new Date((new Date()).getTime() + timeOffset)) : null,
        }));
        this._setCookie(cookie);
    }

    getItem(key) {
        const cookies = parseCookies(this._getCookie());
        return cookies.hasOwnProperty(key) ? cookies[key] : null;
    }

    removeItem(key) {
        const value = '';
        const defaultOptions = objectExtend({}, this._defaultOptions);
        const options = objectExtend(defaultOptions, {
            expires: new Date(0)
        });
        const cookie = formatCookie(key, value, options);
        this._setCookie(cookie);
    }

    _getCookie() {
        try {
            return typeof document === 'undefined'
                ? '' : typeof document.cookie === 'undefined'
                    ? '' : document.cookie;
        } catch (e) { }

        return '';
    }
    _setCookie(cookie) {
        try {
            document.cookie = cookie;
        } catch (e) { }
    }
}

export default CookieStorage