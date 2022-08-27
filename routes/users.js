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

    var userLogin = await dal.findUser("Username", username);

    if(userLogin && await bcrypt.compare(password, userLogin.Password)){
        console.log(`${username} logged in`);

        let user = {
            username: username,
            userId: userLogin._id, 
            isAdmin: userLogin.Admin
        }

        req.session.user = user;
        res.redirect("/u/profile");
    }else{
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
    req.session.user = null;
    res.redirect("/");
} )

////////////////////////////////////////////////////////////////////////////

router.get("/profile", async (req, res) => {
    let userInfo = await dal.findUser('Username', req.session.user.username);  
    console.log(req.session.user.username);  

    let model = {
        loggedInUser: req.session.user,
        Username: userInfo.Username,
        Email: userInfo.Email,
        Age: userInfo.Age,
        Password: userInfo.Password,
        ConfirmPassword: userInfo.Password,
        question1: userInfo.questions[0],
        question2: userInfo.questions[1],
        question3: userInfo.questions[2],
        isAdmin: userInfo.Admin
    };

    console.log(`This is the ID on the Profile.get : ${model.loggedInUser.userId}`);

    res.render("profile", model);
}
)

router.post("/profile", async (req, res) => {

    const updateTheUser = async (infoToUpdate) => {
        if(infoToUpdate.Username != '' && infoToUpdate.Password != '' && infoToUpdate.Email != '' && infoToUpdate.Age != ''){
            await dal.updateUser(req.session.user.userId, infoToUpdate);
            console.log('Successfully updated user');
            res.redirect("/u/profile");
        }else{
            let model = {
                ErrorMessage: "Please fill out all fields!",
                Username: req.body.username,
                Password: req.body.password,
                ConfirmPassword: req.body.confirmPassword,
                Email: req.body.email,
                Age: req.body.age,
                question1: req.body.question1,
                question2: req.body.question2,
                question3: req.body.question3,
            };
            res.render("profile", model);
        }
    };
    
    let userInfo = await dal.findUser('Username', req.session.user.username);

    let updateInfo = {
        Username: req.body.username,
        Password: req.body.password,
        Email: req.body.email,
        Age: req.body.age,
        questions: [
            req.body.question1,
            req.body.question2,
            req.body.question3
        ]
    };

    if(req.body.password != userInfo.Password && req.body.password == req.body.confirmPassword)
    {
        console.log('This hit the first if statement in the profile password get');
        updateInfo.Password = await bcrypt.hash(req.body.password, 10);
        updateTheUser(updateInfo);

    } else if(req.body.password && req.body.confirmPassword == userInfo.Password)
    {
        console.log('This hit the second if statement in the profile password get');
        updateInfo.Password = userInfo.Password;
        updateTheUser(updateInfo);

    }else 
    {
        console.log('This hit the final else statement in the profile password get');
        model = {
            ErrorMessage: "Passwords do not match!",
        };
        res.render("profile", model);
    }
    
})

/////////////////////////////////////////////////////////////////////////

router.get("/register", (req, res) => {
    let model = {
        loggedInUser: req.session.user
    };

    res.render("register", model); 
}) 

router.post("/register", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    let email = req.body.email;
    let age = req.body.age;
    let admin = false;
    let questions = [
        req.body.question1,
        req.body.question2,
        req.body.question3
    ];

    let hashedPassword = await bcrypt.hash(password, 10);

    if(password == confirmPassword && password != "" && username != "" && email != "" && age != "" && questions[0] != undefined && questions[1] != undefined && questions[2] != undefined){
    let result = await dal.addUser(username, hashedPassword, email, age, admin, questions);
    res.redirect("/u/login");
    }else {
    let model = {
        ErrorMessage: "Please Fill out the form completely!",
        username: username,
        password: password,
        confirmPassword: confirmPassword
    }
        res.render("register", model);
    }
}) 

///////////////////////////////////////////////////////////////////////////////

router.get("/admin", async (req, res) => {
    let model = {
        loggedInUser: req.session.user
    };

    res.render("admin", model);
})

router.post("/admin", async (req, res) => {
    let username = req.body.findUsername;
    let selection = req.body.selection;
    console.log(selection);

    if(selection == "delete" && username != ""){
        await dal.deleteUser(username);
        console.log(`Deleted user ${username}`);
        res.redirect("admin");
    }else if(selection == "changeAdmin" && username != ""){
        await dal.updateUserAdmin(username, {Admin: true});
        console.log(`Made user ${username} an Admin`);
        res.redirect("admin");
    } else {
        let model = {
            ErrorMessage: "Username not found",
            username: username
        }
        res.render("admin", model);
    }
})


module.exports = router;