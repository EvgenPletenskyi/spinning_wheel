const path = require('path');

module.exports = {
    entry: './app.ts',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};