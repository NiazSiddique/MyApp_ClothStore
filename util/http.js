// import axios from 'axios';

// const BACKEND_URL = 'https://my-clothing-app-cc0a9-default-rtdb.firebaseio.com';

// export async function storeProduct(prdctData) {
//   const response = await axios.post(BACKEND_URL + '/products.json', prdctData);
//   const id = response.data.name;

//   return id;
// }

// export async function fetchProduct() {
//   const response = await axios.get(BACKEND_URL + '/products.json');

//   const products = [];

//   for (const key in response.data) {
//     const prdctObj = {
//       id: key,
//       imageUrl: response.data[key].imageUrl,
//       name: response.data[key].name,
//       price: response.data[key].price,
//     };
//     products.push(prdctObj);
//   }
//   return products;
// }

// export function removeProduct(id) {
//   axios.delete(BACKEND_URL + `/products/${id}.json`);
// }
