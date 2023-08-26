const formOpenBtn=document.querySelector('#formopen'),
 home=document.querySelector('.home'),
 formContainer=document.querySelector('.form-container'),
 formCloseBtn=document.querySelector('.bx-message-square-x'),
 pwShowHide=document.querySelector('.bx-low-vision');

 formOpenBtn.addEventListener("click",()=>home.classList.add("show"));
 formCloseBtn.addEventListener('click',()=>home.classList.remove("show"));