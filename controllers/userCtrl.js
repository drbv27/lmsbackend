const { gernerateToken } = require("../config/jwtToken");
const validateMongodbId = require("../config/validateMongoDbId");
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
        res.status(200).json({
            status:true,
            message:"User created sucessfully!!!",
            createUser
        })
    } else {
        throw new Error("User Already Exist");
    }
});

/* login a user */

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    /* check if user exist or not */
    const findUser = await User.findOne({ email: email });
    if(findUser && (await findUser.isPasswordMatched(password))) {
        res.status(200).json({
            status: true,
            message: "Logged In Sucessfully!!!",
            token:gernerateToken(findUser?._id),
            role: findUser?.roles,
            username: findUser?.firstname + " " + findUser?.lastname,
            user_image: findUser?.userimage,
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

/* Get all user */
const getAllUsers = asyncHandler(async (req, res) =>{
    try {
        const allUsers = await User.find();
        res
            .status(200)
            .json({ status: true, message:"All users fetched succesfully", allUsers});
    } catch (error) {
        throw new Error(error);
    }
})

/* update a user profile*/
const updateUser = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    validateMongodbId(_id);
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new:true});
        res.status(200).json({status:true, message:"Profile updated successfully!", user})
    } catch (error) {
        throw new Error(error)
    }
});

/* Delete a user*/
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res
            .status(200)
            .json({status:true, message:"User Deleted successfully!"})
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = { registerAUser, loginUser, getAllUsers, updateUser, deleteUser };
