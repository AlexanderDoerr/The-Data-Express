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

    var newLogin = await dal.findUser("Username", username);


    if(newLogin && await bcrypt.compare(password, newLogin.Password)){
        console.log(`${username} logged in`);

        let user = {
            username: username,
            userId: newLogin._id, 
            isAdmin: false
        }

        req.session.user = user;
        res.redirect("profile");
    }else{
        // Invalid Login!
        let model = {
            ErrorMessage: "Invalid Login!",
            username: username,
            password: password
        };
        console.log("Invalid login!");
        res.render("login", model);
    }
})

////////////////////////////////////////////////////////////////////////////

router.get("/logout", async (req, res) => {
    req.session.destroy();
    res.redirect("/");
} )

////////////////////////////////////////////////////////////////////////////

router.get("/profile", async (req, res) => {
    let model = {
        loggedInUser: req.session.user
    };

    res.render("profile", model);
}
)

router.post("/profile", async (req, res) => {
    let findKey = req.body.findKey;
    let findValue = req.body.findValue;
    let updateValue = req.body.updateValue;

    if(findKey == "Password" && updateValue != ""){
        updateValue = await bcrypt.hash(findValue, 10);
    }

    if(updateKey != ""){
        console.log(`findKey: ${findKey}, findValue: ${findValue}, updateKey: ${updateKey}`);
        var results = await dal.updateUser(findKey, findValue, updateValue);
        res.redirect("/home");

    }else{
        let model = {
            ErrorMessage: "Invalid Update!",
            findKey: findKey,
            findValue: findValue,
            updateKey: updateKey
        };
        console.log("Invalid update!");
        res.render("profile", model);
    }
})


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
        res.render("register", model);
    }
}) 

///////////////////////////////////////////////////////////////////////////////


module.exports = router;