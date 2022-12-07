(() => {
    const cartItems = [];
    const cartButton = document.querySelector('span.cart-icon');
    const closeCartButton = document.querySelector('span.close-icon');
    const addButtons = document.querySelectorAll('[data-add-serviço');
    const cartadicionais  = document.querySelector('.cart_adicional');
  
    const createCartItem = (
      item = {
       
        price: 20,
        quantity: 1,
      }
    ) => {
      // Cria todas as divs
      const cartserviço = document.createElement('div');
      const serviçoremove = document.createElement('div');
      const serviçoimage = document.createElement('div');
      const quantitySelector = document.createElement('div');
      const serviçoDetails = document.createElement('div');
      const serviçoPrice = document.createElement('div');
      const serviçoOptions = document.createElement('div');
      const AdicionaisOption = document.createElement('div');
      const ServiçosOption = document.createElement('div');
      const serviçosTitle = document.createElement('div');
  
      // Adicionas as respectivas classNamees as divs
      cartserviço.classNameList.add('adicional__product');
      serviçoremove.classNameList.add('adicional__remove');
      serviçoimage.classNameList.add('adicional__adicional-image');
      quantitySelector.classNameList.add('quantity-selector');
      serviçoDetails.classNameList.add('adicional__adicional-details');
      serviçoPrice.classNameList.add('adicional__product-price');
      serviçoOptions.classNameList.add('adicional__adicional-options');
      AdicionaisOption.classNameList.add('adicional__adicional-option');
      ServiçosOption.classNameList.add('adicional__adicional-option');
      serviçosTitle.classNameList.add('adicional__adicional-title');
  
      // Cria todos os spans
      const closeIcon = document.createElement('span');
      const removeIcon = document.createElement('span');
      const quantity = document.createElement('span');
      const addIcon = document.createElement('span');
      const AdicionaisOptionName = document.createElement('span');
      const AdicionaisOptionValue = document.createElement('span');
      const ServiçosOptionName = document.createElement('span');
      const ServiçosOptionValue = document.createElement('span');
  
      closeIcon.classNameList.add('close-icon');
      removeIcon.classNameList.add('remove-icon');
      quantity.classNameList.add('quantity');
      addIcon.classNameList.add('add-icon');
      AdicionaisOptionName.classNameList.add('option__name');
      ServiçosOptionName.classNameList.add('option__name');
      AdicionaisOptionValue.classNameList.add('option__value');
      ServiçosOptionValue.classNameList.add('option__value');
      const image = document.createElement('img');
  
      image.classNameList.add('adicional__adicional-image');
      image.src = 'assets/images/serviço-image.webp';
  
    ServiçosOptionName.innerText = 'Serviços:';
      ServiçosOptionValue.innerText = item.Serviço;
  
      AdicionaisOptionName.innerText = 'Adicionais:';
      AdicionaisOptionValue.innerText = item.Adicionais;
  
      removeIcon.innerText = 'remove';
      addIcon.innerText = 'add';
      closeIcon.innerText = 'close';
      quantity.innerText = item.quantity;
  
      serviçosTitle.innerHTML = item.title;
      serviçoPrice.innerHTML = `$${item.price.toFixed(2)}`;
  
      AdicionaisOption.appendChild(AdicionaisOptionName);
      AdicionaisOption.appendChild(AdicionaisOptionValue);
  
      ServiçosOption.appendChild(ServiçosOptionName);
      ServiçosOption.appendChild(ServiçosOptionValue);
  
      serviçoOptions.appendChild(ServiçosOption);
      serviçoOptions.appendChild(AdicionaisOption);
  
      serviçoDetails.appendChild(serviçosTitle);
      serviçoDetails.appendChild(serviçoPrice);
      serviçoDetails.appendChild(serviçoOptions);
  
      serviçoremove.appendChild(closeIcon);
  
      quantitySelector.appendChild(removeIcon);
      quantitySelector.appendChild(quantity);
      quantitySelector.appendChild(addIcon);
  
      cartserviço.appendChild(serviçoremove);
  
      serviçoimage.appendChild(image);
      serviçoimage.appendChild(quantitySelector);
  
      cartserviço.appendChild(serviçoimage);
      cartserviço.appendChild(serviçoDetails);
  
      const removeItem = (e) => {
        const element = e.target;
        const parentadicional = element.closest('.adicional__product');
        const cartadicionais  = document.querySelector('.cart_adicional');
        const itemIndex = cartItems.findIndex(
          (element) => element === parentadicional
        );
  
        cartadicionais .removeChild(parentadicional);
        cartItems.splice(itemIndex, 1);
        updateTotals(cartItems, item, 'remove');
        toggleItems(cartItems);
      };
  
      closeIcon.addEventListener('click', removeItem);
  
      removeIcon.addEventListener('click', (e) => {
        const target = e.target;
        const quantityElement = target.parentElement.querySelector('.quantity');
  
        item.quantity = item.quantity - 1;
  
        quantityElement.innerText = item.quantity;
  
        if (item.quantity === 0) {
          item.quantity = 1;
          removeItem(e);
        } else {
          updateTotals(cartItems, item, 'decrement');
        }
      });
  
      addIcon.addEventListener('click', (e) => {
        const target = e.target;
        const quantityElement = target.parentElement.querySelector('.quantity');
  
        item.quantity = item.quantity + 1;
  
        quantityElement.innerText = item.quantity;
        updateTotals(cartItems, item, 'increment');
      });
  
      return cartserviço;
    };
  
    const toggleItems = (cartItems) => {
      const emptyCartElements = document.querySelectorAll('[data-empty-cart]');
      const notEmptyCartElements = document.querySelectorAll(
        '[data-not-empty-cart]'
      );
  
      if (cartItems.length === 0) {
        emptyCartElements.forEach((element) => {
          element.style.display = 'block';
        });
        notEmptyCartElements.forEach((element) => {
          element.style.display = 'none';
        });
        // Se tiver algum item, esconder os elementos
      } else {
        emptyCartElements.forEach((element) => {
          element.style.display = 'none';
        });
        notEmptyCartElements.forEach((element) => {
          element.style.display = 'flex';
        });
      }
    };
  
    const openCart = () => {
      const cart = document.querySelector('.cart');
  
      cart.style.display = 'block';
    };
  
    const extractMoneyValue = (string) => {
      return Number(string.split('$')[1]);
    };
  
    const updateTotals = (cartItems, item, action = 'add') => {
      const totalItems = document.querySelector('.cart__total-value');
      const subTotal = document.querySelector('[data-subtotal]');
      const grandTotal = document.querySelector('[data-grand-total]');
      const subTotalValue = extractMoneyValue(subTotal.innerText);
      const grandTotalValue = extractMoneyValue(subTotal.innerText);
      const quantityActions = ['increment', 'decrement'];
      const remove = ['remove', 'decrement'].includes(action);
      const itemTotalValue = quantityActions.includes(action)
        ? item.price
        : item.quantity * item.price;
      const newSubTotalValue = remove
        ? subTotalValue - itemTotalValue
        : subTotalValue + itemTotalValue;
      const newGrandTotalValue = remove
        ? grandTotalValue - itemTotalValue
        : grandTotalValue + itemTotalValue;
  
      totalItems.innerHTML = cartItems.length;
  
      subTotal.innerText = `$${newSubTotalValue.toFixed(2)}`;
      grandTotal.innerText = `$${newGrandTotalValue.toFixed(2)}`;
    };
  
    addButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const item = {

          price: 20.0,
          quantity: 1,
        };
        const newCartItem = createCartItem(item);
  
        cartItems.push(newCartItem);
        cartadicionais .appendChild(newCartItem);
        toggleItems(cartItems);
        openCart();
        updateTotals(cartItems, item);
      });
    });
  
    toggleItems(cartItems);
  
    // Ao clicar no cartButton a gente abre o carrinho
    cartButton.addEventListener('click', openCart);
  
    // Ao clicar no closeCartButton a gente esconde o carrinho
    closeCartButton.onclick = () => {
      const cart = document.querySelector('.cart');
  
      cart.style.display = 'none';
    };
  })();