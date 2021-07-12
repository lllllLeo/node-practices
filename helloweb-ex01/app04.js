const connect = require('connect');            // 노드는 기본적으로 HTTP 모듈을 가지고 있고, Connect 는 HTTP 모듈에 여러 플러그인(정적 파일, 로깅, 캐싱, 압축 등)을 추가할 수 있는 미들웨어 프레임워크다.
const serveStatic = require('serve-static');   // 특정 경로에 있는 폴더(public 폴더)를 요청에 의해서 바로 파일을 가져올 수 있는 기능을 제공 해주는 모듈
const connectRoute = require('connect-route'); // connect 모듈이 2.0 버전 으로 올라가면서 router 함수가 빠졌음

const port = 8080;
const app = connect();
app.use(serveStatic(__dirname + '/public')); // Y:\douzone\vscode-prejects\node-practices\helloweb-ex01  이 파일을 가지고 있는 경로까지

app.use(connectRoute(function(router){
    router.get('/', function(req, res){
        res.writeHead(200, {
            'Content-Type': "text/html"
        });
        res.end("<h1>main</h1>");
    });
    router.get('/user', function(req, res){
        // console.log(req._parsedUrl.query); // no=12
        req.query = {};
        params = (req._parsedUrl.query || "").split("&"); // queryString을 아무것도 안주면 null로 에러 -> 자스스러운 코드로 고침
        params.forEach(param => {
            tokens = param.split("=");
            req.query[tokens[0]] = tokens[1];
        });
        res.writeHead(200, {
            'Content-Type': "text/html"
        });
        res.end("<h1>user no "+ req.query.no+"</h1>");
    });
    router.get('/guestbook', function(req, res){
        res.writeHead(200, {
            'Content-Type': "text/html"
        });
        res.end("<h1>guestbook list</h1>");
    });
    router.get('/board/:no', function(req, res){
        res.writeHead(200, {
            'Content-Type': "text/html"
        });
        res.end("<h1>board view(" + req.params.no + ")</h1>"); //@PathVariable 값 추출방법
    });
}))
app.listen(port, function(){
    console.log(`HTTP Server running on port ${port}`);
});