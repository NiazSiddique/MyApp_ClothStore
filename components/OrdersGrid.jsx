import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
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

import { PrdctContext } from '../store/product-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import SubOrderGrid from './subOrderGrid';

// import { useTotalExpense } from '../store/product-context';

const OrderGrid = ({ id, customerName, products }) => {
  const prdctCtx = useContext(PrdctContext);

  const navigation = useNavigation();

  const [customerData, setCustomerData] = useState('');
  const [totalExpense, setTotalExpense] = useState(0);

  const findCustomerName = async id => {
    const result = await AsyncStorage.getItem('Customers');
    const allCustomers = JSON.parse(result);
    // console.log(allCustomers);

    const customer = allCustomers.find(c => c.id === id);

    if (customer && customer.name) {
      setCustomerData(customer.name);
    }
  };

  // const cusTrgtName = customerName[0] ? customerName[0] : null;

  useLayoutEffect(() => {
    if (customerName) {
      findCustomerName(customerName);
    }
    // updateTotalExpense();
  }, []);

  function orderPressHandler() {
    navigation.navigate('Orders', { orderId: id });
  }

  function deleteOrderByLongPress() {
    Alert.alert('Delete Order ', 'Do yo really want to delete this order', [
      {
        text: 'Cancel',
        onPress: () => {},
        // style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          let usersJSON = await AsyncStorage.getItem('Orders');
          let usersArray = JSON.parse(usersJSON);

          let alteredUsers =
            usersArray !== null
              ? usersArray.filter(function (e) {
                  return e.id !== id;
                })
              : null;

          AsyncStorage.setItem('Orders', JSON.stringify(alteredUsers));

          prdctCtx.deleteProduct(id);
          navigation.goBack();
          navigation.navigate('OrdersOverview');
        },
      },
    ]);
  }

  function updateTotalExpense(cost) {
    console.log(cost);
    setTotalExpense(prevTotalExpense => prevTotalExpense + cost);
  }

  // useEffect(() => {
  //   let expense = 0;
  //   products.forEach(product => {
  //     expense += product.price * product.quantity;
  //   });
  //   setTotalExpense(expense);
  // }, [products]);

  // const updateTotalExpense = () => {
  //   let expense = 0;
  //   products.forEach(product => {
  //     expense += product.price * product.quantity;
  //   });
  //   setTotalExpense(expense);
  // };

  // useEffect(() => {
  //   updateTotalExpense();
  // }, []);

  function renderItemProduct(prdct) {
    return (
      <SubOrderGrid
        productId={prdct.item.id}
        prodctName={prdct.item.prodctName}
        quantity={prdct.item.quantity}
        // sumPrice={prdct.item.sumPrice}
        updateTotalExpense={updateTotalExpense}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={orderPressHandler}
        onLongPress={deleteOrderByLongPress}
      >
        <View style={styles.customerNameContainer}>
          <Text style={styles.nameText}>
            {/* {id} */}
            {customerData}
          </Text>
        </View>
        <View>
          <FlatList
            data={products}
            renderItem={renderItemProduct}
            keyExtractor={(item, index) => index}
          />
        </View>
      </Pressable>
      <View style={styles.expenseBox}>
        <Text style={styles.expenseText}>
          Total Expense : {totalExpense} tk
        </Text>
      </View>
      <View style={styles.deleteTextcontainer}>
        <Text style={styles.deleteText}>long press for Delete order</Text>
      </View>
    </View>
  );
};
export default OrderGrid;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#0369a1',
    marginVertical: 12,
    marginHorizontal: 8,
    backgroundColor: '#85aee3',
    elevation: 8,
  },
  customerNameContainer: {
    backgroundColor: '#0369a1',
    borderRadius: 6,
    marginTop: 10,
    marginLeft: 185,
    marginHorizontal: 10,
    width: '50%',
    padding: 6,
  },
  nameText: {
    color: '#85aee3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  expenseBox: {
    backgroundColor: '#fff',
    marginBottom: 6,
  },
  expenseText: {
    color: '#e6580c',
    textAlign: 'center',
  },
  deleteTextcontainer: {
    backgroundColor: '#0369a1',
  },
  deleteText: {
    color: '#e39c85',
    fontSize: 14,
    marginHorizontal: 16,
  },
});
