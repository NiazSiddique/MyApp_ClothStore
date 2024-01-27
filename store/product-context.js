import { createContext, useReducer } from 'react';

// import { DPRODUCTS } from '../data/dum-data';
// import { CUSTOMERS } from '../data/dummy-data';

export const PrdctContext = createContext({
  products: [],
  addProduct: ({ name, imageUrl, price }) => {},
  setPrdcts: products => {},
  deleteProduct: id => {},
  customers: [],
  addCustomer: ({ name, cellNo, address, imageUrl }) => {},
  allOrders: [],
  addOrders: ({
    id,
    customerName,
    products: [{ productId, prodctName, quantity }],
  }) => {},
});

function prdctReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      // return [{ ...action.payload, id: action.payload.id }, ...state];
      return [action.payload, ...state];
    case 'CUSTOMER_ADD':
      return [action.payload, ...state];
    case 'ORDER_ADD':
      return [action.payload, ...state];
    case 'SET':
      // const inverted = action.payload.reverse();
      // return inverted;
      return [...action.payload];

    case 'DELETE':
      return state.filter(prdct => prdct.id !== action.payload);
    default:
      return state;
  }
}

// function customerReduser(state, action) {
//   switch (action.type) {
//     case 'CUSTOMER_ADD':
//       return [action.payload, ...state];
//     case 'CUSTOMER_SET':
//       return [...action.payload];
//     default:
//       return state;
//   }
// }

// -------------------------------------------------------------------------------------------------------

function PrdctContextProvider({ children }) {
  const [prdctsState, dispatch] = useReducer(
    prdctReducer,
    [] /* {
    Prd: PRODUCTS,
    Cus: CUSTOMERS,
  }*/
  );

  function addProduct(prdctData) {
    dispatch({ type: 'ADD', payload: prdctData });
  }
  function addCustomer(customerData) {
    dispatch({ type: 'CUSTOMER_ADD', payload: customerData });
  }
  function addOrders(orderData) {
    dispatch({ type: 'ORDER_ADD', payload: orderData });
  }
  function setPrdcts(products) {
    dispatch({ type: 'SET', payload: products });
  }

  function deleteProduct(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  // -------------------------------------------------------

  // const [customersState, dispatchForCustomers] = useReducer(
  //   customerReduser,
  //   []
  // );

  // function addCustomer(customerData) {
  //   dispatchForCustomers({ type: 'CUSTOMER_ADD', payload: customerData });
  // }

  // function setCustomers(customers) {
  //   dispatch({ type: 'CUSTOMER_SET', payload: customers });
  // }

  const value = {
    products: prdctsState,
    setPrdcts: setPrdcts,
    addProduct: addProduct,
    deleteProduct: deleteProduct,
    // customers: customersState,
    customers: prdctsState,
    addCustomer: addCustomer,
    // setCustomers: setCustomers,
    allOrders: prdctsState,
    addOrders: addOrders,
  };

  return (
    <PrdctContext.Provider value={value}>{children}</PrdctContext.Provider>
  );
}

export default PrdctContextProvider;
