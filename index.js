const express = require('express');
const app = express();

var root = require('./routes/index.js')
var api = require('./routes/api.js')

require('dotenv').config()

console.log('use ' + process.env.DB_USER);

app.get('/status', (req, res) => res.send('Working!'));

app.use('/', root);
app.use('/api', api);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
