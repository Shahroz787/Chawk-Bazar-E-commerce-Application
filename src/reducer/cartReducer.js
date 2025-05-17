const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product, image, category } = action.payload;

    // Safety check to ensure state.cart is not null or undefined
    if (!state.cart) {
      state.cart = [];
    }

    // Tackle the existing product
    let existingProduct = state.cart.find(
      (curItem) => curItem.id === id + color
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === id + color) {
          let newAmount = curElem.amount + amount;
          
          return {
            ...curElem,
            amount: newAmount, // No stock limit anymore
          };
        } else {
          return curElem;
        }
      });

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedProduct));

      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image,
        price: product.price,
        category: product.category,
      };

      let updatedCart = [...state.cart, cartProduct];

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return {
        ...state,
        cart: updatedCart,
      };
    }
  }

  // Decrement item amount
  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let decAmount = curElem.amount - 1;

        if (decAmount <= 1) {
          decAmount = 1;
        }

        return {
          ...curElem,
          amount: decAmount,
        };
      } else {
        return curElem;
      }
    });

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(updatedProduct));

    return { ...state, cart: updatedProduct };
  }

  // Increment item amount
  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let incAmount = curElem.amount + 1;

        return {
          ...curElem,
          amount: incAmount, // No stock limit anymore
        };
      } else {
        return curElem;
      }
    });

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(updatedProduct));

    return { ...state, cart: updatedProduct };
  }

  // Remove item from cart
  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    return {
      ...state,
      cart: updatedCart,
    };
  }

  // Clear the entire cart
  if (action.type === "CLEAR_CART") {
    // Update localStorage
    localStorage.setItem("cart", JSON.stringify([]));

    return {
      ...state,
      cart: [],
    };
  }

  // Calculate total items and total price
  if (action.type === "CART_ITEM_PRICE_TOTAL") {
    // Check if cart is empty or undefined
    if (!state.cart || state.cart.length === 0) {
      return {
        ...state,
        total_item: 0,
        total_price: 0,
      };
    }

    let { total_item, total_price } = state.cart.reduce(
      (accum, curElem) => {
        let { price, amount } = curElem;

        accum.total_item += amount;
        accum.total_price += price * amount;

        return accum;
      },
      {
        total_item: 0,
        total_price: 0,
      }
    );

    return {
      ...state,
      total_item,
      total_price,
    };
  }

  return state;
};

export default cartReducer;
