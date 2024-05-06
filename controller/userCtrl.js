const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

const createUser = asyncHandler(async (req, res) => {

    const email = req.body.email;

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
        const newUser = await User.create(req.body);
        res.json(newUser)
    }
    else {
        throw new Error("User Already Exists")
    }

})

const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password)
    const findUser = await User.findOne({ email })

    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            email: findUser?.email,
            token: generateToken(findUser?._id)
        })
    }
    else {
        throw new Error("Invalid Credentials")
    }

})

const getAllUsers = asyncHandler(async (req, res) => {
    try {

        const getUsers = await User.find();
        res.json(getUsers)
    }
    catch (error) {
        throw new Error("Error", error)
    }

})

const getUser = asyncHandler(async (req, res) => {

    const { id } = req.params;
    try {
        const getUser = await User.findById(id)
        res.json({
            success: true,
            getUser,
        })
    }
    catch (error) {
        console.log("Error", error)
    }
    console.log(id)
})
const deleteUser = asyncHandler(async (req, res) => {

    const { id } = req.params;
    try {
        const getUser = await User.findByIdAndDelete(id)
        res.json({
            success: true,
            getUser,
        })
    }
    catch (error) {
        console.log("Error", error)
    }
    console.log(id)
})

const updateUser = asyncHandler(async (req, res) => {
    console.log("req user", req.user)
    const { _id } = req.user;
    try {
        const updateUser = await User.findByIdAndUpdate(_id, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            mobile: req.body.mobile,

        },
            { new: true }

        ).select("-password")

        res.json(updateUser)
    }
    catch (error) {
        throw new Error("Update user Error", error)
    }

});


const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const block = await User.findByIdAndUpdate(id,
            {
                isBlocked: true
            },
            {
                new: true
            }
        )
        res.json({
            message: "User blocked"
        })
    }
    catch (error) {
        throw new Error(error)
    }
})
const unBlockUser = asyncHandler(async (req, res) => {

    const { id } = req.params;
    try {
        const unBlock = await User.findByIdAndUpdate(id,
            {
                isBlocked: false
            },
            {
                new: true
            }
        )
        res.json({
            message: "User Unblocked"
        })
    }
    catch (error) {
        throw new Error(error)
    }

})

module.exports = { createUser, blockUser, unBlockUser, loginUserCtrl, getAllUsers, getUser, deleteUser, updateUser };