const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS": {
      // Defensive: ensure payload is an array
      const productsArr = Array.isArray(action.payload) ? action.payload : [];
      let priceArr = productsArr.map((curElem) => curElem.price);
      let maxPrice = priceArr.length > 0 ? Math.max(...priceArr) : 0;
      return {
        ...state,
        filter_products: [...productsArr],
        all_products: [...productsArr],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };
    }

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];

      const { text, category, price } = state.filters;

      // Filter by text (search)
      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) =>
          curElem.name.toLowerCase().includes(text.toLowerCase())
        );
      }

      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.category === category
        );
      }

      if (price === 0) {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price === price
        );
      } else {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem.price <= price
        );
      }

      return {
        ...state,
        filter_products: tempFilterProduct,
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          maxPrice: 0,
          price: state.filters.maxPrice,
          minPrice: state.filters.maxPrice,
        },
      };

    case "SORTING_PRODUCTS":
      let newSortData;

      const { filter_products, sortBy } = state;
      let tempSortProduct = [...filter_products];

      if (action.payload === "lowest") {
        newSortData = tempSortProduct.sort((a, b) => a.price - b.price);
      }

      if (action.payload === "highest") {
        newSortData = tempSortProduct.sort((a, b) => b.price - a.price);
      }

      if (action.payload === "a-z") {
        newSortData = tempSortProduct.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }

      if (action.payload === "z-a") {
        newSortData = tempSortProduct.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }

      return {
        ...state,
        sortBy: action.payload,
        filter_products: newSortData,
      };

    default:
      return state;
  }
};

export default filterReducer;
