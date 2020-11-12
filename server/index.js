import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const PORT = process.env.PORT || 4000; // check this
const app = express();

app.get('/', (req, res) => {
    // use a method from ReactDOMServer, renderToString, to render our app to a static HTML string
    const app = ReactDOMServer.renderToString(<App />);
    const indexFile = path.resolve('./build/index.html');
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }
        // read the static index.html file from the built client app, inject our app’s static content in the <div> with an id of "root", and send that as the response to the request
        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        );
    });
});

// tell Express to serve contents from the build directory as static files
app.use(express.static('./build'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});