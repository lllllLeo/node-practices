const util = require('util');
const dbconn = require('./dbconn');

/*

conn.query(sql, (params) function(err, rows, fields){   -> 두번째 인자에 배열로 도니 값 (params)을 넣어줄 숭 ㅣㅆ다. 생략가능
    rows 는 배열/행
    fields 는 컬럼
})

*/

module.exports = {
    findAll: async function(){
        const conn = dbconn();
        // const query = (sql, data) => 
        //     new Promise((resolve, reject) => 
        //         conn.query(sql, data, (error, rows, field) => 
        //                 error ? reject(error) : resolve(rows)
        //         )
        //     );

        // bind()로 호출하면 this가 엉망이되지 않는다
        const query = util.promisify(conn.query).bind(conn); //  util.promisify node에서 지원함 다른데서 할려면 만들던가 
        
        try {
            return await query('SELECT first_name AS firstName, last_name AS lastName, email FROM emaillist ORDER BY no DESC', []); // resolve data가 return됨   await async하면 return가능
        } catch (error) {
            console.error(error);
        } finally{
            conn.end();
        }
    },
    insert: async function(emaillist){
        // INSERT 문이 실행됐을 때, 삽입된 데이터의 id를 얻는 방법 result.insertId
        console.log(emaillist); 
        console.log(Object.values(emaillist)); // -> Object.values() 객체가 가지는 (열거 가능한) 속성의 값들로 이루어진 배열을 리턴해주는데 for in 구문등으로 반복한 결과와 동일 (참고로 for in 구문순서를 보장해주지 않음)
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn); //  util.promisify node에서 지원함 다른데서 할려면 만들던가 
        try {
            return await query(
                'INSERT INTO emaillist VALUES(null, ?, ?, ?)',
                // [emaillist.fn, emaillist.ln, emaillist.email]
                Object.values(emaillist),
                ); // resolve data가 return됨   await async하면 return가능
        } catch (error) {
            console.error(error);
        } finally{
            conn.end();
        }
    }
}