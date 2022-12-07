(() => {
  const cartItems = [];
  const cartButton = document.querySelector("span.cart-icon");
  const closeCartButton = document.querySelector("span.close-icon");
  const addButtons = document.querySelectorAll("[data-add-serviço");
  const cartAdicionais = document.querySelector(".cart__adicionais");

  const createCartItem = (
    item = {
     categoria: "limpeza",
      tipo: "Adicional",
      title: "Serviços Extras",
      price: 50.0,
      quantity: 1,
    }
  ) => {
    // Criação das divs
    const cartAdicional = document.createElement("div");
    const adicionalRemove = document.createElement("div");
    const adicionalImage = document.createElement("div");
    const quantitySelector = document.createElement("div");
    const adicionalDetails = document.createElement("div");
    const adicionalPrice = document.createElement("div");
    const adicionalOptions  = document.createElement("div");
    const categoriaOption = document.createElement("div");
    const tipoOption = document.createElement("div");
    const adicionalTitle  = document.createElement("div");

    // associar as div 
    cartAdicional.classList.add("cart__adicional");
    adicionalRemove.classList.add("adicional__remove");
    adicionalImage.classList.add("cart__adicional-image");
    quantitySelector.classList.add("quantity-selector");
    adicionalDetails.classList.add("cart__adicional-details");
    adicionalPrice .classList.add("cart__adicional-price");
    adicionalOptions .classList.add("cart__adicional-options");
    categoriaOption.classList.add("cart__adicional-option");
    tipoOption.classList.add("cart__adicional-option");
    adicionalTitle .classList.add("cart__adicional-title");

    // Cria as frases
    const closeIcon = document.createElement("span");
    const removeIcon = document.createElement("span");
    const quantity = document.createElement("span");
    const addIcon = document.createElement("span");
    const categoriaOptionName = document.createElement("span");
    const categoriaOptionValue = document.createElement("span");
    const tipoOptionName = document.createElement("span");
    const tipoOptionValue = document.createElement("span");

    closeIcon.classList.add("close-icon");
    removeIcon.classList.add("remove-icon");
    quantity.classList.add("quantity");
    addIcon.classList.add("add-icon");
    categoriaOptionName.classList.add("option__name");
    tipoOptionName.classList.add("option__name");
    categoriaOptionValue.classList.add("option__value");
    tipoOptionValue.classList.add("option__value");
    const image = document.createElement("img");

    image.classList.add("cart__adicional-image");
    image.src = "assets/images/serviço-image.webp";

    tipoOptionName.innerText = "Tipo:";
    tipoOptionValue.innerText = item.tipo;

    categoriaOptionName.innerText = "Categoria:";
    categoriaOptionValue.innerText = item.categoria;

    removeIcon.innerText = "remove";
    addIcon.innerText = "add";
    closeIcon.innerText = "close";
    quantity.innerText = item.quantity;

    adicionalTitle .innerHTML = item.title;
    adicionalPrice .innerHTML = `$${item.price.toFixed(2)}`;

    categoriaOption.appendChild(categoriaOptionName);
    categoriaOption.appendChild(categoriaOptionValue);

    tipoOption.appendChild(tipoOptionName);
    tipoOption.appendChild(tipoOptionValue);

    adicionalOptions .appendChild(tipoOption);
    adicionalOptions .appendChild(categoriaOption);

    adicionalDetails.appendChild(adicionalTitle );
    adicionalDetails.appendChild(adicionalPrice );
    adicionalDetails.appendChild(adicionalOptions );

    adicionalRemove.appendChild(closeIcon);

    quantitySelector.appendChild(removeIcon);
    quantitySelector.appendChild(quantity);
    quantitySelector.appendChild(addIcon);

    cartAdicional.appendChild(adicionalRemove);

    adicionalImage.appendChild(image);
    adicionalImage.appendChild(quantitySelector);

    cartAdicional.appendChild(adicionalImage);
    cartAdicional.appendChild(adicionalDetails);

    const removeItem = (e) => {
      const element = e.target;
      const parentAdicional  = element.closest(".cart__adicional");
      const cartAdicionais = document.querySelector(".cart__adicionais");
      const itemIndex = cartItems.findIndex(
        (element) => element === parentAdicional 
      );

      cartAdicionais.removeChild(parentAdicionais);
      cartItems.splice(itemIndex, 1);
      updateTotals(cartItems, item, "remove");
      toggleItems(cartItems);
    };
    
    
    closeIcon.addEventListener("click", removeItem);

    removeIcon.addEventListener("click", (e) => {
      const target = e.target;
      const quantityElement = target.parentElement.querySelector(".quantity");

      item.quantity = item.quantity - 1;

      quantityElement.innerText = item.quantity;

      if (item.quantity === 0) {
        item.quantity = 1;
        removeItem(e);
      } else {
        updateTotals(cartItems, item, "decrement");
      }
    });

    addIcon.addEventListener("click", (e) => {
      const target = e.target;
      const quantityElement = target.parentElement.querySelector(".quantity");

      item.quantity = item.quantity + 1;

      quantityElement.innerText = item.quantity;
      updateTotals(cartItems, item, "increment");
    });

    return cartAdicional;
  };

  const toggleItems = (cartItems) => {
    const emptyCartElements = document.querySelectorAll("[data-empty-cart]");
    const notEmptyCartElements = document.querySelectorAll(
      "[data-not-empty-cart]"
    );

    if (cartItems.length === 0) {
      emptyCartElements.forEach((element) => {
        element.style.display = "block";
      });
      notEmptyCartElements.forEach((element) => {
        element.style.display = "none";
      });
      // esconder os serviços se tiver
    } else {
      emptyCartElements.forEach((element) => {
        element.style.display = "none";
      });
      notEmptyCartElements.forEach((element) => {
        element.style.display = "flex";
      });
    }
  };

  const openCart = () => {
    const cart = document.querySelector(".cart");

    cart.style.display = "block";
  };

  const extractMoneyValue = (string) => {
    return Number(string.split("$")[1]);
  };

  const updateTotals = (cartItems, item, action = "add") => {
    const totalItems = document.querySelector(".cart__total-value");
    const subTotal = document.querySelector("[data-subtotal]");
    const grandTotal = document.querySelector("[data-grand-total]");
    const subTotalValue = extractMoneyValue(subTotal.innerText);
    const grandTotalValue = extractMoneyValue(subTotal.innerText);
    const quantityActions = ["increment", "decrement"];
    const remove = ["remove", "decrement"].includes(action);
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
    button.addEventListener("click", () => {
      const item = {
       categoria: "limpeza",
        tipo: "Adicional",
        title: "Serviços Extras",
        price: 20.0,
        quantity: 1,
      };
      const newCartItem = createCartItem(item);

      cartItems.push(newCartItem);
      cartAdicionais.appendChild(newCartItem);
      toggleItems(cartItems);
      openCart();
      updateTotals(cartItems, item);
    });
  });

  toggleItems(cartItems);

  // abrir o carrinho
  cartButton.addEventListener("click", openCart);

  // Aesconder o carrinho
  closeCartButton.onclick = () => {
    const cart = document.querySelector(".cart");

    cart.style.display = "none";
  };
})();