const express=require("express");
const app=express();
const route =require("./Router/route");
require("./config/db");
const cors =require("cors")
const port =5000;

app.use(express.json());
app.use(cors());
app.use(route);



app.listen(port,()=>{
    console.log(`server listening on port no ${port}`);
})
