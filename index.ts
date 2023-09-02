function throwTypeError(): never {
    throw new TypeError('The given URL is not a string. Please verify your string|array.');
}

const endings = ['/', ':', '?', '#'];
const starters = ['.', '/', '@'];

type Url = string;
type Urls = string | Array<string>;
type ReturnUrls = Array<Url> | Array<Promise<Url>>;
type ReturnUrl = Url | Promise<Url>;

/**
 * Options to extract domain.
 */
type GetDomainOptions = {
    tld?: boolean;
};

/**
 * @param {Url} url
 * @param {GetDomainOptions} opts `{ tld: true }` permit to get Top Level Domain like `*.co.uk`
 * @returns {ReturnUrl} Returns a URL or a promise of a URL if the PSL lib is being used
 */
function getDomainFromUrl(url: Url, opts: GetDomainOptions): ReturnUrl {
    let domainInc: number = 0;
    let offsetDomain: number = 0;
    let offsetStartSlice: number = 0;
    let offsetPath: number = 0;
    let len: number = url.length;
    let i: number = 0;

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

    if (offsetStartSlice === 0 && offsetPath > 3) {
        return url;
    }

    if (offsetStartSlice > 0 && offsetStartSlice < 2) {
        return '';
    }

    // Very customized if statement for tlds
    if (opts.tld) {
        let offsetStart: number = 0;
        const starters: Array<string> = ['/', '@'];
        let i: number = offsetDomain;

        while (i--) {
            if (starters.indexOf(url[i]) > -1) {
                offsetStart = i + 1;

                break;
            }
        }

        return import('psl')
            .then((psl) => Promise.resolve(psl.get(url.slice(offsetStart, offsetPath))))
            .catch((error) => {
                console.error(error);

                throw Error(
                    'You must install psl library (https://www.npmjs.com/package/psl) to use `tld` option'
                );
            });
    }

    // Tried several approaches slicing a string. Can't get it any faster than this.
    return url.slice(offsetStartSlice, offsetPath);
}

/**
 * @param {Urls} urls ["https://www.google.com", "https://www.github.com"] or "https://www.google.com"
 * @param {GetDomainOptions} opts `{ tld: true }` permit to get Top Level Domain like `*.co.uk`
 * @returns {Urls | Promise<Urls>} Return URLs or a promise of URLs if the PSL lib is being used
 */
export default function extractDomain(
    urls: Urls,
    opts: GetDomainOptions = {}
): ReturnUrls | ReturnUrl {
    if (typeof urls === 'string') {
        return getDomainFromUrl(urls, opts);
    } else if (Array.isArray(urls)) {
        // lazy type checking (^o^)
        const extractedUrls: any = [];
        const len: number = urls.length;
        let i: number = 0;

        for (; i < len; i++) {
            const url = getDomainFromUrl(urls[i], opts);

            extractedUrls.push(url);
        }

        return extractedUrls;
    } else {
        throwTypeError();
    }
}
