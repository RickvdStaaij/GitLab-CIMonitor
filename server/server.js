console.log('[CIMonitor] Started!');

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const statusManager = require('./domain/status/StatusManager');

const app = express();

app.use(bodyParser.json());
app.use(router);

app.listen(9999, () => {
    console.log('[Express] Ready and listening...');
});
