import { useContext, useLayoutEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import TitleBox from '../components/TitleBox';

import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrdctContext } from '../store/product-context';

const OrderManageScreen = ({ navigation, route }) => {
  const prdctCtx = useContext(PrdctContext);

  const targetOrderId = route.params?.orderId;

  const [products, setProducts] = useState({});
  const [customers, setCustomers] = useState({});

  const [productRows, setProductRows] = useState([]);

  const [selectedCustomers, setSelectedCustomers] = useState('');

  const [quantityValues, setQuantityValues] = useState([]);
  const [selectedPrdcts, setSelectedPrdcts] = useState([]);

  const getData = async () => {
    let products = await AsyncStorage.getItem('products');
    if (products) {
      let productArr = JSON.parse(products);
      let productSelect = [];
      productArr.forEach(item => {
        productSelect.push({
          key: item.id,
          value: item.name,
        });
      });

      setProducts(productSelect);
    }

    let customers = await AsyncStorage.getItem('Customers');
    if (customers) {
      let customersArr = JSON.parse(customers);
      let customersSelect = [];
      customersArr.forEach(item => {
        customersSelect.push({
          key: item.id,
          value: item.name,
        });
      });

      setCustomers(customersSelect);
    }
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const addNewProducRowtHandler = () => {
    const newProductRow = {};

    setProductRows(prevRows => [...prevRows, newProductRow]);
  };

  const handleCustomerSelect = selectedItem => {
    setSelectedCustomers(selectedItem);
  };

  const onChangeQuantity = (item, index) => {
    let newStateQ = [...quantityValues];
    newStateQ[index] = item;
    setQuantityValues(newStateQ);
  };

  const onChangeProducts = (item, index) => {
    let newStateP = [...selectedPrdcts];
    newStateP[index] = item;
    setSelectedPrdcts(newStateP);
  };

  async function saveOrderHandler() {
    let usersJSON = await AsyncStorage.getItem('Orders');
    let usersArray = JSON.parse(usersJSON);
    let newId = 1;

    if (usersArray && usersArray.length) {
      newId = usersArray[0].id + 1;
    }

    const orderData = {
      id: newId,
      customerName: selectedCustomers,
      products: selectedPrdcts.map((product, index) => ({
        productId: product.index,
        prodctName: selectedPrdcts[index],
        quantity: quantityValues[index],
      })),
    };

    // console.log(orderData);

    const custmrNameIsValid = isNaN(orderData.customerName) === 'string';
    const prdctNameIsValid = orderData.products.every(
      product => isNaN(product.prodctName) === 'string'
    );
    const quantityIsValid = orderData.products.every(
      product => !isNaN(product.quantity) && product.quantity > 0
    );

    if (prdctNameIsValid || custmrNameIsValid || !quantityIsValid) {
      Alert.alert('Invalid inputs', 'Please check your input values');
      return;
    }

    if (usersArray == null) {
      usersArray = [];
    }

    const updatedOrders = [orderData, ...usersArray];

    prdctCtx.addOrders(orderData);

    await AsyncStorage.setItem('Orders', JSON.stringify(updatedOrders));

    navigation.navigate('OrdersOverview');

    // setQuantityValues([]);
    // setSelectedPrdcts([]);
  }

  async function deleteOrderHandler() {
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
                  return e.id !== targetOrderId;
                })
              : null;

          AsyncStorage.setItem('Orders', JSON.stringify(alteredUsers));

          prdctCtx.deleteProduct(targetOrderId);
          navigation.navigate('OrdersOverview');
        },
      },
    ]);
  }

  const renderRow = ({ item, index }) => {
    return (
      <View style={styles.textInputContainer} id={item.id}>
        <SelectList
          boxStyle={styles.pdBoxStyle}
          data={products}
          placeholder="Select Product"
          setSelected={item => onChangeProducts(item, index)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Quantity"
          keyboardType="decimal-pad"
          maxLength={4}
          onChangeText={text => onChangeQuantity(text, index)}
          value={quantityValues[index]}
        />
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <View>
        <View style={styles.titleBox}>
          <TitleBox>Order Information</TitleBox>
        </View>
        <View style={styles.pdContainer}>
          <Text>Cusyomer Selection</Text>
          <SelectList
            boxStyle={styles.pdBoxStyle}
            data={customers}
            placeholder="Cutomer Name"
            setSelected={handleCustomerSelect}
          />
        </View>
        <View style={styles.midSection}>
          <View style={styles.addPrdctButton}>
            <TouchableOpacity onPress={addNewProducRowtHandler}>
              <Text>Add more Product</Text>
            </TouchableOpacity>
          </View>
          {selectedCustomers && (
            <FlatList
              data={[selectedCustomers, ...productRows]}
              renderItem={renderRow}
              keyExtractor={(item, index) => index}
            />
          )}
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={saveOrderHandler}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>SAVE</Text>
            {/* <Ionicons name={icon} size={size} color={color} /> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteOrderHandler}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>DELETE</Text>
            {/* <Ionicons name={icon} size={size} color={color} /> */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderManageScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#abc7ed',
    justifyContent: 'space-around',
    padding: 24,
    marginVertical: 30,
  },
  titleBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 70,
  },
  pdContainer: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  midSection: {
    height: 300,
  },
  addPrdctButton: {
    width: 160,
    height: 26,
    backgroundColor: '#80aae1',
    borderWidth: 1,
    borderColor: '#1563e9',
    borderRadius: 6,
    paddingHorizontal: 20,
    marginLeft: 20,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 0.7,
    borderRadius: 8,
    borderColor: '#1563e9',
    marginVertical: 4,
  },
  pdBoxStyle: {
    backgroundColor: '#80aae1',
    paddingHorizontal: 15,
    borderWidth: 0.7,
    borderRadius: 10,
    borderColor: 'grey',
    maxWidth: 140,
    minWidth: 140,
    height: 45,
    alignItems: 'center',
  },
  buttonContainer: {
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 24,
    marginVertical: 12,
    backgroundColor: '#1563e9',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#b8e0f2',
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    margin: 6,
    textAlign: 'center',
  },
});
