import { useContext, useLayoutEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// import { CUSTOMERS } from '../data/dummy-data';
import CustomarGrid from '../components/CustomarGrid';
import { PrdctContext } from '../store/product-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomersOverview = ({ navigation, route }) => {
  const prdctCtx = useContext(PrdctContext);

  const custmrId = route.params?.custmrId;

  async function findCustmr() {
    const result = await AsyncStorage.getItem('Customers');
    const newCustomer = JSON.parse(result);
    // console.log(newCustomer);
    if (newCustomer !== null) {
      prdctCtx.setPrdcts(newCustomer);
    }
  }

  useLayoutEffect(() => {
    findCustmr();
  }, []);

  function addCustomerHandler() {
    navigation.navigate('AddCustomer', {
      custmrId: custmrId,
    });
  }

  function renderCustomers(itemData) {
    return (
      <CustomarGrid
        id={itemData.item.id}
        name={itemData.item.name}
        cellNo={itemData.item.cellNo}
        address={itemData.item.address}
        imageUrl={itemData.item.imageUrl}
      />
    );
  }

  let content = <Text style={styles.infoText}>No Customers Added Yet</Text>;

  if (prdctCtx.customers.length > 0) {
    content = (
      <FlatList
        data={prdctCtx.customers}
        keyExtractor={item => item.id}
        renderItem={renderCustomers}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={addCustomerHandler}>
        <View style={styles.touchable}>
          <Text style={styles.textTouchable}>Add New Customer</Text>
        </View>
      </TouchableOpacity>
      {/* <View>
        <Text>sample text</Text>
      </View> */}
      {content}
    </View>
  );
};

export default CustomersOverview;

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
