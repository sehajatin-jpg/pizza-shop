const checkoutProducts =
  document.getElementById("checkout-products");

const checkoutSubtotal =
  document.getElementById("checkout-subtotal");

const checkoutTotal =
  document.getElementById("checkout-total");

const checkoutForm =
  document.getElementById("checkout-form");


const cartItems =
  JSON.parse(localStorage.getItem("pizzaCart")) || [];


const DELIVERY_PRICE = 2;


// ================= SHOW PRODUCTS =================

function displayCheckoutProducts(){

  checkoutProducts.innerHTML = "";


  if(cartItems.length === 0){

    window.location.href = "index.html";

    return;

  }


  cartItems.forEach(item => {

    const product = document.createElement("div");

    product.classList.add("checkout_product");


    product.innerHTML = `

      <img
        src="${item.image}"
        alt="${item.name}"
      >

      <div>

        <h3>
          ${item.name}
        </h3>

        <span>
          Quantity: ${item.quantity}
        </span>

      </div>

      <strong>
        $${(item.price * item.quantity).toFixed(2)}
      </strong>

    `;


    checkoutProducts.appendChild(product);

  });


  calculateCheckout();

}


// ================= CALCULATE =================

function calculateCheckout(){

  const subtotal = cartItems.reduce(

    (total, item) =>
      total + item.price * item.quantity,

    0

  );


  const total = subtotal + DELIVERY_PRICE;


  checkoutSubtotal.textContent =
    `$${subtotal.toFixed(2)}`;

  checkoutTotal.textContent =
    `$${total.toFixed(2)}`;

}


// ================= PLACE ORDER =================

checkoutForm.addEventListener("submit", (e) => {

  e.preventDefault();


  const order = {

    id: "PIZZA-" + Date.now(),

    customer: {

      name:
        document.getElementById("name").value,

      phone:
        document.getElementById("phone").value,

      address:
        document.getElementById("address").value,

      city:
        document.getElementById("city").value,

      pincode:
        document.getElementById("pincode").value

    },

    payment:
      document.querySelector(
        'input[name="payment"]:checked'
      ).value,

    products: cartItems,

    date: new Date().toISOString()

  };


  localStorage.setItem(
    "lastPizzaOrder",
    JSON.stringify(order)
  );


  // Clear cart

  localStorage.removeItem("pizzaCart");


  alert(
    `Order placed successfully!\nOrder ID: ${order.id}`
  );


  window.location.href = "index.html";

});


displayCheckoutProducts();