Extract domain from given URL
--

Performant domain extraction. No regex or array magic.

[What is a URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL)

However. This package will also remove the sub domain.

Support
--
Browser and Node.

Usage
--

* urls = string|array
* returns string|array

```js
extractDomain(urls);
```

ES6
```js
import { extractDomain } from 'extract-domain';
```

```js
const extractDomain = require('extract-domain').extractDomain;
```

```js
const urls = [
    'https://www.npmjs.com/package/extract-domain',
    'http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'http://user:password@example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument',
    'https://npmjs.com/package/extract-domain',
    'ftp://example.org/resource.txt'
];


extractDomain(urls[0]); // npmjs.com

extractDomain(urls); // [ 'npmjs.com', 'example.com', 'example.com', 'npmjs.com', 'example.org' ]

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

Contribution
------
Contributions are appreciated.

License
------
MIT-licensed. See LICENSE.
