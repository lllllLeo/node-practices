// require()은 동기방식이기떄문에 중간에 놔두면 문제생길수잇음. 초기화작업이니까 맨앞에 ㄱㄱ
const http = require('http');
const path = require('path');
const express = require('express'); 

const guestbookRouter = require('./routes/guestbook');
const port = 8080; 

// Application Setup
const application = express()
    // 1. static serve  
    .use(express.static(path.join(__dirname + "public")))
    // 2. request body parser

    // https://sjh836.tistory.com/154
    // true 를 하면 qs 모듈을 사용하고, false 면 query-string 모듈을 사용한다. 이 두 모듈간의 차이에서 중첩객체 파싱여부가 갈린다
    .use(express.urlencoded({extended: true}))  // application/x-www-form-urlencoded   /   true 는 qs 라이브러리쓰고 false는 
    .use(express.json())                        // application/json
    // 3. view engine setup
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    // 4. request router
    .all('*', function(req, res, next){ // all()은 GET POST DELETE 같은 HTTP method / 모든 URL 요청을 받음
        res.locals.req = req;           // request에 저장하면 template에서도 reqeuest를 사용하기 위해서 함
        res.locals.res = res;           // request에 저장하면 template에서도 response 사용하기 위해서 함  ex) Servlet 의 request와 JSP의 request처럼 같게 하기 위해
        next();                         // routes callback이 2개 이상 걸려있으면 next()를 써야함  .use('/', function)
    })
    .use('/', guestbookRouter); // 미들웨어를 등록
    

    /* .use('/', function(req, res, next) {
        next()
    }) */


// Server Setup
http.createServer(application)
    .on('listening', function(){
        console.info(`HTTP Server running on port ${port}`);
    })
    .on('error',function(error){
        if(error.syscall != 'listen') {
            throw error;
        }
        switch (error.code) {
            case 'EACCESS': 
                console.error(`Port ${port} requires privileges`);
                process.exit(1);  // 0 생략할 경우 성공으로 인식하고 종료
                break;
            case 'EADDRINUSE':
                console.error(`Port ${port} is already in use`);
                process.exit(1); // 실패 라고 인식하고 종료
                break;
            default:
                throw error;
        }
    })
    .listen(port);