Extract domain name from URL
--
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4JDQMB6MRJXQE&source=url)
![Travis](https://travis-ci.org/bjarneo/extract-domain.svg?branch=master)

Performant domain name extraction. No regex or array magic.

[What is an URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL)

However. This package will remove the sub domain as well.

Supports
--
Browser and Node.

Usage
--

```bash
$ npm i --save extract-domain
```

* urls = string|array
* returns string|array

```js
extractDomain(urls);
```

ES6
```js
import extractDomain from 'extract-domain';
```

```js
const extractDomain = require('extract-domain');
```

```js
const urls = [
    'https://www.npmjs.com/package/extract-domain',
    'http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'http://user:password@example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'https://npmjs.com/package/extract-domain',
    'ftp://example.org/resource.txt',
    'this.is.my@email.com',
    'https://www.with-second-level-domain.co.uk'
];


extractDomain(urls[0]); // npmjs.com

extractDomain(urls); // [ 'npmjs.com', 'example.com', 'example.com', 'npmjs.com', 'example.org', 'email.com', 'with-second-level-domain.co.uk' ]

```

Tests
--
```bash
$ npm test
```

Coding style
--
```bash
$ npm run pretty
```

Benchmark
--
```bash
$ npm run benchmark
```

Contribution
--
Contributions are appreciated.

License
--
MIT-licensed. See LICENSE.

Donation
--
If this project has been helpful in any way, and you want to treat me a cup of coffee, please donate :)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=4JDQMB6MRJXQE&source=url)
