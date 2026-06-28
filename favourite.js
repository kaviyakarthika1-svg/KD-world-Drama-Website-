document.addEventListener("DOMContentLoaded", () => {

let favourites = JSON.parse(localStorage.getItem("favorites")) || [];
let filtered = [...favourites];
let sortType = "default";
let search = "";

// DOM Helper
const $ = s => document.querySelector(s);

// DOM Elements
const container = $("#favoritesContainer");
const empty = $("#emptyState");
const recSection = $("#recommendationSection");

// Init
AOS.init({duration:1000, once:true});
initMenu();
render();
updateStats();
scrollTop();
checkLogin();


// ================= RENDER =================

function render(){

container.innerHTML="";

filtered = search 
? favourites.filter(d=>d.name.toLowerCase().includes(search.toLowerCase()))
: [...favourites];

sort();

if(!filtered.length){
container.style.display="none";
empty.style.display="block";
recSection.style.display="none";
return;
}

container.style.display="grid";
empty.style.display="none";

filtered.forEach((d,i)=>{
container.appendChild(card(d,i))
});

recSection.style.display = favourites.length ? "block" : "none";

if(favourites.length) loadRec();

}


// ================= CARD =================

function card(d,i){

const rating=(Math.random()*2+3).toFixed(1);

const el=document.createElement("div");
el.className="drama-card";

el.innerHTML=`

<div class="poster-wrapper">
<img src="${d.image}" alt="${d.name}">
<a href="${d.link}" target="_blank">
<button class="watch-btn">
<i class="fas fa-play"></i> Watch
</button>
</a>
</div>

<div class="drama-info">

<h4>${d.name}</h4>

<div class="drama-meta">
<span>⭐ ${rating}</span>
<span>⏱ 16 eps</span>
</div>

<div class="favorite-actions">
<button class="remove-btn" onclick="removeFavorite(${i})">
Remove
</button>

<button class="details-btn" onclick="showDetails('${d.name}')">
Details
</button>

</div>

</div>

`;

return el;

}


// ================= REMOVE =================

window.removeFavorite = i => {

if(!confirm("Remove from favorites?")) return;

favourites.splice(i,1);

localStorage.setItem("favorites",JSON.stringify(favourites));

render();
updateStats();

};


// ================= DETAILS =================

window.showDetails = n =>{
alert(`Details for ${n}`);
};


// ================= SORT =================

function sort(){

if(sortType==="name-asc")
filtered.sort((a,b)=>a.name.localeCompare(b.name));

if(sortType==="name-desc")
filtered.sort((a,b)=>b.name.localeCompare(a.name));

if(sortType==="date")
filtered.sort((a,b)=>new Date(b.dateAdded)-new Date(a.dateAdded));

}


// ================= STATS =================

function updateStats(){

$("#totalFavorites .stat-number").textContent=favourites.length;

$("#uniqueGenres .stat-number").textContent =
Math.ceil(favourites.length*0.7);

$("#watchHours .stat-number").textContent =
favourites.length * 16;

}


// ================= SEARCH =================

$("#searchFavorites")?.addEventListener("input",e=>{
search=e.target.value;
render();
});


// ================= SORT =================

$("#sortFavorites")?.addEventListener("change",e=>{
sortType=e.target.value;
render();
});


// ================= CLEAR =================

$("#clearAllBtn")?.addEventListener("click",()=>{

if(!confirm("Clear all favorites?")) return;

favourites=[];
localStorage.setItem("favorites","[]");

render();
updateStats();

});


// ================= EXPORT =================

$("#exportFavorites")?.addEventListener("click",()=>{

if(!favourites.length) return;

const data=favourites
.map(f=>`${f.name},${f.link}`)
.join("\n");

const blob=new Blob([data]);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);
a.download="favorites.csv";

a.click();

});


// ================= SHARE =================

$("#shareFavorites")?.addEventListener("click",()=>{

const txt=favourites
.map((f,i)=>`${i+1}. ${f.name}`)
.join("\n");

navigator.clipboard.writeText(txt);

alert("Copied to clipboard");

});


// ================= RECOMMENDATIONS =================

function loadRec(){

const rec = [
{
name:"Crash Landing on You",
genre:"Romance",
image:"https://i.imgur.com/9V0RZ5K.jpg"
},

{
name:"Goblin",
genre:"Fantasy",
image:"https://i.imgur.com/e1hLQ2V.jpg"
},

{
name:"Itaewon Class",
genre:"Drama",
image:"https://i.imgur.com/xyPtnqL.jpg"
}
];

$("#recommendationContainer").innerHTML = rec.map(r=>`

<div class="recommendation-card" data-aos="fade-up">

<img src="${r.image}" alt="${r.name}">

<div class="recommendation-info">

<h4>${r.name}</h4>
<p>${r.genre}</p>

<button onclick="addRecommended(
'${r.name}',
'${r.image}',
'${r.genre}'
)">

<i class="fas fa-plus"></i>
Add to Favorites

</button>

</div>

</div>

`).join("");

}


// ================= ADD RECOMMENDED =================

window.addRecommended = (name,image,genre)=>{

if(favourites.some(f=>f.name===name)){

alert("Already added");
return;

}

favourites.push({

name,
image,
genre,
link:"#",
dateAdded:new Date()

});

localStorage.setItem("favorites",
JSON.stringify(favourites));

render();
updateStats();

};


// ================= MOBILE MENU =================

function initMenu(){

$("#mobileMenuBtn")?.addEventListener("click",()=>{

$("#navLinks").classList.toggle("active");

});

}


// ================= SCROLL TOP =================

function scrollTop(){

const b=document.createElement("button");

b.className="scroll-top";
b.innerHTML="↑";

document.body.appendChild(b);

window.addEventListener("scroll",()=>{

b.classList.toggle("show",window.scrollY>300);

});

b.onclick=()=>window.scrollTo({
top:0,
behavior:"smooth"
});

}


// ================= LOGIN =================

function checkLogin(){

const user=$(".user-menu");

const token=sessionStorage.getItem("authToken");

if(!token) return;

const data = JSON.parse(
sessionStorage.getItem("userData")||"{}"
);

user.innerHTML=`

<div class="user-dropdown">

<button class="user-btn">
${data.name || "User"}
</button>

<div class="dropdown-content">
<a href="profile.html">Profile</a>
<a id="logout">Logout</a>
</div>

</div>

`;

$("#logout").onclick=()=>{
sessionStorage.clear();
location.href="home.html";
};

}

});