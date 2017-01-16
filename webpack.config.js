const ClosureCompiler = require('google-closure-compiler-js').webpack;

module.exports = {
    devtool: null,
    entry: { browser: './index.js' },
    output: {
        path: __dirname,
        filename: 'dist/extract-domain.min.js',
        library: 'extractDomain',
        libraryTarget: 'commonjs'
    },
    plugins: [
        new ClosureCompiler({
            options: {
                languageIn: 'ECMASCRIPT6',
                languageOut: 'ECMASCRIPT3',
                compilationLevel: 'ADVANCED'
            }
        })
    ]
};
