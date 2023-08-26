const mysql =require('mysql2/promise');




const conn=mysql.createPool({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'20032003',
    database:'bank_db',
    waitForConnections:true,
    connectionLimit:10,
    maxIdle:10,
    idleTimeout:60000


});
module.exports=conn;
