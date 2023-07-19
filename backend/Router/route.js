const { register,login,profile,profileupdate,profiledelete} = require("../Controller/usercontroller");
const { loginauthentication } = require("../middleware/userauth");

const route=require("express").Router();



route.get("/",(req,res)=>{
    res.send("request send properly");
})
route.post("/register",register);
route.post("/login",login);
route.get("/profile",loginauthentication,profile)

route.put("/profile/update",loginauthentication,profileupdate)
route.delete("/profile/delete",loginauthentication,profiledelete)


// post route to send data into database
// get request to get data from database
// put request to update data in database
// delete request to delete data from database


module.exports =route;