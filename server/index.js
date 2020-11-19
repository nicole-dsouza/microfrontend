require('ignore-styles');

// babel = server-side support for jsx
require('@babel/register')({
    ignore: [/(node_module)/],
    presets: ['@babel/preset-env', '@babel/preset-react']
});

require('./server.js');