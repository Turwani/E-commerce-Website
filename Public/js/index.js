if (document.readyState == 'loading') {
    let qnt = document.getElementsByClassName('qnt');
    Array.from(qnt).forEach(element => {
        element.value = 1;
    });
    document.addEventListener("DOMContentLoaded", ready);
} else {
    let qnt = document.getElementsByClassName('qnt');
    Array.from(qnt).forEach(element => {
        element.value = 1;
    });
    ready();
}


function ready() {
    let removeButtons = document.getElementsByClassName("remove-btn");
    for (let i = 0; i < removeButtons.length; i++) {
        let button = removeButtons[i];
        button.addEventListener("click", removeCartItem)
    }
    let qnt = document.getElementsByClassName('qnt');
    Array.from(qnt).forEach(element => {
        element.addEventListener('change', quantityChanged);
    });

    let addTocartBtns = document.getElementsByClassName('card-btn');
    Array.from(addTocartBtns).forEach(element => {
        element.addEventListener('click', addToCartClicked)
    })
    updateCartTotal();
    let proceedBtn = document.getElementsByClassName('proceed-btn')[0];
    proceedBtn.addEventListener('click', proceedToPayment);
}

function proceedToPayment() {
    // alert('Thank you for your purchase');
    let finalAmountToPay = document.getElementsByClassName('final-price')[0].innerText.replace('₹', '');
    localStorage.setItem('finalAmount', finalAmountToPay);
    let cartContainer = document.getElementsByClassName('cart-container')[0];
    while (cartContainer.hasChildNodes()) {
        cartContainer.removeChild(cartContainer.firstChild);
    }
    updateCartTotal();
}

function quantityChanged(event) {
    let input = event.target;
    if (input.value == 'undefined' || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal();
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.remove();
    updateCartTotal();
}

function updateCartTotal() {
    let cartContainer = document.getElementsByClassName('cart-container')[0];
    let gridItems = cartContainer.getElementsByClassName('grid-items');
    let total = 0;
    for (let i = 0; i < gridItems.length; i++) {
        let priceElement = gridItems[i].getElementsByClassName('price')[0];
        let quantityElement = gridItems[i].getElementsByClassName('qnt')[0];
        let price = parseFloat(priceElement.innerText.replace('₹', ''));
        let quantity = parseFloat(quantityElement.value);
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('final-price')[0].innerText = '₹' + total;
    // console.log(localStorage);
}

function addToCartClicked(event) {
    let button = event.target;
    let productCard = button.parentElement.parentElement;
    let title = productCard.getElementsByClassName('product-brand')[0].innerText;
    let price = productCard.getElementsByClassName('price')[0].innerText;
    let imageSrc = productCard.getElementsByClassName('product-thumb')[0].src;
    addItemToCard(title, price, imageSrc);
    updateCartTotal();
}

function addItemToCard(title, price, imageSrc) {
    let gridContainer = document.createElement('div');
    gridContainer.classList.add('grid-container');
    let cartContainer = document.getElementsByClassName('cart-container')[0];
    let cartItemsname = cartContainer.getElementsByClassName('product-name');
    for (let i = 0; i < cartItemsname.length; i++) {
        if (cartItemsname[i].innerText == title) {
            alert('Item already in cart');
            return
        }
    }
    let gridContainerContent =
        ` <div class="grid-items">
    <div class="img-div">
    <img src=${imageSrc} alt="" srcset="" class="img-thumbnail">
    <p class="product-name">${title}</p>
    </div>
    <div class="quantity-box">
    <div>Quantity</div>
    <input type="number" class="qnt"></input>
    </div>
    <div class="price-box">
        <div>Price</div>
        <div class="price">${price}</div>
        </div>
        <div>
        <button class="remove-btn">Remove</button>
        </div>
        </div>`;
    gridContainer.innerHTML = gridContainerContent;
    cartContainer.append(gridContainer);
    gridContainer.getElementsByClassName("remove-btn")[0].addEventListener('click', removeCartItem);
    gridContainer.getElementsByClassName('qnt')[0].addEventListener('change', quantityChanged);
    let qnt = document.getElementsByClassName('qnt');
    Array.from(qnt).forEach(element => {
        element.value = 1;
        element.addEventListener('change', quantityChanged);
    });
}