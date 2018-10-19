const app = (module.exports = require('express')());

app.get('/test', (request, response) => {
    console.log('TEST');
    response.send({
        message: 'Hello, this is a test.',
    });
});
