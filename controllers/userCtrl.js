const User = require("../models/userModel");
const asyncHandler = require("express-async-handler")
/* Create a user */

const registerAUser = asyncHandler( async (req,res) =>{
    /* Get the email from req.body and find whether a user with this email exist or not */
    const email = req.body.email;
    /*Find the user with this email from req.body */
    const findUser = await User.findOne({ email:email });
    if(!findUser){
        /*Create a user */
        const createUser = await User.create(req.body);
        res.status(200).json(createUser)
    } else {
        throw new Error("User Already Exist");
    }
});



module.exports = { registerAUser };
