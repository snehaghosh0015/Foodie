const categories = [
  ["Pizza","https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80"],
  ["Burgers","https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80"],
  ["Biryani","https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=300&q=80"],
  ["North Indian","https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80"],
  ["Chinese","https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=300&q=80"],
  ["Desserts","https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=300&q=80"],
  ["Café","https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80"],
  ["Thali","https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80"]
];

const restaurants = [
  {id:1,name:"The Spice Route",cuisine:"North Indian • Chinese",rating:4.5,delivery:"30 min",price:"₹400 for two",offer:"50% OFF up to ₹100",img:"https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80",tags:["north indian","chinese","lunch"]},
  {id:2,name:"Pizza Piazza",cuisine:"Pizza • Italian • Fast Food",rating:4.4,delivery:"25 min",price:"₹500 for two",offer:"40% OFF up to ₹80",img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80",tags:["pizza","italian","fast food"]},
  {id:3,name:"Biryani House",cuisine:"Biryani • Mughlai • Indian",rating:4.6,delivery:"32 min",price:"₹450 for two",offer:"₹125 OFF",img:"https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=900&q=80",tags:["biryani","mughlai","indian"]},
  {id:4,name:"Burger Barn",cuisine:"Burger • American • Beverages",rating:4.2,delivery:"22 min",price:"₹350 for two",offer:"20% OFF",img:"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",tags:["burger","american"]},
  {id:5,name:"Café Mocha",cuisine:"Cafe • Desserts • Coffee",rating:4.3,delivery:"28 min",price:"₹600 for two",offer:"Flat ₹100 OFF",img:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",tags:["cafe","coffee","desserts"]},
  {id:6,name:"Wok This Way",cuisine:"Chinese • Asian • Momos",rating:4.5,delivery:"27 min",price:"₹450 for two",offer:"30% OFF",img:"https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80",tags:["chinese","asian","momos"]},
  {id:7,name:"Sweet Truth",cuisine:"Desserts • Bakery • Beverages",rating:4.1,delivery:"20 min",price:"₹300 for two",offer:"BUY 1 GET 1",img:"https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80",tags:["desserts","bakery"]},
  {id:8,name:"Punjabi Tadka",cuisine:"Punjabi • North Indian • Thali",rating:4.4,delivery:"35 min",price:"₹500 for two",offer:"25% OFF",img:"https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80",tags:["punjabi","north indian","thali"]},
  {id:9,name:"Dosa Corner",cuisine:"South Indian • Breakfast",rating:4.5,delivery:"24 min",price:"₹250 for two",offer:"20% OFF",img:"https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80",tags:["south indian","breakfast","dosa"]}
];

const menuItems = [
  {name:"Classic Margherita Pizza",price:249,veg:true},
  {name:"Paneer Tikka Pizza",price:329,veg:true},
  {name:"Chicken Biryani",price:299,veg:false},
  {name:"Veg Hakka Noodles",price:219,veg:true},
  {name:"Crispy Chicken Burger",price:279,veg:false},
  {name:"Chocolate Brownie",price:149,veg:true}
];