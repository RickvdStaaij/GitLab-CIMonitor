const express = require('express');
const path = require('path');
const router = require('./routes');

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname + '/../monitor/index.html')));

app.use(router);

app.listen(9999, () => {
    console.log('===================');
    console.log('     CIMonitor     ');
    console.log('===================\n');
});
