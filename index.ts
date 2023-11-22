const endings = ['/', ':', '?', '#'];
const starters = ['.', '/', '@'];

type Url = string;
type ReturnUrl = Url | Promise<Url | null>;

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
 * @param {Url} url https://www.google.com"
 * @param {GetDomainOptions} opts `{ tld: true }` permit to get Top Level Domain like `*.co.uk`
 * @returns {Url | Promise<Url>} Return URLs or a promise of URLs if the PSL lib is being used
 */
export default function extractDomain(
    url: Url,
    opts: GetDomainOptions = {}
): ReturnUrl | undefined {
    try {
        if (typeof url === 'string') {
            return getDomainFromUrl(url, opts);
        } else if (Array.isArray(url)) {
            console.error(
                'Sorry, it is no longer possible to pass an array of URLs. Please use a string instead.',
                "I.e. extractDomain('https://www.google.com')."
            );

            return url;
        }
    } catch (err) {
        console.error(err);

        throw new TypeError(
            'The given string is not a valid URL. https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL'
        );
    }
}
