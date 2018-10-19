const app = (module.exports = require('express')());
const StatusManager = require('../domain/status/StatusManager');

app.post('/', (request, response) => {
    console.log('/status [POST]');

    console.log(request.body);

    StatusManager.addStatus(request.body);

    // @todo: Use sexy promise!
    // addStatus(request.body)
    //     .then((status) => response.send(status))
    //     .catch((err) => response.status(422).send({message: 'stuk'}));

    response.send({ message: 'New status is WIP.' });
});

app.get('/', (request, response) => {
    console.log('/status [GET]');

    response.send({ message: 'You can only view the statuses via the dashboard.' });
});
