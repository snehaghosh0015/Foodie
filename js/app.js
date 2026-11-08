const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let cart = JSON.parse(localStorage.getItem("foodieCart") || "[]");
let favorites = JSON.parse(localStorage.getItem("foodieFavorites") || "[]");

function save(){localStorage.setItem("foodieCart",JSON.stringify(cart));localStorage.setItem("foodieFavorites",JSON.stringify(favorites));updateCartCount();}
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2200)}
function renderCategories(){ $("#categoryRow").innerHTML=categories.map(([name,img])=>`<button class="category" data-category="${name.toLowerCase()}"><img src="${img}" alt="${name}"><span>${name}</span></button>`).join(""); $$(".category").forEach(b=>b.onclick=()=>filterRestaurants(b.dataset.category));}
function renderRestaurants(list=restaurants){
  $("#restaurantGrid").innerHTML=list.map(r=>`<article class="restaurant-card" data-id="${r.id}">
    <div class="restaurant-img"><img src="${r.img}" alt="${r.name}" loading="lazy"><span class="badge">${r.offer}</span>
    <button class="heart" data-fav="${r.id}" aria-label="Favourite">${favorites.includes(r.id)?"♥":"♡"}</button></div>
    <div class="card-body"><div class="title-line"><h3>${r.name}</h3><span class="rating">★ ${r.rating}</span></div>
    <div class="cuisine">${r.cuisine}</div><div class="meta"><span>⌖ ${r.delivery}</span><span>${r.price}</span></div></div></article>`).join("");
  $("#emptyState").classList.toggle("hidden",list.length>0);
  $$(".restaurant-card").forEach(card=>card.onclick=e=>{if(e.target.closest(".heart"))return;openRestaurant(Number(card.dataset.id));});
  $$("[data-fav]").forEach(btn=>btn.onclick=e=>{e.stopPropagation();toggleFavorite(Number(btn.dataset.fav));});
}
function filterRestaurants(q){
  q=(q||"").trim().toLowerCase();
  const list=!q?restaurants:restaurants.filter(r=>`${r.name} ${r.cuisine} ${r.tags.join(" ")}`.toLowerCase().includes(q));
  renderRestaurants(list);$("#resultText").textContent=q?`${list.length} result${list.length!==1?"s":""} for "${q}"`:"Showing popular choices";
  $("#restaurantGrid").scrollIntoView({behavior:"smooth",block:"start"});
}
function toggleFavorite(id){favorites=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];save();renderRestaurants(currentList());toast(favorites.includes(id)?"Added to favourites":"Removed from favourites");}
function currentList(){const q=$("#searchInput").value.trim().toLowerCase();return q?restaurants.filter(r=>`${r.name} ${r.cuisine} ${r.tags.join(" ")}`.toLowerCase().includes(q)):restaurants}
function updateCartCount(){$("#cartCount").textContent=cart.reduce((s,i)=>s+i.qty,0)}
function addToCart(item){const found=cart.find(i=>i.name===item.name);if(found)found.qty++;else cart.push({...item,qty:1});save();toast(`${item.name} added to cart`);}
function openRestaurant(id){
  const r=restaurants.find(x=>x.id===id);
  $("#modalContent").innerHTML=`<div class="restaurant-detail"><img src="${r.img}" alt="${r.name}" style="width:100%;height:210px;object-fit:cover;border-radius:9px"><h2>${r.name}</h2><p>${r.cuisine}</p><p>★ <b>${r.rating}</b> · ${r.delivery} · ${r.price}</p><h3>Popular dishes</h3><div>${menuItems.map((m,i)=>`<div class="cart-item"><div><b>${m.veg?"🟢":"🔴"} ${m.name}</b><div>₹${m.price}</div></div><button class="primary add-item" data-index="${i}">Add</button></div>`).join("")}</div></div>`;
  $$(".add-item").forEach(b=>b.onclick=()=>addToCart(menuItems[Number(b.dataset.index)]));
  openModal();
}
function openModal(){ $("#modal").classList.remove("hidden");$("#modal").setAttribute("aria-hidden","false");}
function closeModal(){ $("#modal").classList.add("hidden");$("#modal").setAttribute("aria-hidden","true");}
function openAuth(mode){$("#modalContent").innerHTML=`<h2>${mode==="login"?"Welcome back":"Create your account"}</h2><p>${mode==="login"?"Log in to continue ordering.":"Sign up to save favourites and orders."}</p><form class="form" id="authForm"><input required type="email" placeholder="Email address"><input required type="password" minlength="6" placeholder="Password"><button class="primary">${mode==="login"?"Log in":"Create account"}</button></form>`;$("#authForm").onsubmit=e=>{e.preventDefault();closeModal();toast(mode==="login"?"Logged in successfully":"Account created successfully");};openModal();}
function openCart(){
  $("#modalContent").innerHTML=`<h2>Your cart</h2>${cart.length?cart.map((i,idx)=>`<div class="cart-item"><div><b>${i.name}</b><div>₹${i.price} × ${i.qty}</div></div><div class="qty"><button data-dec="${idx}">−</button><span>${i.qty}</span><button data-inc="${idx}">+</button></div></div>`).join("")+`<div class="total">Total: ₹${cart.reduce((s,i)=>s+i.price*i.qty,0)}</div><button class="primary" id="checkoutBtn" style="width:100%">Place demo order</button>`:`<div class="empty"><div>🛒</div><h3>Your cart is empty</h3><p>Add something delicious from a restaurant.</p></div>`}`;
  $$("[data-inc]").forEach(b=>b.onclick=()=>changeQty(Number(b.dataset.inc),1));$$("[data-dec]").forEach(b=>b.onclick=()=>changeQty(Number(b.dataset.dec),-1));
  if($("#checkoutBtn"))$("#checkoutBtn").onclick=()=>{cart=[];save();closeModal();toast("Order placed! This is a demo checkout.");};
  openModal();
}
function changeQty(index,delta){cart[index].qty+=delta;if(cart[index].qty<=0)cart.splice(index,1);save();openCart();}
function setupSearch(){
  const input=$("#searchInput"), hero=$("#heroSearch");
  function suggest(){
    const q=input.value.trim().toLowerCase();const s=restaurants.filter(r=>r.name.toLowerCase().includes(q)||r.tags.some(t=>t.includes(q))).slice(0,5);
    $("#suggestions").innerHTML=s.map(r=>`<div class="suggestion" data-suggest="${r.id}">🍽️ ${r.name}<small style="display:block;color:#888">${r.cuisine}</small></div>`).join("");
    $("#suggestions").classList.toggle("hidden",!q||!s.length);$$("[data-suggest]").forEach(x=>x.onclick=()=>{input.value=restaurants.find(r=>r.id==x.dataset.suggest).name;$("#suggestions").classList.add("hidden");filterRestaurants(input.value)});
  }
  input.oninput=suggest;input.onkeydown=e=>{if(e.key==="Enter"){filterRestaurants(input.value);$("#suggestions").classList.add("hidden")}};
  hero.oninput=()=>input.value=hero.value;$("#heroSearchBtn").onclick=()=>filterRestaurants(hero.value);
  document.addEventListener("click",e=>{if(!e.target.closest(".search-wrap"))$("#suggestions").classList.add("hidden")});
}
$("#modalClose").onclick=closeModal;$("#modal").onclick=e=>{if(e.target===$("#modal"))closeModal()};
$("#loginBtn").onclick=()=>openAuth("login");$("#signupBtn").onclick=()=>openAuth("signup");$("#cartBtn").onclick=openCart;
$("#clearSearch").onclick=()=>{$("#searchInput").value="";filterRestaurants("")};
$("#locationBtn").onclick=()=>{const place=prompt("Enter your city/locality","Bhubaneswar");if(place)$("#locationText").textContent=place};
$$(".action-card").forEach(b=>b.onclick=()=>{$$(".action-card").forEach(x=>x.classList.remove("active"));b.classList.add("active");toast(`${b.querySelector("b").textContent} selected`)});
$("#prevCat").onclick=()=>$("#categoryRow").scrollBy({left:-400,behavior:"smooth"});$("#nextCat").onclick=()=>$("#categoryRow").scrollBy({left:400,behavior:"smooth"});
renderCategories();renderRestaurants();updateCartCount();setupSearch();