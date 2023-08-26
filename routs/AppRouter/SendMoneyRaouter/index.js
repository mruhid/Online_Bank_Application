const express=require('express');
const fs =require('fs');


// ---------------------------connection on database-------------------------------
const conn=require('../../../_db/mysql');
// ------------------------------------------------------------------------


const router=express.Router();

router.get('/sendMoney.html',(req,res)=>{
    res.end(fs.readFileSync('./public/html/sendMoney.html','utf-8'));
})

router.post('/sendmoney',async(req,res)=>{

    console.log(req.body);
    var cardUser=await conn.query(`SELECT *
    FROM users
    INNER JOIN debit_cards
    ON users.id = debit_cards.id
    WHERE card_number='${req.body.CardNumber}' `);
    const card_information=cardUser[0][0];

    let User_Number=card_information.card_number+'';
    fs.writeFileSync('./public/html/textForHtml/sendMoney_txt/sendID.txt',User_Number,'utf-8');
    
    if(card_information==undefined){
        res.end(` <!DOCTYPE html>
        <html lang="en">
        <head>
            <link rel="stylesheet" href="#">
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error!</title>
        </head>
        <body>
            <h1>Please Write again.Because digit card number not exist ! Please try again </h1>
            
            
        </body>
        </html> `);
    }
    else{
    const card_Number=card_information.card_number;

    let numbersArray = card_Number.split(" "); // Boşluk karakteri ile ayırarak diziye al

    let lastFourDigits = numbersArray[numbersArray.length - 1];

    console.log(card_information);


    // ----------------------This information add webPage-------------------------
    let webStr2=` <div class="info-item">
    <label>User Name:</label>
    <span id="userName">${card_information.fulname}</span>
</div>
<div class="info-item">
    <label>Card Number:</label>
    <span id="cardNumber">**** **** **** ${lastFourDigits}</span>
</div>


<h2>Transaction</h2>




<div class="info-item">
<form action="/send" method="post">

    <label for="amount">Amount to Send:</label>
    <input type="number" id="amount" name="amount" placeholder="Enter Amount" step="0.01" min="0">
    

    <button onclick="sendMoney()">Send Money</button>

    </form>
</div>


</div>
<script src="script.js"></script>


</body>
</html>
`;
let webStr1=fs.readFileSync('./public/html/textForHtml/sendMoney_txt/text3.txt','utf-8');

let Str=webStr1+webStr2;


    res.end(Str);
    }

});

router.post('/send',async(req,res)=>{
    const Number=fs.readFileSync('./public/html/textForHtml/sendMoney_txt/sendID.txt','utf-8');
    var cardUser=await conn.query(`SELECT *
    FROM users
    INNER JOIN debit_cards
    ON users.id = debit_cards.id
    WHERE card_number='${Number}' `);
    const card_information=cardUser[0][0];
    console.log(card_information);

    let amountString =card_information.amount;
    let amountInt = parseInt(parseFloat(amountString));

    
if(amountInt>=req.body.amount){

    // ------------------------Change database information----------------------------

    let UserId=fs.readFileSync('./public/html/textForHtml/sendMoney_txt/text1.txt','utf-8');
    let CostumerNumber=fs.readFileSync('./public/html/textForHtml/sendMoney_txt/sendID.txt','utf-8');

    await conn.query(`UPDATE debit_cards
    SET amount = ${amountInt-req.body.amount}
    WHERE id = ${UserId};`); /* Withdraw funds from the user who sent the money */

    await conn.query(`UPDATE debit_cards
    SET amount = amount+${req.body.amount}
    WHERE card_number = '${CostumerNumber}';`); /* increasing the balance of the person receiving the money*/

    // ------------------------------------------------------------------------

    res.end(` <!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" href="#">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Money</title>
    </head>
    <body>
        <h1>The operation is successful!</h1>
        <h3>You can now go to the bank page. For that, click this button</h3>

        <form action="/BankAcount" method="get">
        <button>Click here!</button>
    </form>
        
    </body>
    </html> `);
}
else{
    res.end(` <!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" href="#">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Money</title>
    </head>
    <body>
    
    <h2>There are not enough funds in the balance of this operation. your card balance is $ ${card_information.amount}</h2>
    <form action="/sendmoney" method="get">

    
    </form>
    </body>
    </html>
    `);
}
    console.log(req.body)
});


module.exports=router;