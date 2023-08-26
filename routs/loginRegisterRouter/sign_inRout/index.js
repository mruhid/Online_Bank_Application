const express =require('express');
const fs=require('fs');


// ---------------------------connection on database-------------------------------
const conn=require('../../../_db/mysql');
// ------------------------------------------------------------------------



const router=express();


router.get('/register.html', (req, res) => {
    res.end(fs.readFileSync('./public/html/register.html','utf-8'));

});

router.post('/signUp',async(req,res)=>{
    if(req.body.password==req.body.repassword){

        const possibleUsers=await conn.query(`SELECT *
        FROM users
        WHERE fulname = '${req.body.fulname}';`);

        const posibleEmail=await conn.query(`SELECT *
        FROM user_information
        WHERE email = '${req.body.email}';`);

        if(possibleUsers[0].length==0 && posibleEmail[0]==0){

            // ------------------send resgister information on mysql---------------------

            const max=await conn.query(`SELECT max(id) as Maxid
            FROM user_information`);
            let maxID=max[0][0].Maxid;
            console.log(maxID);


            await conn.query(`INSERT INTO user_information (id, username, userpassword, email) 
            VALUES ( ${maxID+1},'${req.body.username}', '${req.body.password}', '${req.body.email}');`);

            await conn.query(`INSERT INTO users (id,fulname) 
            VALUES (${maxID+1},'${req.body.fulname}');`);

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
                <p>Welcome,${req.body.fulname}!</p>
                <span>we are pleasure you see again!</span>
            </div>
            <div class="rigth-icon">
                <a href=""><i class='bx bx-question-mark'></i></a>
                <a href=""><i class='bx bxs-low-vision' ></i></a>
                <a href=""><i class='bx bx-bell' ></i></a>
            </div>
        </nav>`;

        fs.writeFileSync('./public/html/textForHtml/BankApp_txt/bankApp1.txt',str,'utf-8');
    console.log(req.body);
    res.end(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>******</title>
    </head>
    <body>
        <h1>welcome ${req.body.fulname} to Bankwebsite! thanks for join Us.Please click this button </h1>
        <form action="/BankAcount">
            <button>Click for next</button>
        </form>
    </body>
    </html>`);
        }
        else{
            res.end(fs.readFileSync('./public/html/haserrorRegister.html','utf-8'));
        }
    }
    else{
        res.end(` <!DOCTYPE html>
        <html lang="en">
        <head>
            <link rel="stylesheet" href="#">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error!</title>
        </head>
        <body>
            <h1>Please Write again.Because password and confirm pasword information not equal!</h1>
            <a href="./register.html"><h3>If you want TRY again ,please click hear</h3></a>
            
        </body>
        </html> `);
    }
}
);


module.exports = router;