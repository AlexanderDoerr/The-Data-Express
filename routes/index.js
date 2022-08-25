const express = require('express');
const router = express.Router();

const dal = require('../data/mongoDAL');

router.get('/', (req, res) => {
    //Make a cookie that will store the last time the user visited the site
    let lastVisit = new Date();
    res.cookie('lastVisit', lastVisit);

    console.log(req.cookies)

    let model = {
        loggedInUser: req.session.user,
        lastVisit: req.cookies.lastVisit
    }

    res.render('home', model);

})

// router.get('/login', (req, res) => {
//     res.render('login');
// })

module.exports = router;

