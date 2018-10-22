const express = require('express');

const siteCache = {}

const listeningServer = express();
listeningServer.use(express.json());

listeningServer.post('/', (req, res) => {
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
    res.end();
});

const webServer = express();
webServer.get('/*', (req, res) => {
    const siteName = req.url.slice(1);
    res.send(siteCache[siteName]);
    res.sendStatus(200);
    res.end();
});

listeningServer.listen(9991, '0.0.0.0');
webServer.listen(8080, '0.0.0.0');
