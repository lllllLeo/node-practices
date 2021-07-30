const model = require('../models/guestbook')

module.exports = {
    index: async function(req, res) {
        const results = await model.findAll();
        res.render('index', {
            list: results || ""
        });
    },
    add: async function(req, res) {
        const results = await model.insert(req.body);
        res.redirect('/');
    },
    deleteForm: function(req, res){
        res.render('deleteform', {
            no: req.params.no
        });
    },
    delete: async function(req, res){
        const guestbook = {
            no: req.params.no,
            password: req.body.password
        }
        const results = await model.delete(guestbook);
        res.redirect('/');
    }
}