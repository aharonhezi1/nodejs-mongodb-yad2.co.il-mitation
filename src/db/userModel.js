const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const RealEstate = require('./realEstateModel');
const JWT_SECRET=process.env.JWT_SECRET

const userSchema=new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    }, password:{
        type: String,
        required: true,
        trim: true, 
        minlength: 2,
     
    },
    email:{
        type: String,
        required: true,
        unique : true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Email is invalid");
            }
          }
    }, phone:{
        type: String,
        required: true,
        trim: true,
    }, 
    tokens: [
      {
        token: {
          type: String
        }
      }
    ],
},
{
    timestamps:true
})
userSchema.virtual("realastates", {
    ref: "RealEstate",
    localField: "_id",
    foreignField: "owner"
  });
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
  
    delete userObject.password;
    delete userObject.tokens;
    //delete userObject.email;
  
  
    return userObject;
  }
  userSchema.methods.generateAuthToken = async function() {
    const user = this;
    console.log(JWT_SECRET);
    
    const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET);
  
    user.tokens = user.tokens.concat({ token });
    await user.save();
  
    return token;
  };
  userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new Error("Unable to login");
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      throw new Error("Unable to login");
    }
  
    return user;
  };
  
  // Hash the plain text password before saving
  userSchema.pre("save", async function(next) {
    const user = this;
  
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    if(!user.tokens.length){
        user.generateAuthToken()
      }
  
    next();
  });
  const User = mongoose.model("User", userSchema);
  module.exports = User;
