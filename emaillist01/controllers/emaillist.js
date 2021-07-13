const model = require('../models/emaillist');

module.exports = {
    index: function(req, res){
        const results = model.findAll();
        console.log(results);
        res.render('index');
    },
    form: function(req, res){
        res.render('form');
    },
    add: function(req, res){
        console.log(req.body);
        res.redirect('/');
    }
}