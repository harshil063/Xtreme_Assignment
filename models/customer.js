import mongoose from "mongoose";


//Defining Schema
const customerSchema = new mongoose.Schema({
    _id: {type:String},
    name:{type:String, required:true},
    email:{type:String, required:true},
    dob:{type:Date, required:true},
    email:{type:String, required:true},
    contact:{type:Number, required:true},   
    
})
const customerModel = mongoose.model('customer',customerSchema);
export default customerModel;