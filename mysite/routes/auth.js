module.exports = function(role) {
    // const roleAuthorized = role;
    return function(req, res, next){
        console.log("auth() called: " + role);// 'ADMIN'처럼 들어와야 실행됨있어야   클로저   파라미터 없이들어오면 단순히 auth만 돌다 감.

        if(req.session.authUser && 
            (role !== 'ADMIN' || req.session.authUser.role === 'ADMIN')) { // 인증(로그인)은했는데 해당 동작의 role이 'ADMIN'이 아닌 경우
            next();  // 다음 핸들러 controller.update 실행
            return;
        }
        
        if(req.accepts('html')){
            res.redirect(req.session.authUser ? '/' : '/user/login');
            return;
        }

        res.send({
            result: "fail",
            data: null,
            message: "Access Denied"
        })
    }
}