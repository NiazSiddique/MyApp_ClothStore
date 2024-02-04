import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useTotalExpense } from '../store/product-context';
// import { PrdctContext } from '../store/product-context';

function SubOrderGrid({ productId, prodctName, quantity, updateTotalExpense }) {
  const [productDatas, setProductDatas] = useState('');
  const [productImageData, setProductImageData] = useState('#');
  const [productCostData, setProductCostData] = useState('');
  // const [productQuantity, setProductQuantity] = useState([]);

  const findProductImage = async id => {
    try {
      const result = await AsyncStorage.getItem('products');
      const allProducts = JSON.parse(result);
      // console.log(allProducts);

      const product = allProducts.find(c => c.id === id);
      // console.log(product.imageUrl);

      if (product && product.imageUrl) {
        setProductImageData(product.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching customer name:', error);
    }
  };

  const findProductName = async id => {
    try {
      const result = await AsyncStorage.getItem('products');
      const allProducts = JSON.parse(result);
      // console.log(allProducts);

      const product = allProducts.find(c => c.id === id);
      // console.log(customer.name);

      if (product && product.name) {
        setProductDatas(product.name);
      }
    } catch (error) {
      console.error('Error fetching customer name:', error);
    }
  };

  const findProductRate = async id => {
    const result = await AsyncStorage.getItem('products');
    const allProducts = JSON.parse(result);
    // console.log(allProducts);

    const product = allProducts.find(c => c.id === id);

    if (product && product.price) {
      setProductCostData(product.price);
    }
  };

  useLayoutEffect(() => {
    findProductName(prodctName);
    findProductImage(prodctName);
    findProductRate(prodctName);
    // findProductQuantity(prodctName);
    // const totalCost = productCostData * quantity;
    updateTotalExpense(totalCost);
  }, []);

  // useEffect(() => {
  //   const calculateTotalCost = async () => {
  //     const totalCost = productCostData * quantity;
  //     if (!isNaN(totalCost)) {
  //       updateTotalExpense(totalCost);
  //     }
  //   };

  //   calculateTotalCost();
  // }, [productCostData, quantity, updateTotalExpense]);

  const totalCost = productCostData * quantity;

  return (
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: productImageData,
        }}
        alt="Product image"
        style={styles.image}
      />
      <View>
        <Text style={styles.prdctNameText}>{productDatas}</Text>
        <Text style={styles.prdctAmountTextA}>Price: {productCostData}</Text>
        <Text style={styles.prdctAmountTextA}>total Cost :</Text>
        <Text style={styles.prdctAmountText}>
          tk.{totalCost} ({quantity}pcs)
        </Text>
      </View>
      <View style={styles.quantityBox}>
        <Text style={styles.quantityText}> Quantity </Text>
        <Text style={styles.noOfPrdctText}>
          {quantity}
          <Text style={styles.pcsText}>pcs</Text>
        </Text>
      </View>
    </View>
  );
}

export default SubOrderGrid;

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 95,
    height: 100,
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  prdctNameText: {
    fontSize: 18,
    color: '#0369a1',
  },
  prdctAmountTextA: {
    borderBottomWidth: 0.75,
  },
  prdctAmountText: {
    fontSize: 16,
  },
  quantityBox: {
    borderWidth: 0.85,
    alignItems: 'center',
    marginRight: 16,
    borderColor: '#0369a1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  quantityText: {
    fontSize: 16,
    color: '#0369a1',
  },
  noOfPrdctText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  pcsText: {
    fontSize: 16,
    color: '#0369a1',
    fontWeight: 'normal',
  },
});
