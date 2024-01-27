import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { useContext, useState } from 'react';

import { PrdctContext } from '../store/product-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCustomerScreen = ({ navigation, route }) => {
  const targetCustmrId = route.params?.custmrId;

  const prdctCtx = useContext(PrdctContext);

  const [inputValues, setInputValues] = useState({
    name: '',
    cellNo: '',
    address: '',
    imageUrl: '',
  });

  function InputChangeHandler(inputIdentifier, enteredName) {
    setInputValues(curInputValues => {
      return { ...curInputValues, [inputIdentifier]: enteredName };
    });
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function deleteCustomerHandler() {
    prdctCtx.deleteProduct(targetCustmrId);

    let usersJSON = await AsyncStorage.getItem('Customers');
    let usersArray = JSON.parse(usersJSON);

    let alteredUsers =
      usersArray !== null
        ? usersArray.filter(function (e) {
            return e.id !== targetCustmrId;
          })
        : null;

    AsyncStorage.setItem('Customers', JSON.stringify(alteredUsers));

    navigation.goBack();
  }

  async function confirmCustomerHandler() {
    // let aaa = await AsyncStorage.removeItem('Customers');
    // console.log(aaa);
    let usersJSON = await AsyncStorage.getItem('Customers');
    let usersArray = JSON.parse(usersJSON);
    let newId = 1;

    if (usersArray && usersArray.length) {
      newId = usersArray[0].id + 1;
    }
    // let newId = usersArray.length ? usersArray[0].id + 1 : 0;

    // console.log(usersArray);

    const customerData = {
      // id: Math.random().toString().slice(2, 6),
      id: newId,
      name: inputValues.name,
      cellNo: +inputValues.cellNo,
      imageUrl: inputValues.imageUrl,
      address: inputValues.address,
    };

    const nameIsValid =
      isNaN(customerData.name) && customerData.name.trim().length > 0;
    const cellNoIsValid =
      !isNaN(customerData.cellNo) && customerData.cellNo > 0;
    const imageUrlIsValid = customerData.imageUrl.trim().length > 0;
    const addressIsValid = customerData.address.trim().length > 0;

    if (!nameIsValid || !cellNoIsValid || !imageUrlIsValid || !addressIsValid) {
      Alert.alert('Invalid inputs', 'Please cheack yours inputs values');
      return;
    }
    if (usersArray == null) {
      usersArray = [];
    }
    const updatedCustomers = [customerData, ...usersArray];

    prdctCtx.addCustomer(customerData);

    await AsyncStorage.setItem('Customers', JSON.stringify(updatedCustomers));

    navigation.goBack();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <View>
            <Text style={styles.labelText}>Enter Your Image Url</Text>
            <TextInput
              style={styles.inpults}
              placeholder="image url"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={InputChangeHandler.bind(this, 'imageUrl')}
              value={inputValues.imageUrl}
            />
          </View>
          <View>
            <Text style={styles.labelText}>Enter Customers Name</Text>
            <TextInput
              style={styles.inpults}
              placeholder="Customers name"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
              onChangeText={InputChangeHandler.bind(this, 'name')}
              value={inputValues.name}
            />
          </View>
          <View>
            <Text style={styles.labelText}>Enter Phone Number</Text>
            <TextInput
              style={styles.inpults}
              placeholder="Mobile/Phone No"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={11}
              onChangeText={InputChangeHandler.bind(this, 'cellNo')}
              value={inputValues.cellNo}
            />
          </View>
          <View>
            <Text style={styles.labelText}>Enter Address</Text>
            <TextInput
              style={styles.inpults}
              placeholder="Address"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={12}
              onChangeText={InputChangeHandler.bind(this, 'address')}
              value={inputValues.address}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={cancelHandler}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteCustomerHandler}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Delete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmCustomerHandler}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Confirm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddCustomerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  labelText: {
    fontSize: 16,
    paddingLeft: 18,
    paddingVertical: 8,
  },
  inpults: {
    height: 32,
    width: '90%',
    paddingHorizontal: 12,
    backgroundColor: '#80aae1',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0369a1',
    alignSelf: 'center',
  },
  button: {
    width: 200,
    height: 42,
    backgroundColor: '#4e89ee',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0369a1',
    alignSelf: 'center',
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 16,
    color: '#c8d5ed',
  },
});
