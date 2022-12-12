import express  from "express";
import connectDB from "./db/connectdb.js";
import {join} from 'path';
import web from "./routes/web.js";
import bodyParser from "body-parser";

const app=express()
const port = process.env.port || '3000'
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";

connectDB(DATABASE_URL)

// for parsing application/json
app.use(bodyParser.json()); 


// static files
app.use(express.static(join(process.cwd(),"public")))

//set template engine
app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));
app.use("/customer",web);


app.listen(port,()=>{
    console.log(`server listening at port : ${port}`);
})