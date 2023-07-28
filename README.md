# Extract domain name from URL

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4JDQMB6MRJXQE&source=url)

This package provides a performant way to extract domain names from URLs without using regular expressions or array manipulations.

Learn more about [What is a URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL)


## Supports

Both the browser and nodejs.

## Usage

### Installation
```bash
$ npm i --save extract-domain
```

### API
- urls: A string or an array of URLs.
- options { tld: true }: If it should take TLD domains to consideration (i.e. .co.uk)
- returns: A string representing the extracted domain name or an array of domain names.

```js
extractDomain(urls, options);
```

ES6 Import
```js
import extractDomain from 'extract-domain';
```

CommonJS Require
```js
const extractDomain = require('extract-domain');
```

Examples
```js
const urls = [
    'https://www.npmjs.com/package/extract-domain',
    'http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'http://user:password@example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'https://npmjs.com/package/extract-domain',
    'ftp://example.org/resource.txt',
    'http://example.co.uk/',
    'this.is.my@email.com',
];

extractDomain(urls[0]); // npmjs.com

extractDomain(urls); // [ 'npmjs.com', 'example.com', 'example.com', 'npmjs.com', 'example.org', 'co.uk', 'email.com' ]
```

## TLD support

TLD support requires the optional dependency of the [`psl` library](https://www.npmjs.com/package/psl).

To use the code with the PSL support, you have to wrap it in either an async function or use it as a promise.

Examples

```bash
npm i --save-optional psl
```

```js
const url =
    'http://www.example.co.uk:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument';

async function extract(url) {
    console.log(await extractDomain(url, { tld: true }));
    // example.co.uk
}

// Or
extractDomain(url, { tld: true }).then(console.log);
// example.co.uk
```

Please note that using the tld flag may significantly slow down the process. Benchmark results:

```
# extract domain 10,000 times
  end ~14 ms (0 s + 13572914 ns)
# extract domain with tld 10,000 times
  end ~4.29 s (4 s + 288108681 ns)
```

## Tests

```bash
$ npm test
```

## Coding style

```bash
$ npm run pretty
```

## Benchmark

```bash
$ npm run benchmark
```

## Contribution

Contributions are appreciated.

## License

MIT-licensed. See LICENSE.
