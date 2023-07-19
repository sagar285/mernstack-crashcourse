const mongoose =require("mongoose");
const bcrypt =require("bcryptjs");
const jwt =require("jsonwebtoken");

const Userschema = new mongoose.Schema({
   name:{
    type:String,
    required:true,
   },
   email:{
    type:String,
    required:true,
    unique:true,
   },
   password:{
    type:String,
    required:true,
   },
})


// password hashing function

Userschema.pre("save",async function(next){
    if(!this.isModified("password")) return  next();
    this.password =await bcrypt.hash(this.password,10);
    next();
})

// jwt token generate function
Userschema.methods.generatetoken=function(){
    return jwt.sign({_id:this._id},"djkjdjdjfjdfhdjfduereuiureieu",{expiresIn:"15d"});
}




module.exports =mongoose.model("User",Userschema);