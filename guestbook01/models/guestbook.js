const util = require('util');
const dbconn = require('./dbconn');

module.exports = {
    findAll: async function(){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query('SELECT no, name, password, message, reg_date AS regDate FROM guestbook ORDER BY no DESC', []);
        } catch (error) {
            console.error(error);
        } finally {
            conn.end();
        }
    },
    insert: async function(guestbook){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        // console.log(guestbook);                // { name: 'a', password: 'b', message: 'c' }
        // console.log(Object.values(guestbook)); // [ 'a', 'b', 'c' ]
        try {
            return await query(
                'INSERT INTO guestbook VALUES(null, ?, ?, ?, now())',
                Object.values(guestbook),
            );
        } catch (error) {
            console.error(error);
        } finally {
            conn.end();
        }
    },
    delete: async function(guestbook){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        
        try {
            return await query(
                'DELETE FROM guestbook WHERE no = ? AND password = ?',
                Object.values(guestbook)
                )
        } catch (error) {
            console.error(error);
        } finally {
            conn.end();
        }
    }
}