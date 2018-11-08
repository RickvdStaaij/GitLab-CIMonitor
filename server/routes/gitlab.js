const app = (module.exports = require('express')());

app.post('/', (request, response) => {
    console.log('/gitlab [POST]');

    // @todo: Convert GitLab web-hook to a status

    response.json({
        message: 'Received your web-hook, thank you for your service.',
    });
});
