const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const dal = require('../data/mongoDAL');

////////////////////////////////////////////////////////////////////////////

router.get("/login", async (req, res) => {
    let model = {
        loggedInUser: req.session.user
    };

    res.render("login", model);
}) 

router.post("/login", async (req, res) => {
    let username  = req.body.username;
    let password = req.body.password;

    let user = await dal.findUser("Username", username);

    if(await bcrypt.compare(password, user.Password)){
        console.log(`${username} logged in`);

        let user = {
            username: username,
            userId: 1, 
            isAdmin: false
        }

        req.session.user = user;
        res.redirect("/");
    }else{
        let model = {
            error: "Invalid username or password",
            username: username,
            password: password
    }
        console.log(`${username} failed to login`);
        res.render("login", model);
}
})

////////////////////////////////////////////////////////////////////////////

router.get("/logout", async (req, res) => {
    req.session.destroy();
    res.redirect("/");
} )

/////////////////////////////////////////////////////////////////////////

router.get("/register", (req, res) => {
    res.render('register');
}) 

router.post("/register", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let email = req.body.email;
    let age = req.body.age;
    let questions = [
        req.body.question1,
        req.body.question2,
        req.body.question3
    ];

    let hashedPassword = await bcrypt.hash(password, 10);

    if(password == confirmPassword) {
    let result = await dal.addUser(username, hashedPassword, email, age, questions);
    res.redirect("/u/login");
    }else {
    let model = {
        error: "Passwords do not match",
        username: username,
        password: password,
        confirmPassword: confirmPassword
    }
        res.render("register");
    }
}) 

///////////////////////////////////////////////////////////////////////////////

module.exports = router;