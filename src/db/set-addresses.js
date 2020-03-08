const Address=require('./addressModel')
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/realEstate', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("we're connected to db!"));
const { addresses } = require('../db/israelAddress');


Address.insertMany(addresses, e => console.log(e));
//ddress.remove({}, () => console.log('remove'));

