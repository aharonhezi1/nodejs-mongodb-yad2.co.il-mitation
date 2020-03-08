const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>{
    console.log("we're connected to db!") ;
}
       
);
