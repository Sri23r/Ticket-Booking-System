const mysql=require('mysql2')

const con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ticketbookingsystem'
})

con.connect((err) => {
    if(err){
        console.error(err);
        return;
    }
    console.log("Mysql Connected "+con.threadId);
})

module.exports=con