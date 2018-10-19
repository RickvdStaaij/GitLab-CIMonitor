const app = (module.exports = require('express')());
const Status = require('../domain/status/Status');

app.post('/', (request, response) => {
    console.log('/status [POST]');

    Status.createStatus(request.body)
        .then(status =>
            response.json({
                message: '',
                status: status.getData(),
            }),
        )
        .catch(error => response.status(422).json(error));
});

app.get('/', (request, response) => {
    console.log('/status [GET]');

    response.json({ message: 'You can only view the statuses via the dashboard.' });
});
