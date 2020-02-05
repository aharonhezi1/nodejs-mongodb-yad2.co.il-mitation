const express = require("express");
const app = express();
const moment = require("moment");
const cors = require("cors");
require("./db/mongoose.js");
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
const RealEstate = require("./db/realEstateModel");

app.get("/api/real-estate/:id", async (req, res) => {
  try {
    const reType = req.params.id;
    const queryParams = req.query;
    console.log(queryParams);    
    let flats;
    if (!!queryParams) {
      const { address, maxRooms,minRooms, minPrice, maxPrice } = queryParams;
      let {propertyType}=queryParams;
      propertyType=propertyType?propertyType.split(','):'';
      let query = {
        type: reType,
        price: {
          $gte: parseInt(!!minPrice ? minPrice : 0),
          $lte: parseInt(!!maxPrice ? maxPrice : 9999999999)
        },
        "about.rooms":{
          $gte: parseInt(Boolean(minRooms) ? minRooms : 0),
          $lte: parseInt(Boolean(maxRooms) ? maxRooms : Infinity)
        },
        "address.city": address ? address : { $regex: ".*" },
        "about.type":!!propertyType?{ $in: propertyType}: { $regex: ".*" },
      };
      
      flats = await RealEstate.find(query);
      
    } else {
      flats = await RealEstate.find({ type: reType });
    }

    flats = flats.map(flat => {
      if (!flat.about.enteryDate) return flat;
      let f = {
        ...flat.toObject(),
        about: {
          ...flat.about.toObject(),
          enteryDate: moment(flat.about.enteryDate).format("DD/MM/YYYY")
        }
      };
      return f;
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
