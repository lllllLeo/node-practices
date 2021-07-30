const models = require('../models')
const { Op } = require("sequelize");

module.exports = {
    create: async function(req, res, next) {
        try {
            const data = await models.Guestbook.create(req.body);
            res.status(200).send({      // default가 200임            
                data: Object.assign(data, {
                    password: ''    // password는 가려야지
                })
            });
        } catch (error) {
            next(error)
        }
    },
    read: async function(req, res, next) {
        console.log(req.query.data);
        console.log(req.query.a);
        console.log(req.body.data);
        console.log(req.body.a);
        console.log(req.body);
        try {
            const no = req.query.no
            let results = await models.Guestbook.findAll({
                order: [
                    ['no', 'DESC']
                ],
                offset: 0,
                limit: 3
                
             });
             if(no > 0) {
                 results = await models.Guestbook.findAll({
                    where: {
                        no: {[Op.lt]: no,
                        }
                    },
                    order: [
                        ['no', 'DESC']
                    ],
                    offset: 0,
                    limit: 3
                    
                 });
             }
            res.status(200).send({
                data: results
            })
        } catch (error) {
            next(error)
        }
    },
    delete: async function(req, res, next) {
        try {
            const no = req.params.no;
            const password = req.body.password;
            const result = await models.Guestbook.destroy({
                where: {
                    no, password
                }
            })
            if(result == false) {
                res.status(200).send({
                    result: 'fail',
                    data: null,
                    message: null
                })
                return;
            }
            res.status(200).send({
                result: 'success',
                data: no,
                message: null
            });
        } catch (error) {
            next(error)
        }
    }    
}