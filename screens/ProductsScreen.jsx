import { useContext, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import PdItemGrid from '../components/PdItemGrid';
import { PrdctContext } from '../store/product-context';
// import { fetchProduct } from '../util/http';
// import LoadingOverlay from '../util/LoadingOverlay';
// import ErrorOverlay from '../util/ErrorOvrlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ navigation, route }) => {
  const prdctCtx = useContext(PrdctContext);

  // const [isFetching, setIsFetching] = useState(true);
  // const [errorr, setErrorr] = useState();

  // const [fetchedPrdct, setFetchedPrdct] = useState([]);

  const prdctId = route.params?.prdctId;

  async function findPrdcts() {
    const result = await AsyncStorage.getItem('products');
    const newprdcts = JSON.parse(result);
    // console.log(newprdcts);
    if (newprdcts !== null) {
      prdctCtx.setPrdcts(newprdcts);
    }
  }

  useLayoutEffect(() => {
    findPrdcts();
    // async function getPrdct() {
    //   setIsFetching(true);
    //   try {
    //     const products = await fetchProduct();
    //     prdctCtx.setPrdcts(products);
    //   } catch (error) {
    //     setErrorr('An error occured');
    //   }
    //   setIsFetching(false);
    //   // setFetchedPrdct(products);
    // }
    // getPrdct();
  }, []);

  // if (errorr && !isFetching) {
  //   return <ErrorOverlay message={errorr} />;
  // }

  // if (isFetching) {
  //   return <LoadingOverlay />;
  // }

  function addProductHandler() {
    navigation.navigate('AddProduct', {
      prdctId: prdctId,
    });
  }

  function renderProductItem(itemData) {
    return (
      <PdItemGrid
        id={itemData.item.id}
        name={itemData.item.name}
        price={itemData.item.price}
        imageUrl={itemData.item.imageUrl}
      />
    );
  }

  let content = <Text style={styles.infoText}>No Products Added Yet</Text>;

  if (prdctCtx.products.length > 0) {
    content = (
      <FlatList
        data={prdctCtx.products}
        keyExtractor={item => item.id}
        renderItem={renderProductItem}
      />
    );
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={addProductHandler}>
          <View style={styles.touchable}>
            <Text style={styles.textTouchable}>Add New Product</Text>
          </View>
        </TouchableOpacity>
        {content}
      </View>
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  touchable: {
    flexDirection: 'row',
    backgroundColor: '#4e89ee',
    borderWidth: 1,
    borderColor: '#0369a1',
    borderRadius: 8,
    marginTop: 32,
    marginBottom: 16,
    elevation: 8,
  },
  textTouchable: {
    fontSize: 20,
    color: '#c8d5ed',
    paddingHorizontal: 65,
    paddingVertical: 12,
  },
  infoText: {
    color: '#0369a1',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 50,
  },
});
