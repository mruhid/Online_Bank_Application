 // -------------------BANK KODU--------------------
 let bank_Abb = {
    ad: "Ruhid",
    soyad: "Memmedzade",
    balans: 1111,
    borc: 468,
    odeme: 17,
    son_odeme: new Date("11/11/2022"),
    ayliq: 98
};
// ----------------function---------------------------------
let cari_balans = function () {
    return bank_Abb.balans
}
// ------------onclick------------------------------
balans.onclick = function () {
    document.querySelector('#screen h6').innerHTML = "Cari balansiniz :" + cari_balans() + " AZN";
    document.querySelector('.money-amount').innerHTML =cari_balans() + " AZN";
}
medaxil.onclick = function () {
    var mebleg = Number(window.prompt("Medaxili daxil edin (AZN): "));
    document.querySelector('#screen h6').innerHTML = "Balansiniz " + mebleg + " azn artirildi.";
    bank_Abb.balans = bank_Abb.balans + mebleg;
}
document.querySelector('.add').onclick=function() {
    var mebleg = Number(window.prompt("Medaxili daxil edin (AZN): "));
    document.querySelector('.add').innerHTML = "Balansiniz " + mebleg + " azn artirildi.";
    bank_Abb.balans = bank_Abb.balans + mebleg;
}
mexaric.onclick = function () {
    var azn = Number(window.prompt("Mexarici daxil edin (AZN): "));
    document.querySelector('#screen h6').innerHTML = "Balansinizdan " + azn + " azn mexaric olundu.";
    bank_Abb.balans = bank_Abb.balans - azn;
}
son.onclick = function () {
    document.querySelector('#screen h6').innerHTML = "Son odenis tarixi : " + bank_Abb.son_odeme;
}
borc.onclick = function () {
    document.querySelector('#screen h6').innerHTML = "Qaliq borc : " + bank_Abb.borc + "AZN";
}

//--------------------Tesdiq------------------- 
function tesdiq() {
    let tesdiq = confirm("Kredit odenisini etmek istediyinizden eminzisiniz?");
    if (tesdiq) {
        if (bank_Abb.balans >= bank_Abb.ayliq) {
            alert("Odenis ugurla basa catdi.");
            bank_Abb.balans = bank_Abb.balans - bank_Abb.ayliq;
            bank_Abb.borc = bank_Abb.borc - bank_Abb.ayliq;
        }
        else {
            alert("Cari balansinizda kifayet qeder mebleg yoxdur.");
        }
    }
    else {
        alert("Odenis legv oldu.");
    }
}
