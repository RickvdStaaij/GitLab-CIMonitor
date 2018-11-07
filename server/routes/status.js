const app = (module.exports = require('express')());
const Status = require('../domain/status/Status');
const StatusManager = require('../domain/status/StatusManager');

app.post('/', (request, response) => {
    console.log('/status [POST]');

    Status.createStatus(request.body)
        .then(status =>
            response.json({
                message: 'Successfully pushed your status!',
                status: status.getRawData(),
            }),
        )
        .catch(error => response.status(422).json(error));
});

app.get('/', (request, response) => {
    console.log('/status [GET]');

    response.json({ message: 'You can only view the statuses via the dashboard.' });
});

app.get('/clear-all', (request, response) => {
    console.log('/status/clear-all [GET]');

    StatusManager.reset();

    response.json({ message: 'All statuses have been cleared.' });
});
