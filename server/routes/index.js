const app = (module.exports = require('express')());

app.use('/', require('./dashboard'));
app.use('/status', require('./status'));
