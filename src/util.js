export function objectExtend(a, b) {

    // Don't touch 'null' or 'undefined' objects.
    if (a == null || b == null) {
        return a;
    }

    Object.keys(b).forEach(function (key) {
        if (Object.prototype.toString.call(b[key]) == '[object Object]') {
            if (Object.prototype.toString.call(a[key]) != '[object Object]') {
                a[key] = b[key];
            } else {
                a[key] = objectExtend(a[key], b[key]);
            }
        } else {
            a[key] = b[key];
        }
    });

    return a;
};
/* eslint-disable no-useless-escape  */
export function isObject(val) {
    if (val !== null && typeof val === 'object' && val.constructor !== Array) {
        return true;
    }

    return false;
}
export function compare(one, two) {
    var i, ii, key;

    if (Object.prototype.toString.call(one) === '[object Object]' && Object.prototype.toString.call(two) === '[object Object]') {
        for (key in one) {
            if (compare(one[key], two[key])) {
                return true;
            }
        }

        return false;
    }

    one = toArray(one);
    two = toArray(two);

    if (!one || !two || one.constructor !== Array || two.constructor !== Array) {
        return false;
    }

    for (i = 0, ii = one.length; i < ii; i++) {
        if (two.indexOf(one[i]) >= 0) {
            return true;
        }
    }

    return false;
}
export function toArray(val) {
    return (typeof val) === 'string' || (typeof val) === 'number' ? [val] : val;
}
export function decodeBase64(str) {
    let buffer;
    if (typeof module !== 'undefined' && module.exports) {
        try {
            buffer = require('buffer').Buffer;
        } catch (err) {
            // noop
        }
    }

    let fromCharCode = String.fromCharCode;

    let re_btou = new RegExp([
        '[\xC0-\xDF][\x80-\xBF]',
        '[\xE0-\xEF][\x80-\xBF]{2}',
        '[\xF0-\xF7][\x80-\xBF]{3}'
    ].join('|'), 'g');

    let cb_btou = function (cccc) {
        switch (cccc.length) {
            case 4: {
                let cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                    | ((0x3f & cccc.charCodeAt(1)) << 12)
                    | ((0x3f & cccc.charCodeAt(2)) << 6)
                    | (0x3f & cccc.charCodeAt(3));
                let offset = cp - 0x10000;
                return (fromCharCode((offset >>> 10) + 0xD800)
                    + fromCharCode((offset & 0x3FF) + 0xDC00));
            }
            case 3:
                return fromCharCode(
                    ((0x0f & cccc.charCodeAt(0)) << 12)
                    | ((0x3f & cccc.charCodeAt(1)) << 6)
                    | (0x3f & cccc.charCodeAt(2))
                );
            default:
                return fromCharCode(
                    ((0x1f & cccc.charCodeAt(0)) << 6)
                    | (0x3f & cccc.charCodeAt(1))
                );
        }
    };

    let btou = function (b) {
        return b.replace(re_btou, cb_btou);
    };

    let _decode = buffer ? function (a) {
        return (a.constructor === buffer.constructor
            ? a : new buffer(a, 'base64')).toString();
    }
        : function (a) {
            return btou(atob(a));
        };
    /* eslint-disable no-useless-escape  */
    return _decode(
        String(str).replace(/[-_]/g, function (m0) {
            return m0 === '-' ? '+' : '/';
        })
            .replace(/[^A-Za-z0-9\+\/]/g, '')
    );
}

export function parseCookies(str) {
    if (str.length === 0) return {};
    const parsed = {};
    const pattern = new RegExp('\\s*;\\s*');
    str.split(pattern).forEach((i) => {
        const [encodedKey, encodedValue] = i.split('=');
        const key = decodeURIComponent(encodedKey);
        const value = decodeURIComponent(encodedValue);
        parsed[key] = value;
    });
    return parsed;
};

export function formatOptions(options) {
    const { path, domain, expires, secure } = options;
    return [
        typeof path === 'undefined' || path === null
            ? '' : ';path=' + path,
        typeof domain === 'undefined' || domain === null
            ? '' : ';domain=' + domain,
        typeof expires === 'undefined' || expires === null
            ? '' : ';expires=' + expires.toUTCString(),
        typeof secure === 'undefined' || secure === null || secure === false
            ? '' : ';secure'
    ].join('');
};

export function formatCookie(key, value, options) {
    return [
        encodeURIComponent(key),
        '=',
        encodeURIComponent(value),
        formatOptions(options)
    ].join('');
};