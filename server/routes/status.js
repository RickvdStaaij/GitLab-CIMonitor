const app = (module.exports = require('express')());

app.post('/', (request, response) => {
    console.log('/status [POST]');

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
