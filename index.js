function throwTypeError() {
    throw new TypeError('The given URL is not a string. Please verify your string|array.');
}

// Easy to read they said?
// Function has to many lines they said?
function getDomainFromUrl(url) {
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
        if (domainInc && (url[i] === '/' || url[i] === ':' || url[i] === '?' || url[i] === '#')) {
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
        if (url[i] !== '.' && url[i] !== '/' && url[i] !== '@') {
            continue;
        }

        offsetStartSlice = i + 1;

        break;
    }

    // offsetStartSlice should always be larger than protocol
    if (offsetStartSlice < 6) {
        return '';
    }

    // Tried several approaches slicing a string. Can't get it any faster than this.
    return url.slice(offsetStartSlice, offsetPath);
}

module.exports = function extractDomain(urls) {
    if (typeof urls === 'string') {
        return getDomainFromUrl(urls);
    } else if (Array.isArray(urls)) {
        const extractedUrls = [];
        let len;

        for (let i = 0, len = urls.length; i < len; i++) {
            extractedUrls.push(getDomainFromUrl(urls[i]));
        }

        return extractedUrls;
    } else {
        throwTypeError();
    }
};
