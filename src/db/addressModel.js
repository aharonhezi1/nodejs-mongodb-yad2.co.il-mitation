const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema=new Schema({
    index:Number,
    city:String,
    street:String
})
addressSchema.index({'$**': 'text'});

const Address= mongoose.model('Address',addressSchema)
module.exports=Address