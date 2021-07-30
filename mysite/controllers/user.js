const models = require('../models') // derectory로 설정해놓으면 index.js파일을 선택해서 가져온다
const logger = require('../logging')
module.exports = {
    joinsuccess: function(req, res) {
        res.render('user/joinsuccess');
    },
    join: function(req, res) {
        res.render('user/join')
    },
    _join: async function(req, res, next) {
        // models/User.js User객체에 정의된 이름으로 다뤄야함

        try {
            const results = await models.User.create({ 
                name: req.body.name, 
                email: req.body.email, 
                password: req.body.password, 
                gender: req.body.gender
             }); 
            res.redirect('/user/joinsuccess');
        } catch (error) {
            next(error);
        }
    },
    login: function(req, res, next) {
        try {
            res.render('user/login');
        } catch (error) {
            next(error);
        }
    },
    _login: async function(req, res, next){

        try {
            const user = await models.User.findOne({ //Json     findOne 은 쿼리에 LIMIT 1 임
                                attributes: ['no','name','role'],
                                where: {
                                    email: req.body.email,
                                    password: req.body.password
                                }
                            });
            if(user == null) {
                /* res.render('user/loginform', {
                    email: req.body.email,
                    result: 'fail'
                }); */
                res.render('user/login', Object.assign(req.body, { 
                    result: 'fail',
                    password: '' // 이건 password는 리셋하는거
                })); // 위처럼하면 계속 추가해야하는데 이거는 큰거만들때  Object.assign => 객체병함 / req.body 객체에 다음 객체를 추가/매핑해줌
                return;
            }
            // 로그인 세션 처리
            req.session.authUser = user;
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    },
    logout: async function(req, res){
        await req.session.destroy();
        res.redirect('/');
    },
    update: async function(req, res, next) {
        try {
            const user =  await models.User.findOne({
                attributes: [ 'no', 'name', 'email', 'gender' ],
                where: {
                    no: req.session.authUser.no
                }
            });
            res.render('user/update', {
                user: user || ''
            });        
        } catch (error) {
            next(error);
        }
    },
    _update: async function(req, res, next){
        try {
            const updateObject = Object.assign(req.body);
            if(updateObject['password'] == '') {
                delete updateObject['password'];
            }

            // const {name, password, email} = req.body; // 자동으로 들어감

            // const {password, ...o} = req.body;  // password빼고 객체로 만들어줌
            // 아래처럼 됨
            // password = req.body.password; 
            // o = {
            //  name: req.body.name,
            //  email: req.body.email
            // }

            // const {[req.body.password] == '' ? 'password': remove, ... updateObject}

            const user = await models.User.update(
                updateObject,
                {
                where: {
                    no: req.session.authUser.no
                }
            });
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }
}