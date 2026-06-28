document.addEventListener("DOMContentLoaded", () => {

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// ================= DOM =================

const mobileMenuBtn = $("#mobileMenuBtn");
const navLinks = $("#navLinks");

const steps = [$("#step1"), $("#step2"), $("#step3")];
const contents = [
$("#step1Content"),
$("#step2Content"),
$("#step3Content")
];

const successMessage = $("#successMessage");

const emailForm = $("#emailForm");
const codeForm = $("#codeForm");
const passwordForm = $("#passwordForm");

const email = $("#email");
const displayEmail = $("#displayEmail");

const newPassword = $("#newPassword");
const confirmPassword = $("#confirmPassword");

const sendBtn = $("#sendCodeBtn");
const resetBtn = $("#resetPasswordBtn");
const resendBtn = $("#resendCode");

const timer = $("#timer");
const resendTimer = $("#resendTimer");

const codeInputs = $$(".code-input");

// ================= STATE =================

let currentStep = 1;
let timerInterval;
let resendInterval;
let timeLeft = 300;
let resendTime = 300;
let verificationCode = "123456";

// ================= INIT =================

initMenu();
scrollTop();

// ================= MOBILE MENU =================

function initMenu(){
mobileMenuBtn?.addEventListener("click",()=>{
navLinks.classList.toggle("active");
});
}

// ================= STEP =================

function go(step){

steps.forEach((s,i)=>{
s.classList.toggle("active",i+1===step);
s.classList.toggle("completed",i+1<step);
});

contents.forEach((c,i)=>{
c.classList.toggle("active",i+1===step);
});

currentStep = step;
}

// ================= EMAIL =================

emailForm?.addEventListener("submit",e=>{
e.preventDefault();

if(!validateEmail()) return;

sendBtn.disabled = true;

setTimeout(()=>{
displayEmail.textContent = email.value;
go(2);
startTimer();
startResend();

sendBtn.disabled = false;

notify("Code sent","success");

},1200);

});

function validateEmail(){

const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

return regex.test(email.value);

}

// ================= CODE INPUT =================

codeInputs.forEach((input,i)=>{

input.addEventListener("input",()=>{

if(input.value && i<5)
codeInputs[i+1].focus();

if([...codeInputs].every(i=>i.value))
verify();

});

input.addEventListener("keydown",e=>{
if(e.key==="Backspace" && !input.value && i>0)
codeInputs[i-1].focus();
});

});

// ================= VERIFY =================

codeForm?.addEventListener("submit",e=>{
e.preventDefault();
verify();
});

function verify(){

const code=[...codeInputs]
.map(i=>i.value)
.join("");

if(code.length!==6) return;

if(code===verificationCode){

go(3);
clearInterval(timerInterval);
notify("Verified","success");

}else{

codeInputs.forEach(i=>{
i.classList.add("error");
setTimeout(()=>i.classList.remove("error"),600);
});

}

}

// ================= TIMER =================

function startTimer(){

timeLeft=300;

timerInterval=setInterval(()=>{

timeLeft--;

timer.textContent = format(timeLeft);

if(timeLeft<=0){
clearInterval(timerInterval);
go(1);
}

},1000);

}

function startResend(){

resendTime=300;
resendBtn.disabled=true;

resendInterval=setInterval(()=>{

resendTime--;

resendTimer.textContent=format(resendTime);

if(resendTime<=0){
clearInterval(resendInterval);
resendBtn.disabled=false;
resendBtn.textContent="Resend Code";
}

},1000);

}

function format(t){
const m=Math.floor(t/60);
const s=t%60;
return `${m}:${s.toString().padStart(2,"0")}`;
}

// ================= RESEND =================

resendBtn?.addEventListener("click",()=>{

if(resendBtn.disabled) return;

verificationCode =
Math.floor(100000+Math.random()*900000);

notify("New Code Sent","success");

startResend();

});

// ================= PASSWORD =================

newPassword?.addEventListener("input",()=>{
validatePassword();
strength();
requirements();
});

confirmPassword?.addEventListener("input",validateConfirm);

function validatePassword(){

return newPassword.value.length>=8;

}

function validateConfirm(){

return newPassword.value === confirmPassword.value;

}

// ================= STRENGTH =================

function strength(){

const bar=$("#strengthBar");
const text=$("#strengthText");

let s=0;
const p=newPassword.value;

if(p.length>=8) s++;
if(/[a-z]/.test(p)) s++;
if(/[A-Z]/.test(p)) s++;
if(/\d/.test(p)) s++;

bar.className="strength-bar";

["weak","medium","strong"][s-2] &&
bar.classList.add(["weak","medium","strong"][s-2]);

text.textContent =
["Weak","Medium","Strong"][s-2] || "Enter password";

}

// ================= REQUIREMENTS =================

function requirements(){

toggle("#req-length",newPassword.value.length>=8);
toggle("#req-number",/\d/.test(newPassword.value));
toggle("#req-lowercase",/[a-z]/.test(newPassword.value));
toggle("#req-uppercase",/[A-Z]/.test(newPassword.value));

}

function toggle(id,valid){

const el=$(id);
el.classList.toggle("valid",valid);

}

// ================= RESET =================

passwordForm?.addEventListener("submit",e=>{

e.preventDefault();

if(!validatePassword() || !validateConfirm())
return;

resetBtn.disabled=true;

setTimeout(()=>{

$$(".step-content")
.forEach(e=>e.style.display="none");

successMessage.style.display="block";

notify("Password Reset Successful","success");

},1200);

});

// ================= NOTIFY =================

function notify(msg,type="info"){

const n=document.createElement("div");

n.className=`notification ${type}`;
n.textContent=msg;

document.body.appendChild(n);

setTimeout(()=>n.remove(),3000);

}

// ================= SCROLL =================

function scrollTop(){

const btn=document.createElement("button");

btn.className="scroll-top";
btn.textContent="↑";

document.body.appendChild(btn);

window.addEventListener("scroll",()=>{

btn.classList.toggle("show",window.scrollY>300);

});

btn.onclick=()=>window.scrollTo({
top:0,
behavior:"smooth"
});

}

// ================= FOOTER =================

const footer=$(".footer-bottom p");

if(footer){

footer.innerHTML=
footer.innerHTML.replace(
"2026",
new Date().getFullYear()
);

}

});