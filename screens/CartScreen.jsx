import React, { useContext, useLayoutEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import TitleBox from '../components/TitleBox';
import { PrdctContext } from '../store/product-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderGrid from '../components/OrdersGrid';

const CartScreen = ({ navigation, route }) => {
  const prdctCtx = useContext(PrdctContext);

  function addNewOrderHandler() {
    navigation.navigate('Orders', {
      // orderId: orderId,
    });
  }

  async function findOrders() {
    const result = await AsyncStorage.getItem('Orders');
    const allOrders = JSON.parse(result);
    // console.log(allOrders);

    if (allOrders !== null) {
      prdctCtx.setPrdcts(allOrders);
    }
  }
  useLayoutEffect(() => {
    findOrders();
  }, []);

  function renderOrders(iteminfo) {
    return (
      <OrderGrid
        id={iteminfo.item.id}
        customerName={iteminfo.item.customerName}
        products={iteminfo.item.products}
      />
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.titleBox}>
        <TitleBox>Order Details</TitleBox>
      </View>
      <TouchableOpacity onPress={addNewOrderHandler}>
        <View style={styles.touchable}>
          <Text style={styles.textTouchable}>Add New Order</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={prdctCtx.allOrders}
        keyExtractor={(item, index) => index}
        renderItem={renderOrders}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginBottom: 20,
  },
  titleBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  touchable: {
    backgroundColor: '#4e89ee',
    borderWidth: 1,
    borderColor: '#0369a1',
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 16,
    marginHorizontal: 45,
    elevation: 8,
  },
  textTouchable: {
    fontSize: 20,
    textAlign: 'center',
    color: '#c8d5ed',
    paddingHorizontal: 65,
    paddingVertical: 12,
  },
});
