import { useContext, useState } from 'react';
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
import { PrdctContext } from '../store/product-context';
import { removeProduct, storeProduct } from '../util/http';
import LoadingOverlay from '../util/LoadingOverlay';
import { getData, storeData } from '../util/localStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProductScreen = ({ navigation, route }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const targetPrdctId = route.params?.prdctId;

  // const isDefined = !!targetPrdctId;

  const prdctCtx = useContext(PrdctContext);

  const [inputValues, setInputValues] = useState({
    name: '',
    price: '',
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

  async function deleteProductHandler() {
    // setIsSubmitting(true);

    let usersJSON = await AsyncStorage.getItem('products');
    let usersArray = JSON.parse(usersJSON);

    let alteredUsers =
      usersArray !== null
        ? usersArray.filter(function (e) {
            return e.id !== targetPrdctId;
          })
        : null;

    AsyncStorage.setItem('products', JSON.stringify(alteredUsers));

    prdctCtx.deleteProduct(targetPrdctId);

    navigation.goBack();
  }

  async function confirmProductHandler() {
    let usersJSON = await AsyncStorage.getItem('products');
    let usersArray = JSON.parse(usersJSON);
    let newId = 1;

    if (usersArray && usersArray.length) {
      newId = usersArray[0].id + 1;
    }
    // let newId = usersArray.length ? usersArray[0].id + 1 : 0;

    const prdctData = {
      // id: usersArray.length + Math.random().toString().slice(2, 5),

      id: newId,
      name: inputValues.name,
      price: +inputValues.price,
      imageUrl: inputValues.imageUrl,
    };

    const nameIsValid = prdctData.name.trim().length > 0;
    const priceIsValid = !isNaN(prdctData.price) && prdctData.price > 0;
    const imageUrlIsValid = prdctData.imageUrl.trim().length > 0;

    if (!nameIsValid || !priceIsValid || !imageUrlIsValid) {
      Alert.alert('Invalid inputs', 'Please cheack yours inputs values');
      return;
    }

    if (usersArray == null) {
      usersArray = [];
    }

    const updatedPrdcts = [prdctData, ...prdctCtx.products];

    prdctCtx.addProduct(prdctData);

    console.log(prdctCtx);

    await AsyncStorage.setItem('products', JSON.stringify(updatedPrdcts));

    // setIsSubmitting(true);

    // const id = await storeProduct(prdctData);

    // storeData('prdcts', prdctData).then(() => {
    //   prdctCtx.addProduct(prdctData);
    // });

    // getData('prdcts').then(value => {
    //   console.log(value);
    // });

    navigation.goBack();
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <View>
            <Text style={styles.labelText}>Enter Image Url</Text>
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
            <Text style={styles.labelText}>Enter Product Name</Text>
            <TextInput
              style={styles.inpults}
              placeholder="products name"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
              onChangeText={InputChangeHandler.bind(this, 'name')}
              value={inputValues.name}
            />
          </View>
          <View>
            <Text style={styles.labelText}>Enter Value</Text>
            <TextInput
              style={styles.inpults}
              placeholder="BDT price"
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={15}
              onChangeText={InputChangeHandler.bind(this, 'price')}
              value={inputValues.price}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={cancelHandler}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteProductHandler}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Delete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmProductHandler}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Confirm</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddProductScreen;

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
