import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App.js';

const app = express();
const PORT = 4000;

app.use(cors({
    origin: [
      'http://localhost:9005',
      'http://localhost:8080',
      'http://localhost:4000'
    ],
    credentials: true
}))

app.use('^/$', (req, res, next) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', 
        (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send('error');
            }
            return res.send(data.replace(
                '<div id="root"></div>', 
                `<div id="root">
                    ${ReactDOMServer.renderToString(<App/>)}
                </div>`
            ))
        }
    );
})

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`)
});