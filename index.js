function throwTypeError() {
    throw new TypeError('The given URL is not a string. Please verify your string|array.');
}

const endings = ['/', ':', '?', '#'];
const starters = ['.', '/', '@'];

function getDomainFromUrl(url, opts) {
    if (typeof url !== 'string') {
        throwTypeError();
    }

    let domainInc = 0;
    let offsetDomain = 0;
    let offsetStartSlice = 0;
    let offsetPath = 0;
    let len = url.length;
    let i = 0;

    // Find end offset of domain
    while (len-- && ++i) {
        if (domainInc && endings.indexOf(url[i]) > -1) {
            break;
        }

        if (url[i] !== '.') {
            continue;
        }

        ++domainInc;

        offsetDomain = i;
    }

    offsetPath = i;

    i = offsetDomain;

    // Find offset before domain name.
    while (i--) {
        // Look for sub domain, protocol or basic auth
        if (starters.indexOf(url[i]) === -1) {
            continue;
        }

        offsetStartSlice = i + 1;

        break;
    }

    // offsetStartSlice should always be larger than protocol
    if (offsetStartSlice < 2) {
        return '';
    }

    // Very customized if statement for tlds
    if (opts.tld) {
        let offsetStart = 0;
        const starters = ['/', '@'];

        while (i--) {
            if (starters.indexOf(url[i]) > -1) {
                offsetStart = i + 1;

                break;
            }
        }

        const psl = require('psl');

        return psl.get(url.slice(offsetStart, offsetPath));
    }

    // Tried several approaches slicing a string. Can't get it any faster than this.
    return url.slice(offsetStartSlice, offsetPath);
}

module.exports = function extractDomain(urls, opts = {}) {
    if (typeof urls === 'string') {
        return getDomainFromUrl(urls, opts);
    } else if (Array.isArray(urls)) {
        const extractedUrls = [];
        const len = urls.length;
        let i = 0;

        for (; i < len; i++) {
            extractedUrls.push(getDomainFromUrl(urls[i], opts));
        }

        return extractedUrls;
    } else {
        throwTypeError();
    }
};
