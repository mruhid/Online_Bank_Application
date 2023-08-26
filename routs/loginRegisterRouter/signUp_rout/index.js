const express =require('express');
const fs=require('fs');



// ---------------------------connection on database-------------------------------
const conn=require('../../../_db/mysql');
// ------------------------------------------------------------------------

const router=express.Router();


router.post('/login', async(req, res) => {
    const[rows]=await conn.query(`select*from user_information where email='${req.body.useremail}' and userpassword='${req.body.userpassword}'`);
    
    console.log(req.body);
    console.log(rows);

    if(rows.length==0){
    res.end('try again');
    }
    else{
        const fulname=await conn.query(`SELECT *
        FROM users
        INNER JOIN user_information
        ON users.id = user_information.id
        WHERE users.id = ${rows[0].id};`);
        let Strid=fulname[0][0].id+'';
        fs.writeFileSync('./public/html/textForHtml/sendMoney_txt/text1.txt',Strid,'utf-8');
        // ----------------------------------Fulname show at bankapp page-------------------------
        let str=`<!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">
        <link rel="stylesheet" href="../css/bankApp.css">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <nav class="head">
            <div class="left-icon">
                <i class='bx bxs-user-circle'></i>
                <p>Welcome,${fulname[0][0].fulname}!</p>
                <span>we are pleasure you see again!</span>
            </div>
            <div class="rigth-icon">
                <a href=""><i class='bx bx-question-mark'></i></a>
                <a href=""><i class='bx bxs-low-vision' ></i></a>
                <a href=""><i class='bx bx-bell' ></i></a>
            </div>
        </nav>`;

        fs.writeFileSync('./public/html/textForHtml/BankApp_txt/bankApp1.txt',str,'utf-8');

        let App_str1=fs.readFileSync('./public/html/textForHtml/BankApp_txt/bankApp1.txt');
        let App_str2=fs.readFileSync('./public/html/textForHtml/BankApp_txt/bankApp2.txt');
        let App=App_str1+App_str2;

         res.end(App);


    }
});




module.exports = router;