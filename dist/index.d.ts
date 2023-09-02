type Url = string;
type Urls = string | Array<string>;
type ReturnUrls = Array<Url> | Array<Promise<Url>>;
type ReturnUrl = Url | Promise<Url | null>;
/**
 * Options to extract domain.
 */
type GetDomainOptions = {
    tld?: boolean;
};
/**
 * @param {Urls} urls ["https://www.google.com", "https://www.github.com"] or "https://www.google.com"
 * @param {GetDomainOptions} opts `{ tld: true }` permit to get Top Level Domain like `*.co.uk`
 * @returns {Urls | Promise<Urls>} Return URLs or a promise of URLs if the PSL lib is being used
 */
export default function extractDomain(urls: Urls, opts?: GetDomainOptions): ReturnUrl | ReturnUrls | null;
export {};
