const express = require('express');

const siteCache = {}

const server = express();
server.use(express.json());

server.post('/', (req, res) => {
    const siteId = req.body['site-id'];
    if (siteId) {
        if (siteCache[siteId]) {
            siteCache[siteId].push(req.body);
        } else {
            siteCache[siteId] = [req.body];
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

server.get('/*', (req, res) => {
    const siteName = req.url.slice(1);
    res.status(200);
    res.send(siteCache[siteName]);
});

server.listen(process.env.PORT);
