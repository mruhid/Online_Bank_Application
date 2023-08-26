const express =require('express');
const fs=require('fs');
const path=require('path');



const app=express();

app.use(express.static(path.join(__dirname,'./public')));


app.use(express.json());
app.use(express.urlencoded({extended:true}));

// ---------------------------Import router---------------------------------
const registerRouter =require('./routs/loginRegisterRouter/sign_inRout/index.js');
const AppRouter =require('./routs/AppRouter/bankAppRouter/index.js');
const adminlogin =require('./routs/loginRegisterRouter/Admin_Router/index.js');
const AdminPage =require('./routs/loginRegisterRouter/Admin_Router/AdminServer.js');
const loginRouter=require('./routs/loginRegisterRouter/signUp_rout/index.js');
const sendMoney=require('./routs/AppRouter/SendMoneyRaouter/index.js');


app.use(registerRouter);
app.use(AppRouter);
app.use(adminlogin);
app.use(AdminPage);
app.use(loginRouter);
app.use(sendMoney);
// --------------------------------------------------------------------------
app.get('/',(req,res)=>{
    res.end(fs.readFileSync('./public/html/index.html','utf-8'));
})


app.listen(1000,'0.0.0.0',()=>{
    console.log('server has started!');
})