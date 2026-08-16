// =========================== show menu ==========================
const navMenu=document.getElementById("nav-menu");
const navToggle=document.getElementById("nav-toggle");
const navClose=document.getElementById("nav-close");

if(navToggle){
  navToggle.addEventListener("click",()=>{
    navMenu.classList.add("show_menu");
  })
}

if(navClose){
  navClose.addEventListener("click",()=>{
    navMenu.classList.remove("show_menu");
  })
}

const navLink=document.querySelectorAll(".nav_link");

const linkAction = () => {
  navMenu.classList.remove("show_menu");
}

navLink.forEach(n => n.addEventListener("click",linkAction));

// ====================================== add shadow header ======================================
const shadowHeader = ()=>{
  const header=document.getElementById("header");
  window.scrollY >= 50 ? header.classList.add("shadow-header") : header.classList.remove("shadow-header");
}
window.addEventListener("scroll",shadowHeader);

// ==================================================== popular swiper =================================================
const swiperPopular = new Swiper(".popular_swiper",{
  loop: true,
  grabCursor: true,
  slidesPerView: "auto",
  ceneteredSlides: true,
})

// =================================== show scroll up ========================================
const scrollUp = ()=>{
  const scrollUp=document.getElementById("scroll-up");
  window.scrollY >= 350 ? scrollUp.classList.add("show-scroll") : scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll",scrollUp);

// ================================================== scroll sections active link =========================================
const sections=document.querySelectorAll('section[id]');
const scrollActive=()=>{
  const scrollDown = window.scrollY

  sections.forEach(current=>{
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute('id'),
          sectionClass = document.querySelector('.nav_menu a[href*=' + sectionId + ']');
    if(scrollDown > sectionTop && scrollDown <=sectionTop+sectionHeight){
      sectionClass.classList.add('active-link');
    }
    else{
      sectionClass.classList.remove('active-link');
    }
  })
}
window.addEventListener('scroll',scrollActive);

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", () => {

  if(cartItems.length === 0){
    return;
  }

  window.location.href = "checkout.html";

});

// ==================================================
// CART
// ==================================================

const cart = document.getElementById("cart");
const cartOpen = document.getElementById("cart-open");
const cartClose = document.getElementById("cart-close");
const cartOverlay = document.getElementById("cart-overlay");

const cartContainer = document.getElementById("cart-container");
const cartCount = document.getElementById("cart-count");
const cartItemsCount = document.getElementById("cart-items-count");
const cartTotal = document.getElementById("cart-total");
const cartEmpty = document.getElementById("cart-empty");
const cartFooter = document.getElementById("cart-footer");


// Get saved cart or create empty cart

let cartItems = JSON.parse(localStorage.getItem("pizzaCart")) || [];


// ================= OPEN CART =================

cartOpen.addEventListener("click", () => {

  cart.classList.add("show-cart");
  cartOverlay.classList.add("show-overlay");

});


// ================= CLOSE CART =================

const closeCart = () => {

  cart.classList.remove("show-cart");
  cartOverlay.classList.remove("show-overlay");

};

cartClose.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


// ================= ADD PRODUCT =================

const productButtons = document.querySelectorAll(".products_button");

productButtons.forEach(button => {

  button.addEventListener("click", () => {

    const productCard = button.closest(".products_card");

    const product = {

      id: productCard.dataset.id,

      name: productCard.dataset.name,

      price: Number(productCard.dataset.price),

      image: productCard.dataset.image,

      quantity: 1

    };

    addToCart(product);

  });

});


// ================= ADD TO CART =================

function addToCart(product){

  const existingProduct = cartItems.find(
    item => item.id === product.id
  );


  if(existingProduct){

    existingProduct.quantity++;

  }
  else{

    cartItems.push(product);

  }


  saveCart();

  renderCart();

  cart.classList.add("show-cart");
  cartOverlay.classList.add("show-overlay");

}


// ================= INCREASE QUANTITY =================

function increaseQuantity(id){

  const product = cartItems.find(
    item => item.id === id
  );

  if(product){

    product.quantity++;

  }

  saveCart();

  renderCart();

}


// ================= DECREASE QUANTITY =================

function decreaseQuantity(id){

  const product = cartItems.find(
    item => item.id === id
  );


  if(!product) return;


  if(product.quantity > 1){

    product.quantity--;

  }
  else{

    removeItem(id);

    return;

  }


  saveCart();

  renderCart();

}


// ================= REMOVE PRODUCT =================

function removeItem(id){

  cartItems = cartItems.filter(
    item => item.id !== id
  );

  saveCart();

  renderCart();

}


// ================= SAVE LOCAL STORAGE =================

function saveCart(){

  localStorage.setItem(
    "pizzaCart",
    JSON.stringify(cartItems)
  );

}


// ================= RENDER CART =================

function renderCart(){

  cartContainer.innerHTML = "";


  // Empty cart

  if(cartItems.length === 0){

    cartEmpty.style.display = "flex";

    cartFooter.style.display = "none";

  }
  else{

    cartEmpty.style.display = "none";

    cartFooter.style.display = "block";

  }


  // Generate cart items

  cartItems.forEach(item => {

    const cartItem = document.createElement("article");

    cartItem.classList.add("cart_item");


    cartItem.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}"
        class="cart_item-img"
      >


      <div>

        <h3 class="cart_item-title">
          ${item.name}
        </h3>

        <span class="cart_item-price">
          $${item.price}
        </span>


        <div class="cart_quantity">

          <button
            onclick="decreaseQuantity('${item.id}')"
          >
            -
          </button>


          <span>
            ${item.quantity}
          </span>


          <button
            onclick="increaseQuantity('${item.id}')"
          >
            +
          </button>

        </div>

      </div>


      <i
        class="ri-delete-bin-line cart_remove"
        onclick="removeItem('${item.id}')"
      ></i>

    `;


    cartContainer.appendChild(cartItem);

  });


  updateCartSummary();

}


// ================= CART TOTAL =================

function updateCartSummary(){

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );


  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );


  cartCount.textContent = totalQuantity;

  cartItemsCount.textContent = `(${totalQuantity})`;

  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

}


// Load cart when website starts

renderCart();
