const mysql = require('mysql');

module.exports = function(){
    return mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'bookmall_local',
        password: 'bookmall_local',
        database: 'bookmall_local'
    });
}
