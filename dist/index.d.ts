type Url = string;
type ReturnUrl = Url | Promise<Url | null>;
/**
 * Options to extract domain.
 */
type GetDomainOptions = {
    tld?: boolean;
};
/**
 * @param {Url} url https://www.google.com"
 * @param {GetDomainOptions} opts `{ tld: true }` permit to get Top Level Domain like `*.co.uk`
 * @returns {Url | Promise<Url>} Return URLs or a promise of URLs if the PSL lib is being used
 */
export default function extractDomain(url: Url, opts?: GetDomainOptions): ReturnUrl | undefined;
export {};
