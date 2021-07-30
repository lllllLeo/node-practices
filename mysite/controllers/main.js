const model = require('../models/main');
const path = require('path')

module.exports = {
    index: function(req, res) {
        console.log(path.join(__dirname, 'views'))
        res.render('main/index');
    }
}