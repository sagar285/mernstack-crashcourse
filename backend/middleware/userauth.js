const jwt=require("jsonwebtoken");

exports.loginauthentication =async(req,res,next)=>{
  try {
    const userauth = jwt.verify(req.headers.authorization,"djkjdjdjfjdfhdjfduereuiureieu");
    req.user=userauth;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
}