const app = (module.exports = require('express')());

app.get('/test', (request, response) => {
    console.log('/test [GET]');

    response.send({ message: 'Hello, this is a test.' });
});

app.use('/status', require('./status'));
