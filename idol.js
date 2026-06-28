// Page fade animation
window.addEventListener("load", () => {
document.body.style.opacity = "1";
});

// Dark Mode Button

const darkBtn = document.createElement("button");
darkBtn.innerText = "🌙 Dark Mode";
darkBtn.style.position = "fixed";
darkBtn.style.top = "20px";
darkBtn.style.right = "20px";
darkBtn.style.padding = "8px 14px";
darkBtn.style.cursor = "pointer";

document.body.appendChild(darkBtn);

darkBtn.addEventListener("click", () => {
document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
darkBtn.innerText="☀ Light Mode";
}else{
darkBtn.innerText="🌙 Dark Mode";
}
});