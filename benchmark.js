const bench = require('nanobench');
const extractDomainDist = require('./dist/extract-domain.min');
const extractDomain = require('./index');
const url = 'https://www.npmjs.com/package/extract-domain';

const TIMES = 2500000;

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

bench(`extract domain dist ${TIMES} times`, b => {
    b.start();

    for (let i = 0; i < TIMES; i++) {
        extractDomainDist(url) === 'npmjs.com';
    }

    b.end();
});

bench(`extract domain ${TIMES} times`, b => {
    b.start();

    for (let i = 0; i < TIMES; i++) {
        extractDomain(url) === 'npmjs.com';
    }

    b.end();
});

bench(`extract domain regex ${TIMES} times`, b => {
    b.start();

    for (let i = 0; i < TIMES; i++) {
        extractDomainRegEx(url) === 'npmjs.com';
    }

    b.end();
});

bench(`extract domain array hack ${TIMES} times`, b => {
    b.start();

    for (let i = 0; i < TIMES; i++) {
        extractDomainArray(url) === 'npmjs.com';
    }

    b.end();
});
