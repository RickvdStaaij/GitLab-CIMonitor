const express = require('express');
const app = (module.exports = express());
const path = require('path');

// Listen to all the statically generated files
app.use(express.static('dist'));

// When directly opening the applications index, show the dashboard
app.get('/', (req, res) => {
    console.log('/ [GET]');

    return res.sendFile(path.resolve(__dirname + '/../../client/index.html'));
});
