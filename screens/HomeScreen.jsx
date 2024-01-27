import { StyleSheet, Text, View } from 'react-native';

import HomeIconType from '../components/HomeIconType';

const HomeScreen = ({ navigation }) => {
  function productPressHandler() {
    navigation.navigate('AllProducts');
  }

  function customerPressHandler() {
    navigation.navigate('Customers');
  }

  function orderPressHandler() {
    navigation.navigate('Orders');
  }

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <HomeIconType
          icon="shirt-outline"
          size={36}
          color="black"
          iconText={'Products'}
          onPress={productPressHandler}
        />
        <HomeIconType
          icon="people-outline"
          size={36}
          color="black"
          iconText={'Customers'}
          onPress={customerPressHandler}
        />
        <HomeIconType
          icon="cart-outline"
          size={36}
          color="black"
          iconText={'Orders'}
          onPress={orderPressHandler}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#abc7ed',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 24,
    marginHorizontal: 24,
    paddingVertical: 50,
    backgroundColor: '#1563e9',
    borderRadius: 16,
  },
});
