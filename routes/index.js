const express = require('express');
const router = express.Router();

const dal = require('../data/mongoDAL');

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/login', (req, res) => {
    res.render('login');
})

module.exports = router;

