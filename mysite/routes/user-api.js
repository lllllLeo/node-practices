const express = require('express');
const auth = require('./auth');
const controller = require('../controllers/user-api');

const router = express.Router();

router.route('/checkemail').get(controller.checkemail);

router.route('/needauth').get(auth, function(req, res){
    res.send({
        result: "success"
    })
});

router.route('/error').get(function(req, res, next){
    try {
        throw new Error('Broken');
    } catch (error) {
        next(error)
    }
    res.send({
        result: "success"
    })
});


module.exports = router;