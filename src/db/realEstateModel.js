const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema= new Schema({
    city:String,
    street:String,
    neighborhood:String,
    number:Number
})
const aboutSchema= new Schema({
    type:String,
    shelter:Boolean,
    //bathroom:{...detail},
    //storeroom:{...detail},
    enteryDate:Date,
    rented:Boolean,
    enteryFromStreet:Boolean,
    floor:Number,
    squaremeter:Number,
    rooms:Number,

    //meetingRoom:{...detail},
  //  rentedTill:{type:Date,default:'not specified'},
})
const propertyDetailsSchema= new Schema({
    airConditioner:Boolean,  
    warhouse:Boolean,
    balcony:Boolean,
    accessibility:Boolean,
    renovated:Boolean,
    bars:Boolean,
    elevator:Boolean,
    parking:Number,
    furniture:String,
  
})

const realEstateSchema= new Schema({
 description:{
     type:String,
     default:'not specified'
 },
 address:addressSchema,
 price:Number,
 pictures:[{type:String}],
 about:aboutSchema,
 propertyDetails:propertyDetailsSchema,
 type:{
    type:String,
    default:'forsale',
    required:true
} 
})

const RealEstate= mongoose.model('realEstate',realEstateSchema)
// const house=new RealEstate({about:{sheler:true}})
// console.log(house);

module.exports= RealEstate