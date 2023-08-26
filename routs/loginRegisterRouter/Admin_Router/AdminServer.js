const express =require('express');
const fs=require('fs');


const router=express();








router.post('/AdminPage',(req,res)=>{
    console.log(req.body);
    let name=fs.readFileSync('./Admin/Username.txt','utf-8');
    let password=fs.readFileSync('./Admin/Pasword.txt','utf-8');
    let Code=fs.readFileSync('./Admin/CODE.txt','utf-8');
      
    if(req.body.Username==name && req.body.password==password){
    res.end('welcome');
    }
    else{
        res.end('Information incorrekt please try again')
    }
})

module.exports=router;