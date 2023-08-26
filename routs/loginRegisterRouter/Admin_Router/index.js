const express =require('express');
const fs=require('fs');



const router=express();


let admin='admin';

router.get(`/${admin}`,(req,res)=>{
    res.end(fs.readFileSync('./public/html/admin_login.html','utf-8'));

})


module.exports=router;