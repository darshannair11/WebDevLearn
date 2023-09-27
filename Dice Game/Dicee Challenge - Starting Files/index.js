var rand1=Math.floor(Math.random()*6)+1;
var img1name="images/dice"+rand1+".png";
document.querySelectorAll("img")[0].setAttribute('src',img1name);
var rand2=Math.floor(Math.random()*6)+1;
var img2name="images/dice"+rand2+".png";
document.querySelectorAll("img")[1].setAttribute('src',img2name);
if(rand1>rand2){
    document.querySelector("h1").innerText="🚩 Player1 Wins!";
}
else if(rand2>rand1){
    document.querySelector("h1").innerText="Player2 Wins! 🚩";
}
else{
    document.querySelector("h1").innerText="Draw"; 
}