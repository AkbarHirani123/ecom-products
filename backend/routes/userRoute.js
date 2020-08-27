import express from 'express';
import User from '../models/userModel';
import {getToken, isAuth} from '../util';

const router = express.Router();

router.post("/signin", async (req, res) => {

    const sigininUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if(sigininUser) {
        res.send({
            _id: sigininUser._id,
            name: sigininUser.name,
            email: sigininUser.email,
            isAdmin: sigininUser.isAdmin,
            token: getToken(sigininUser),
        })
    } else {
        res.status(401).send({
            message: "Invalid Email or Password."
        })
    }
});

router.put("/:id", isAuth, async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(user) {
        user.name= req.body.name || user.name;
        user.email= req.body.email || user.email;
        user.password= req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: getToken(updatedUser),
        });
    } else {
        res.status(401).send({
            message: "User not found."
        })
    }
});

router.post("/register", async (req, res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const newUser = await user.save();

    if(newUser) {
        res.send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        })
    } else {
        res.status(401).send({
            message: "Invalid User Data."
        })
    }
});

router.get("/createadmin", async (req, res) => {
    try {
        
        const user = new User({
            name: 'Akbar',
            email: 'akbar.hirani.fake@gmail.com',
            password: '1234',
            isAdmin: true
        });

        const newUser = await user.save();
        res.send(newUser);

    } catch (error) {
        res.send({ message: error.message });
    }
});

export default router;