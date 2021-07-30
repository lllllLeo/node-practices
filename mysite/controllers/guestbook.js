const models = require('../models');
const moment = require('moment');

module.exports = {
    list: async function(req, res, next) {
        try {
            const results = await models.Guestbook.findAll({
                order: [
                    ['no', 'DESC']
                ]
            });
            res.render('guestbook/list', {
                data: results,
                moment: moment
            });
        } catch (error) {
            next(error);
        }
    },
    add: async function(req,res, next) {
        try {
            await models.Guestbook.create(req.body)
        } catch (error) {
            next(error);            
        }
        
        res.redirect('/guestbook')
    },
    delete: function(req, res){
        res.render('guestbook/delete', {
            no: req.params.no
        });
    },
    _delete: async function(req,res, next){
        const result = await models.Guestbook.destroy({
            where: {
                no: req.params.no,
                password: req.body.password
            }
        });
        if(result == false) {
            res.render('guestbook/delete', {
                no: req.params.no
            });
            return;
        }
        res.redirect('/guestbook');
    },
    spa: function(req, res, next) {
        res.render('guestbook/spa');
    }
}