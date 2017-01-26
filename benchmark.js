const bench = require('nanobench');
const extractDomainDist = require('./dist/extract-domain.min');
const extractDomain = require('./index');
const url = 'https://www.npmjs.com/package/extract-domain';

function extractDomainArray(url) {
    let domain;

    if (url.indexOf('://') > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }

    return domain.split(':')[0].replace('www.', '');
}

function extractDomainRegEx(url) {
    const matches = url.match(/([^\/?#.]+\.[^\/?#.:]+)(?:[\/?#:]|$)/i);

    return matches[1];
}

bench('extract domain dist 25.000.000 times', b => {
    b.start();

    for (let i = 0; i < 25000000; i++) {
        extractDomainDist(url) === 'npmjs.com';
    }

    b.end();
});

bench('extract domain 25.000.000 times', b => {
    b.start();

    for (let i = 0; i < 25000000; i++) {
        extractDomain(url) === 'npmjs.com';
    }

    b.end();
});

bench('extract domain regex 25.000.000 times', b => {
    b.start();

    for (let i = 0; i < 25000000; i++) {
        extractDomainRegEx(url) === 'npmjs.com';
    }

    b.end();
});

bench('extract domain array hack 25.000.000 times', b => {
    b.start();

    for (let i = 0; i < 25000000; i++) {
        extractDomainArray(url) === 'npmjs.com';
    }

    b.end();
});
