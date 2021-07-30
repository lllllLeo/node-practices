// require()은 동기방식이기떄문에 중간에 놔두면 문제생길수잇음. 초기화작업이니까 맨앞에 ㄱㄱ
const express = require('express'); 
const session = require('express-session'); 
const http = require('http');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');

// Environment Variables
dotenv.config({path: path.join(__dirname, 'config/app.env')});
dotenv.config({path: path.join(__dirname, 'config/db.env')});

const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');
const guestbookRouter = require('./routes/guestbook');
const galleryRouter = require('./routes/gallery');
const userApiRouter = require('./routes/user-api');
const guestApiRouter = require('./routes/guestbook-api');
const errorRoute = require('./routes/error');
const adminRouter = require('./routes/admin');
const boardRouter = require('./routes/board');


// Logging
const logger = require('./logging');






// Application Setup
const application = express()
    // 1. session environment
    .use(session({
        secret: 'mysite-session', // 쿠키 변조를 방지하기 위한 값
        resave: false,                 // 요청 처리에서 세션의 변경 사항이 없어도 항상 저장 / req.session.authUser = user;
        saveUninitialized: false,   // 새로 세션을 생성할 때 "uninitialized" 상태로 둔다. 따라서 로그인 세션에서는 false로 하는 것이 좋다.
    }))
    // 2. request body parser
    // qs, query-string module ->    https://sjh836.tistory.com/154
    // true 를 하면 qs 모듈을 사용하고, false 면 query-string 모듈을 사용한다. 이 두 모듈간의 차이에서 중첩객체 파싱여부가 갈린다
    .use(express.urlencoded({extended: true}))  // application/x-www-form-urlencoded   /   true 는 qs 라이브러리쓰고 false는          password=1234 로 들어오면 얘가 파싱해주고
    .use(express.json())                        // application/json                                                                  { password: '1234' 로 들어오면 얘가 파싱해줌 }

    // 3. multipart
    .use(multer({
        dest: path.join(__dirname, process.env.MULTER_TEMPORARY_STORE) //temporary 위치
    }).single('file')) //form data의 type / single 1개 multi 여러개

    // 4. static serve  
    .use(express.static(path.join(__dirname, process.env.STATIC_RESOURCES_DIRECTORY)))
    
    // 5. view engine setup
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    // 6. request router
    

    // res.locals의 프로퍼티들은 request의 라이프 타임 동안에만 유효하다. html/view 클라이언트 사이드로 변수들을 보낼 수 있으며, 그 변수들은 오로지 거기서만 사용할 수 있다.
    .all('*', function(req, res, next){ // all()은 GET POST DELETE 같은 HTTP method / 모든 method, URL 요청을 받음
        res.locals.req = req;           // request에 저장하면 template에서도 reqeuest를 사용하기 위해서 함
        res.locals.res = res;           // request에 저장하면 template에서도 response 사용하기 위해서 함  ex) Servlet 의 request와 JSP의 request처럼 같게 하기 위해
        next();                         // routes callback이 2개 이상 걸려있으면 next()를 써야함  .use('/', function)
    })
    .use('/', mainRouter) // 미들웨어를 등록
    .use('/user', userRouter) 
    .use('/guestbook', guestbookRouter) 
    .use('/gallery', galleryRouter) 
    .use('/admin', adminRouter)
    .use('/board', boardRouter) 
    // .use('/admin', auth('ADMIN'), adminRouter)  // 한 번에 auth 다 걸기

    .use('/api/user', userApiRouter) 
    .use('/api/guestbook', guestApiRouter) 
    .use(errorRoute.error404)
    .use(errorRoute.error500)
    

// Server Setup
http.createServer(application)
    .on('listening', function(){
        logger.info(`HTTP Server running on port ${process.env.PORT}`);
    })
    .on('error',function(error){
        if(error.syscall != 'listen') {
            throw error;
        }
        switch (error.code) {
            case 'EACCESS': 
                logger.error(`Port ${process.env.PORT} requires privileges`);
                process.exit(1);  // 0 생략할 경우 성공으로 인식하고 종료
                break;
            case 'EADDRINUSE':
                logger.error(`Port ${process.env.PORT} is already in use`);
                process.exit(1); // 실패 라고 인식하고 종료
                break;
            default:
                throw error;
        }
    })
    .listen(process.env.PORT);