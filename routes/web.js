import express from "express";
const router = express.Router();
import { body,check,validationResult } from "express-validator";
import customerContoller from "../controllers/CustomerController.js";
import customerModel from "../models/customer.js";
import moment from "moment/moment.js";
import { AgeFromDateString } from "age-calculator";

router.get('/login',customerContoller.loginpage)
router.post('/login',customerContoller.verifyLogin)
router.get('/home',customerContoller.displaydata)
router.get('/add',customerContoller.adddatapage)

router.post('/add',
    body('email','Enter a Valid Email').isEmail().normalizeEmail(),
    body('contact','Contact Number Must be 10 digit valid Number').isLength(10),
    // check('custcode').custom((value, {req, loc, path})=>{
    //     console.log(req.body.custcode);
    //     console.log(customerModel.findOne({where:{custcode:req.body.custcode}}));
    //     return customerModel.findOne({where:{custcode:req.body.custcode}})
        
    //     .then(user=>{
    //         console.log("array is",+user);
    //         // if(!user == NaN){
                
    //         //     return Promise.reject("customer code already exist")
    //         // }
    //         // else{
    //         //     return Promise.resolve();
    //         // }
            
    //     });
    // }),
    body('dob').custom((value,{req,local,path})=>{
        var date = value;
        let agefromstring = new AgeFromDateString(date).age;
        console.log(agefromstring);
        if(agefromstring < 18)
        {
            return Promise.reject("customer is under 18");
        }
        else{
            return Promise.resolve();
        }
    }),
    customerContoller.adddata)

router.get('/edit/:id',customerContoller.editdata)
router.post('/update/:id',customerContoller.updatedata)
router.post('/delete/:id',customerContoller.deletedata)

router.get('/search',customerContoller.searchdata)
export default router;