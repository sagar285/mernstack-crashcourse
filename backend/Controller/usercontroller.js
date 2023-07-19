const Usermodel = require("../Model/usermodel");
const bcrypt = require("bcryptjs");

// registratrtion api

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).send({ message: "pls filled all your field" });
    }
    const userexist = await Usermodel.findOne({ email: email });
    if (userexist) {
      return res.status(400).send({ message: "email id exist in database" });
    } else {
      const newuser = await Usermodel.create({
        name,
        email,
        password,
      });
      return res.status(200).send({ message: "user registered succesfully" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// login api

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "pls filled all your field" });
    }
    const Userexist = await Usermodel.findOne({ email });
    if (Userexist) {
      const matchpassword = await bcrypt.compare(password, Userexist.password);
      if (matchpassword) {
        const token = await Userexist.generatetoken();
        return res.status(200).send({ token: token });
      }
    }
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};


// profile api
exports.profile =async(req,res)=>{
    try {
        const user = await Usermodel.findById({_id:req.user._id}).select("-password");
        if(!user){
            return res.status(400).send({message:"pls plogin first"});
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}

// profile update api
exports.profileupdate =async(req,res)=>{
    try {
       const {name,email}=req.body;
       const user = await Usermodel.findByIdAndUpdate({_id:req.user._id},{name,email},{new:true}).select("-password");
       if(!user){
        return res.status(400).send({message:"pls plogin first"});
       }
       res.status(200).send(user);
    } catch (error) {
        return res.status(400).send({message:error});
    }
}

// profile delete api

exports.profiledelete=async(req,res)=>{
    try {
      
        const user =await Usermodel.findByIdAndDelete({_id:req.user._id});
        if(!user){
            return res.status(400).send({message:"user does not exist"});
           }
           res.status(200).send({message:"user deleted succesfully"});
    } catch (error) {
        return res.status(400).send({message:error});  
    }
}
