// Ham Wagger Menu
// When clicks on the ham wagger menu, shows the side navigation bar,
// when clicks on the close icon, packs the side navigation bar up.
const hamWaggerMenu = document.getElementById('ham-wagger-menu');
const navigation = document.getElementById('navbar');
const close = document.getElementById('close');

if (hamWaggerMenu) {
    hamWaggerMenu.addEventListener('click', () => {
        navigation.classList.add('active');
    })
}
if (close) {
    close.addEventListener('click', () => {
        navigation.classList.remove('active');
    })
}


// Shopping Cart
// Implements the functions of shopping cart: opening/closing aside shoping cart, 
// adding product to cart, removing product from cart, adjust quantity of product, 
// automatically calculate total price
let cartIcon = document.querySelector("#shopping-bag")
let cart = document.querySelector(".shopping-cart")
let closeCart = document.querySelector("#close-cart")
// open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};
// close cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Implementing Shopping Cart Functions

// Removing items from cart
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}
// implementing functions
function ready() {
    // remove items from cart
    var removeItemButtons = document.getElementsByClassName("cart-remove");
    console.log("rem");
    for (let index = 0; index < removeItemButtons.length; index++) {
        const button = removeItemButtons[index];
        button.addEventListener("click", removeCartItem)
    }
    // updateing item quantities
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let index = 0; index < quantityInputs.length; index++) {
        const input = quantityInputs[index];
        input.addEventListener("change", quantityChanged);
    }
    // adding item to cart
    var addCart = document.getElementsByClassName("cart");
    for (let index = 0; index < addCart.length; index++) {
        const addCartButton = addCart[index];
        addCartButton.addEventListener("click", addItemClicked);
    }
    // check out button
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", checkoutClicked);
}

// check out
function checkoutClicked() {
    alert("Your order has been placed.")
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// adding items clicked to cart
function addItemClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addItemToCart(title, price, productImg);
    updateTotal();
}

// var cartShopBox;
// adding item details to cart
function addItemToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (let index = 0; index < cartItemsNames.length; index++) {
        if (cartItemsNames[0].innerText == title) {
            alert("You have already added this item to cart.")
            return;
        }
    }

    var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <p class="cart-product-title">${title}</p>
                            <p class="cart-price">${price}</p>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- remove from cart icon-->
                        <i class="fas fa-trash cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

// changing quantity of item
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}


// Updating Total Cost
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (let index = 0; index < cartBoxes.length; index++) {
        const cartBox = cartBoxes[index];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    // round price to cents
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}


// Showcase Of Product
// On product page, when clicking on a small image of a product,
// the clicked small image will be enlarged to display
// var mainImg = document.getElementById("main-img");
// var smallImgs = document.getElementsByClassName("small-img");

// smallImgs[0].onclick = function() {
//     mainImg.src = smallImgs[0].src;
// }
// smallImgs[1].onclick = function() {
//     mainImg.src = smallImgs[1].src;
// }
// smallImgs[2].onclick = function() {
//     mainImg.src = smallImgs[2].src;
// }
// smallImgs[3].onclick = function() {
//     mainImg.src = smallImgs[3].src;
// }

// view all hot-buys products
function viewAll() {
    var hotBuys = document.getElementsByClassName("product");
    for (let index = 0; index < hotBuys.length; index++) {
        const product = hotBuys[index];
        if (product.style.display == "none") {
            product.style.display = "block";
        }
    }
    var button = document.getElementById("view-all");
    button.style.display = "none";
}

// category filter for selecting accessories
function phoneFilter() {
    var selectedPhoneCategory = document.getElementById("fileterByPhone").value;
    var accessories = document.getElementsByClassName("product");
    if (selectedPhoneCategory=="All Products") {
        for (let index = 0; index < accessories.length; index++) {
            const acc = accessories[index];
            acc.style.display = "block";
        }
        return;
    }
    for (let index = 0; index < accessories.length; index++) {
        const acc = accessories[index];
        const category = acc.getElementsByTagName("span")[0].innerText;
        if (category == selectedPhoneCategory) {
            acc.style.display = "block";
        } else {
            acc.style.display = "none";
        }
    }
}

// category filter for selecting accessories
function accessoryFilter() {
    var selectedAccessoryCategory = document.getElementById("fileterByAccessory").value;
    var accessories = document.getElementsByClassName("product");
    if (selectedAccessoryCategory=="All Products") {
        for (let index = 0; index < accessories.length; index++) {
            const acc = accessories[index];
            acc.style.display = "block";
        }
        return;
    }
    for (let index = 0; index < accessories.length; index++) {
        const acc = accessories[index];
        const category = acc.getElementsByTagName("span")[0].innerText;
        if (category == selectedAccessoryCategory) {
            acc.style.display = "block";
        } else {
            acc.style.display = "none";
        }
    }
}