const connect = require('connect');
const serveStatic = require('serve-static');


const port = 8080;
const app = connect();
app.use(serveStatic(__dirname + '/public'));
app.listen(port, function(){
    console.log(`HTTP Server running on port ${port}`);
});