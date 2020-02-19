const express = require('express');
const app = express();
const path = require('path');

const cors = require('cors');
require('./db/mongoose.js');
const reApi=require('./api-router/re-api')
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use( express.static(path.join(__dirname, 'public')));
app.use(reApi)

app.listen(port, () => {
	console.log('Server ' + port + ' started!');
});
