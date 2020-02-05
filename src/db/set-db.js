const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/realEstate', {useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () =>
    console.log("we're connected to db!")    
);
// const housePicsLinks=[
 
// ]
const {housePics,roomPics} =require('./pics')

const RealEstate=require('./realEstateModel')

const realEstates=[
    {
        address:{city:'Mevo-Horon',street:'Yefe-Nof',number:345},
        price:2000000,
        pictures:[housePics[0],roomPics[0]],
        description:'Lovely falt with great view to the neighbors window',
        propertyDetails:{
            airConditioner:true,  
            warhouse:true,
            balcony:true,
            accessibility:false,
            renovated:false,
            bars:false,
            elevator:true,
            parking:false,
            furniture:'dining table and chairs'
        },
        about:{
            type:"apartment",
            shelter:true,
            //bathroom:{...detail},
            //storeroom:{...detail},
            enteryDate:new Date('Wed Feb 15 2020 15:54:54 GMT+0200 (Israel Standard Time)'),
            //rented:,
            rooms:9,
            enteryFromStreet:true,
            floor:5,
            squaremeter:100
            //meetingRoom:{...detail},
          //  rentedTill:{type:Date,default:'not specified'},
        }
        
    }, {
        address:{city:"Modi'in",street:'Yafo',number:34},
        price:3000000,
        pictures:[housePics[1],roomPics[1]],
        description:'Lovely falt with  windows, doors and everything',
        propertyDetails:{
        airConditioner:true,  
           warhouse:true,
            balcony:true,
            accessibility:true,
            renovated:true,
            bars:true,
            elevator:true,
            parking:false,
           // furniture:'dining table and chairs'
        },
        about:{
            type:"apartment",
            shelter:true,
            //bathroom:{...detail},
            //storeroom:{...detail},
            enteryDate:new Date('Wed Jan 1 2020 15:54:54 GMT+0200 (Israel Standard Time)'),
            //rented:,
            enteryFromStreet:false,
            floor:12,
            squaremeter:80,
            rooms:3
            //meetingRoom:{...detail},
          //  rentedTill:{type:Date,default:'not specified'},
        }
        
    },
    {
        address:{city:"Modi'in",street:'Rakefet',neighborhood:'Kyzer',number:9},
        price:3500000,
        pictures:[housePics[2],roomPics[2]],
        description:'Lovely falt with a great club next door',
        propertyDetails:{
            airConditioner:true,  
            warhouse:true,
            balcony:true,
            accessibility:false,
            renovated:false,
            bars:false,
            elevator:true,
            parking:2,
           // furniture:'dining table and chairs'
        },
        about:{
            type:'penthouse',
            shelter:true,
            //bathroom:{...detail},
            //storeroom:{...detail},
            enteryDate:new Date('Wed Jan 15 2020 15:54:54 GMT+0200 (Israel Standard Time)'),
            //rented:,
            enteryFromStreet:false,
            floor:2,
            squaremeter:105,
            rooms:4
            //meetingRoom:{...detail},
          //  rentedTill:{type:Date,default:'not specified'},
        }
        
    },{
        address:{city:"Tel-Aviv",street:'Yad-Haroozim'},
        price:100000,
        pictures:[housePics[3],roomPics[3]],
       // description:'Lovely falt with a great club next door',
        propertyDetails:{
            airConditioner:true,  
            warhouse:true,
            balcony:true,
            accessibility:false,
            renovated:true,
            bars:true,
            elevator:true,
            parking:1,
           // furniture:'dining table and chairs'
        },
        about:{
            type:'penthouse',
            shelter:true,
            //bathroom:{...detail},
            //storeroom:{...detail},
            enteryDate:new Date('Wed Jan 15 2021 15:54:54 GMT+0200 (Israel Standard Time)'),
            rented:true,
            enteryFromStreet:true,
            floor:9,
            squaremeter:200,
            rooms:2,
            //meetingRoom:{...detail},
          //  rentedTill:{type:Date,default:'not specified'},
        }
        
    },
    {
        address:{city:"Yakir"},
        price:3500000,
        pictures:[housePics[4],roomPics[4]],
        type:'forRent',
         description:'Lovely falt with a great club next door',
         propertyDetails:{
             airConditioner:true,  
             warhouse:true,
             balcony:true,
             accessibility:true,
             renovated:true,
             bars:true,
             elevator:true,
             parking:1,
            // furniture:'dining table and chairs'
         },
         about:{
             type:'private house',
             shelter:true,
             //bathroom:{...detail},
             //storeroom:{...detail},
             enteryDate:new Date('Wed Jan 15 2021 15:54:54 GMT+0200 (Israel Standard Time)'),
             rented:true,
             enteryFromStreet:true,
             floor:9,
             squaremeter:200,
             rooms:1,
             //meetingRoom:{...detail},
           //  rentedTill:{type:Date,default:'not specified'},
         }
         
     },
]

// state.forEach(car => {
// new Car(car).save(e=>
//     console.log('car: '+car.plateNumber,e)
//     ) 
// });
//RealEstate.remove({}, ()=>console.log('remove'));
RealEstate.insertMany(realEstates,e=>
    console.log(e)
)