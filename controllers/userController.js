const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {

    try {
        // console.log("hello");
        const email = req.body.email;
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            console.log(existingUser);
            return res.json({
                success: false,
                message: "user already exists"
            })

        }

        const newUser = new userModel(req.body);

        await newUser.save();

        // console.log(req.body);

        res.status(201).json({
            success: true,
            message: "new user created..",
        })


    } catch (error) {
        console.log(error);
    }





}

const loginController = async (req, res) => {

    try {
        const email = req.body.email;

        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.json({
                message: "User does not exists",
                success: false
            })
        }
        const password = req.body.password;
        //const username = req.body.username;

        if (existingUser.password != password) {
            return res.json({
                message: "Wrong credentials!",
                success: false
            })
        }

        const token = jwt.sign({ id: existingUser._id }, 'secretKey', { expiresIn: '1d' });
        return res.status(200).json({
            message: "login successfully",
            success: true,
            token: token,
            username: existingUser.username,
            id: existingUser._id

        })


        // return res.json({
        //     message: "user logged in successfully....",
        //     success: true
        // })

    } catch (error) {
        console.log(error);
    }

}


const getContactDetails = async (req, res) => {
    const id = req.body.id;
    const data = await userModel.find({ _id: id });
    res.json({
        message: "detailes fetched successfully",
        data: data
    })
}

const myProfile = async (req, res) => {
    const id = req.body.id;
    const data = await userModel.find({ _id: id });
    res.json({
        message: "detailes fetched successfully",
        data: data
    })
}

module.exports = { registerController, loginController, getContactDetails, myProfile };
