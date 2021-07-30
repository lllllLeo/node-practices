const logger = require('../logging');
module.exports = {
    error404: function(req, res) {  // 정의되어있지 않은 URL일 경우
        if(req.accepts('html')){
            res.status(400).render('error/404')
            return;
        }

        res.status(404).send({
            result: 'fail',
            data: null,
            message: 'Unknown Request'
        });
    },
    error500: function(err, req, res, next){
        // 로깅처리
        logger.error(err.stack);

        // 사과페이지
        if(req.accepts('html')){
            res.status(500).send(`<pre>${err.stack}</pre>`);
            return;
        }

        res.status(500).send({
            result: 'fail',
            data: null,
            message: err.stack
        })
    }
}