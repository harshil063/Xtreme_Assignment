import customerModel from "../models/customer.js";
import { Date } from "mongoose";
import { body,param,validationResult } from "express-validator";
import alert from "alert";
class custoemrController{
    static loginpage = (req,res)=>{
        res.render("login");
    }


    static verifyLogin = async(req,res)=>{
        try{    
            if(req.body.username == "admin" && req.body.password == "admin")
            {
                console.log("login success");
                res.redirect("/customer/home");
            }
            else{
            //     var loginerr = [];
            // loginerr.push("Customer code should be unique");
                console.log("invalid username or password");
                res.render("login");
            }
        }catch(error){
            console.log(error);
        }
    }

    static displaydata = async(req,res)=>{
        try{
            const result = await customerModel.find()
            res.render("home",{data:result})
        }catch(error){
            console.log(error);
        }
    }

    static adddatapage = async(req,res)=>{
        try{
            var arr = [];
            res.render("add",{err:arr})
        }catch(error){
            console.log(error);
        }
    }

    static adddata = async(req,res)=>{
        try{
            const errors = validationResult(req);
            var arr = [];
            if(!errors.isEmpty()){
                const result = errors.mapped();
                
                if(result.email){
                    console.log("email error");
                    arr.push(result.email.msg);
                }
                if(result.contact){
                    console.log("contact error");
                    arr.push(result.contact.msg);
                }
                if(result.custcode){
                    console.log("customer code error");
                    arr.push(result.custcode.msg);
                }
                if(result.dob){
                    console.log("dob error ocured");
                    arr.push(result.dob.msg)
                }

                res.render('add',{err:arr});
                
            }else{
                const doc = new customerModel({
                    _id:req.body.custcode,
                    name:req.body.name,
                    dob:req.body.dob,
                    email:req.body.email,
                    contact:req.body.contact
                })
                await doc.save();
                res.redirect("home");
            }
            
            // const email = req.body.email;

            // const contact = req.body.contact;
            // if(contact.length != 10){
            //     var contacterr = "Mobile Number should be 10 digit";
            //     console.log(contacterr);
            //     res.redirect("add",{contacterr})
            // }

            // const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            // if(!emailRegexp.test(email)){
            //     var emailerr= "Please Enter a valid email";
            //     res.redirect("add",{emailerr})
            // }

            // const custcode = await customerModel.findOne({custcode:req.body.custcode})
            // if(custcode != null){
            //     var custcodeerr = "customer already exists";
            //     console.log(custcodeerr);
            //     res.redirect("add",{'custcodeerr':custcodeerr})
            // }
            // await doc.save();
            // res.redirect("home");
            // else{
            //     await doc.save();
            // }
            // console.log(req.body.dob);
            // if(contacterr || emailerr || custcodeerr ){
            //     res.redirect("add",{contacterr,emailerr,custcodeerr})
            // }else{
            //     await doc.save();
            //     res.redirect("home");
            // }    
            // const d1 = new Date(req.body.dob);
            // const year = d1.getFullYear();
            // console.log(year);
            
        }catch(error){
            // var custcodeerr = [];
            arr.push("Customer code should be unique");
            res.render("add",{err:arr});
            // res.status(500).json({
            //     name: error.name,
            //     message: error.message
            // });
            console.log(error);
        }
    }

    static editdata = async(req,res)=>{
        try{
            const result = await customerModel.findById(req.params.id)
           
            res.render("edit",{data:result})
        }catch(error){
            console.log(error);
        }
    }

    static updatedata = async(req,res)=>{
        try{
            const result = await customerModel.findByIdAndUpdate(req.params.id,req.body)
            res.redirect("/customer/home")
        }catch(error){
            console.log(error);
        }
    }
    static deletedata = async(req,res)=>{
        try{
            const result = await customerModel.findByIdAndDelete(req.params.id);
            res.redirect("/customer/home")
        }catch(error){
            console.log(error);
        }
    }

    static searchdata = async(req,res)=>{
        try{
            let data = await customerModel.find({
                "$or":[
                    {custcode:req.query.search},
                    {name:req.query.search},
                    // {custcode:{$regex:req.params.key}},
                    // {name:{$regex:req.params.key}}
                ]
            })
            res.render("home",{data})
        }catch(error){
            console.log(error);
        }
    }
}

export default custoemrController;