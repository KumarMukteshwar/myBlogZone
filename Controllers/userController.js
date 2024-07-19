const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
// const express = require('express');
const bcrypt = require('bcrypt');
require("dotenv").config();

class UserController {
    static userRegistration = async (req, res) => {
        // write the code for user registration
        const { username, email, password } = req.body;
        try {
            if (username && email && password) {
                const user = await userModel.findOne({ username: username, email: email })
                if (!user) {
                    //  password is hashing
                    const hashedPassword = await bcrypt.hash(password, 5, async (err, hash) => {
                        if (err) {
                            return res.status(500).send({ "msg": "Error hashing password" })
                        } else {
                            const newUser = new userModel({ username, email, password: hash })
                            await newUser.save()
                            return res.status(201).send({ "msg": "User registered successfully" })
                        }
                    })
                } else {
                    return res.status(409).send({ "msg": "User already exists" })
                }
            } else {
                return res.status(400).send({ "msg": "All fields are required" })
            }
        } catch (error) {
            res.status(500).send({ "msg": "something is worng" })
        }
    }
    static userLogin = async (req, res) => {
        // write the code for user login
        const { email, password } = req.body;
        try {
            if (email && password) {
                const user = await userModel.findOne({ email: email })
                if (user) {
                    const match = await bcrypt.compare(password, user.password)
                    if (match) {
                        // generate JWT token
                        const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: '2d' });
                        return res.status(200).send({ "msg": "User logged in successfully", "token": token })
                    } else {
                        return res.status(401).send({ "msg": "Invalid credentials" })
                    }
                } else {
                    return res.status(404).send({ "msg": "User not found" })
                }
            } else {
                return res.status(400).send({ "msg": "All fields are required" })
            }
        }catch(error){
            res.status(404).send({ "msg": "Something wrong please tyry again"});
        }
    }
}

module.exports = UserController;