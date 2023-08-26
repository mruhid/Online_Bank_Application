const express =require('express');
const fs=require('fs');

const router=express();

router.get('/BankAcount',(req,res)=>{
    let App_str1=fs.readFileSync('./public/html/textForHtml/BankApp_txt/bankApp1.txt');
    let App_str2=fs.readFileSync('./public/html/textForHtml/BankApp_txt/bankApp2.txt');
    let App=App_str1+App_str2;

    res.end(App);

});

router.get('/bankApp.html',(req,res)=>{
    let App_str1=fs.readFileSync('./public/html/textForHtml/BankApp_txt/bankApp1.txt');
    let App_str2=fs.readFileSync('./public/html/textForHtml/BankApp_txt/bankApp2.txt');
    let App=App_str1+App_str2;

    res.end(App);

});



module.exports=router;