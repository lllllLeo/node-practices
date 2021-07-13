const dbconn = require('./dbconn');
module.exports = {
    findAll: function(){
        const conn = dbconn();
        try {
            let results = null;
            conn.query(
                'SELECT first_name, last_name, email FROM emaillist ORDER BY no', 
                [], 
                function(error, rows, field){
                    results = rows;
                    console.log("sql callback: "  + results);
            });
            return results; // rows
        } catch (error) {
            console.error(error);
        } finally{
            conn.end();
        }
    },
    insert: function(){
        const conn = dbconn();
    }
}