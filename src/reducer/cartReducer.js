const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { _id, amount, image, category, price, name, slug } = action.payload;

    // Safety check to ensure state.cart is not null or undefined
    if (!state.cart) {
      state.cart = [];
    }

    // Tackle the existing product
    let existingProduct = state.cart.find(
      (curItem) => curItem._id === _id
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem._id === _id) {
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
      localStorage.setItem("bazarCart", JSON.stringify(updatedProduct));

      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct = {
        _id,
        name,
        amount,
        image,
        price,
        category,
        slug
      };

      let updatedCart = [...state.cart, cartProduct];

      // Update localStorage
      localStorage.setItem("bazarCart", JSON.stringify(updatedCart));

      return {
        ...state,
        cart: updatedCart,
      };
    }
  }

  // Decrement item amount
  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem._id === action.payload) {
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
    localStorage.setItem("bazarCart", JSON.stringify(updatedProduct));

    return { ...state, cart: updatedProduct };
  }

  // Increment item amount
  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem._id === action.payload) {
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
    localStorage.setItem("bazarCart", JSON.stringify(updatedProduct));

    return { ...state, cart: updatedProduct };
  }

  // Remove item from cart
  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem._id !== action.payload
    );

    // Update localStorage
    localStorage.setItem("bazarCart", JSON.stringify(updatedCart));

    return {
      ...state,
      cart: updatedCart,
    };
  }

  // Clear the entire cart
  if (action.type === "CLEAR_CART") {
    // Update localStorage
    localStorage.setItem("bazarCart", JSON.stringify([]));

    return {
      ...state,
      cart: [],
    };
  }

  // Calculate total items, total price, and shipping price
  if (action.type === "CART_ITEM_PRICE_TOTAL") {
    // Check if cart is empty or undefined
    if (!state.cart || state.cart.length === 0) {
      return {
        ...state,
        total_item: 0,
        total_price: 0,
        shippingPrice: 0,
        taxPrice: 0,
        itemsPrice: 0,
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

    // Calculate itemsPrice, shippingPrice, taxPrice
    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    const itemsPrice = round2(total_price);
    const shippingPrice = itemsPrice > 100 ? round2(0) : round2(10);
    const taxPrice = round2(0.02 * itemsPrice);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return {
      ...state,
      total_item,
      total_price,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
  }

  // Set user info (for login/signup)
  if (action.type === "SET_USER_INFO") {
    localStorage.setItem("userInfo", JSON.stringify(action.payload));
    return {
      ...state,
      userInfo: action.payload,
    };
  }

  // Set shipping address
  if (action.type === "SET_SHIPPING_ADDRESS") {
    localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    return {
      ...state,
      shippingAddress: action.payload,
    };
  }

  // Set payment method
  if (action.type === "SET_PAYMENT_METHOD") {
    localStorage.setItem("paymentMethod", action.payload);
    return {
      ...state,
      paymentMethod: action.payload,
    };
  }

  // Add this to your reducer:
  if (action.type === "USER_SIGNIN") {
    localStorage.setItem("userInfo", JSON.stringify(action.payload));
    return {
      ...state,
      userInfo: action.payload,
    };
  }

  if (action.type === "USER_SIGNOUT") {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");

    return {
      ...state,
      userInfo: {},
      shippingAddress: {},
      paymentMethod: null,
    };
  }


  return state;
};

export default cartReducer;
