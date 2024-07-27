// cart.js

  if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', ready);
  } else {
      ready();
  }

  function ready() {
      loadCartFromLocalStorage();

      var removeCartItemButtons = document.getElementsByClassName('btn-danger');
      for (var i = 0; i < removeCartItemButtons.length; i++) {
          var button = removeCartItemButtons[i];
          if (!button.dataset.listenerAdded) {
              button.addEventListener('click', removeCartItem);
              
          }
      }

      var quantityInputs = document.getElementsByClassName('cart-quantity-input');
      for (var i = 0; i < quantityInputs.length; i++) {
          var input = quantityInputs[i];
          if (!input.dataset.listenerAdded) {
              input.addEventListener('change', quantityChanged);
          }
      }

      var addToCartButtons = document.getElementsByClassName('add-to-cart');
      for (var i = 0; i < addToCartButtons.length; i++) {
          var button = addToCartButtons[i];
              button.addEventListener('click', addToCartClicked);
              
          }
          document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

      }
      

  

  function loadCartFromLocalStorage() {
      var cartString = localStorage.getItem('cart');
      if (cartString) {
          var cart = JSON.parse(cartString);
          for (var i = 0; i < cart.length; i++) {
              addItemToCart(cart[i].title, cart[i].price, cart[i].imageSrc, false);
          }
      }
  }

  function purchaseClicked() {
      alert('Thank you for your purchase');
      var cartItems = document.getElementsByClassName('cart-items')[0];
      while (cartItems.hasChildNodes()) {
          cartItems.removeChild(cartItems.firstChild);
      }
      updateCartTotal();
      localStorage.removeItem('cart');
  }

  function removeCartItem(event) {
      var buttonClicked = event.target;
      var cartRow = buttonClicked.closest('.cart-row');
      if (cartRow) {
          cartRow.remove();
          updateCartTotal();
          saveCartToLocalStorage();
      }
  }

  function quantityChanged(event) {
      var input = event.target;
      if (isNaN(input.value) || input.value <= 0) {
          input.value = 1;
      }
      updateCartTotal();
      saveCartToLocalStorage();
  }

  function addToCartClicked(event) {
      var button = event.target;
      var shopItem = button.parentElement.parentElement.parentElement;
      const isLoggedIn = localStorage.getItem('isLoggedIn');

      var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
      var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
      var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
      if (isLoggedIn === 'true') {
          alert('added to cart');
          addItemToCart(title, price, imageSrc, true);
          updateCartTotal();
          saveCartToLocalStorage();
      } else {
          alert('You must be logged in to add items to the cart.');
          window.location.href = './index.html';
      }
  }

  function addItemToCart(title, price, imageSrc, showAlert) {
      var cartRow = document.createElement('div');
      cartRow.classList.add('cart-row');
      var cartItems = document.getElementsByClassName('cart-items')[0];
      var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
      for (var i = 0; i < cartItemNames.length; i++) {
          if (cartItemNames[i].innerText === title) {
              if (showAlert) {
                  alert('This item is already added to the cart');
              }
              return;
          }
      }
      var cartRowContents = `
          <div class="cart-row grid grid-col-1 md:grid md:grid-cols-3 my-3 md:items-center">
              <div class="cart-item cart-column flex items-center text-white">
                  <div><img class="cart-item-image" src="${imageSrc}" width="100" height="100"></div>
                  <div class="cart-item-title p-2">${title}</div>
              </div>
              <span class="cart-price cart-column text-white text-2xl">${price}</span>
              <div class="cart-quantity cart-column">
                  <input class="cart-quantity-input h-9 w-14 rounded-md text-center border-b-3 border-black mx-2" type="number" value="1">
                  <button class="btn btn-danger text-white rounded hover:bg-red-900" type="button">REMOVE</button>
              </div>
          </div>`;
      cartRow.innerHTML = cartRowContents;
      cartItems.append(cartRow);

      var removeButton = cartRow.getElementsByClassName('btn-danger')[0];
      var quantityInput = cartRow.getElementsByClassName('cart-quantity-input')[0];
      if (!removeButton.dataset.listenerAdded) {
          removeButton.addEventListener('click', removeCartItem);
          removeButton.dataset.listenerAdded = true;
      }
      if (!quantityInput.dataset.listenerAdded) {
          quantityInput.addEventListener('change', quantityChanged);
          quantityInput.dataset.listenerAdded = true;
      }
  }

  function updateCartTotal() {
      var cartItemContainer = document.getElementsByClassName('cart-items')[0];
      var cartRows = cartItemContainer.getElementsByClassName('cart-row');
      var total = 0;
      for (var i = 0; i < cartRows.length; i++) {
          var cartRow = cartRows[i];
          var priceElement = cartRow.getElementsByClassName('cart-price')[0];
          var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
          var price = parseFloat(priceElement.innerText.replace(' L.E', '').replace(',', '').trim());
          var quantity = quantityElement.value;
          console.log(`Row ${i}: Price - ${price}, Quantity - ${quantity}`);
          total += price * quantity;
      }
      total = Math.round(total * 100) / 100;
      console.log(`Total: ${total}`);
      document.getElementsByClassName('cart-total-price')[0].innerText = total + ' L.E';
  }

  function saveCartToLocalStorage() {
      var cartItems = document.getElementsByClassName('cart-items')[0];
      var cartRows = cartItems.getElementsByClassName('cart-row');
      var cart = [];
      for (var i = 0; i < cartRows.length; i++) {
          var cartRow = cartRows[i];
          var title = cartRow.getElementsByClassName('cart-item-title')[0].innerText;
          var price = cartRow.getElementsByClassName('cart-price')[0].innerText;
          var imageSrc = cartRow.getElementsByClassName('cart-item-image')[0].src;
          cart.push({
              title: title,
              price: price,
              imageSrc: imageSrc
          });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
  }
