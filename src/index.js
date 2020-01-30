const express = require("express");
const app = express();
const moment = require('moment')
const cors = require("cors");
require("./db/mongoose.js");
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
const RealEstate = require("./db/realEstateModel");

app.get("/api/real-estate/:id", async (req, res) => {
  try {
    const type = req.params.id;

    let flats = await RealEstate.find({ type });
   flats= flats.map(flat => {
     console.log({...flat}
      );  if(!flat.about.enteryDate)
       return flat

     let f=    {
         ...flat.toObject(),
      about: { ...flat.about.toObject(),
         enteryDate:moment(flat.about.enteryDate).format('DD/MM/YYYY') 
         }
     }
     return f
    });
   
    res.send(flats);
  } catch (e) {
    console.log(e);
    
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log("Server " + port + " started!");
});
