const assert = require('assert');

const extractDomain = require('../dist/extract-domain.module.js');

const urls = [
    'https://www.npmjs.com/package/extract-domain',
    'http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'https://npmjs.com/package/extract-domain',
    'http://example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'http://www.so.many.sub.domains.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'http://user:password@example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'ftp://example.org/resource.txt',
    'http://www.npmjs.com',
    'http://www.npmjs.com?query=test',
    'http://www.npmjs.com#fragment',
    'this.is.my@email.com',
    'test@something.com',
    'http://www.example.co.uk/',
];

const expected = [
    'npmjs.com',
    'example.com',
    'npmjs.com',
    'example.org',
    'email.com',
    'something.com',
    'co.uk',
];

describe('extract domain', () => {
    it('should return the domain if it already has been extracted', () => {
        assert.strictEqual(extractDomain('example.com'), 'example.com');
    });

    it('should extract given domain from url', () => {
        assert.strictEqual(extractDomain(urls[0]), expected[0]);
        assert.strictEqual(extractDomain(urls[1]), expected[1]);
        assert.strictEqual(extractDomain(urls[7]), expected[0]);
        assert.strictEqual(extractDomain(urls[8]), expected[0]);
        assert.strictEqual(extractDomain(urls[10]), expected[4]);
        assert.strictEqual(extractDomain(urls[12]), expected[6]);
    });

    it('should extract given domain from an array of urls', () => {
        const domains = extractDomain(urls);

        domains.map((domain) => assert(expected.indexOf(domain) > -1));
    });

    it('should return empty string if it is not a url', () => {
        assert.strictEqual(extractDomain('/i.am/just.astring//7test'), '');
    });

    it('should throw syntax error exception if the argument is not string nor array', () => {
        try {
            extractDomain({});
        } catch (e) {
            assert.strictEqual(e.name, 'TypeError');

            assert.strictEqual(
                e.message,
                'The given URL is not a string. Please verify your string|array.'
            );
        }
    });

    it('should throw syntax error exception if the array value is not a string', () => {
        try {
            extractDomain([['wow']]);
        } catch (e) {
            assert.strictEqual(e.name, 'TypeError');

            assert.strictEqual(
                e.message,
                'The given URL is not a string. Please verify your string|array.'
            );
        }
    });

    it('should support tld if options flag is used', () => {
        assert.strictEqual(
            extractDomain(
                'http://www.so.many.sub.domains.example.co.uk:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
                { tld: true }
            ),
            'example.co.uk'
        );

        assert.strictEqual(
            extractDomain(
                'http://user:password@www.so.many.sub.domains.example.co.uk:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
                { tld: true }
            ),
            'example.co.uk'
        );

        assert.strictEqual(
            extractDomain(
                'http://user:password@www.so.many.sub.domains.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
                { tld: true }
            ),
            'example.com'
        );

        assert.strictEqual(extractDomain('https://example.com', { tld: true }), 'example.com');
    });

    it('should not support tld if options flag is used with false value', () => {
        assert.strictEqual(
            extractDomain(
                'http://www.so.many.sub.domains.example.co.uk:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
                { tld: false }
            ),
            'co.uk'
        );

        assert.strictEqual(
            extractDomain(
                'http://user:password@www.so.many.sub.domains.example.co.uk:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
                { tld: false }
            ),
            'co.uk'
        );

        assert.strictEqual(
            extractDomain(
                'http://user:password@www.so.many.sub.domains.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
                { tld: false }
            ),
            'example.com'
        );

        assert.strictEqual(extractDomain('https://example.com', { tld: false }), 'example.com');
    });
});
