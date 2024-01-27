import { useNavigation } from '@react-navigation/native';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const PdItemGrid = ({ id, name, price, imageUrl }) => {
  const navigation = useNavigation();

  function productPressHandler() {
    navigation.navigate('AddProduct', { prdctId: id });
  }

  return (
    <View style={styles.root}>
      <Pressable
        android_ripple={{ color: '#3183af' }}
        onPress={productPressHandler}
      >
        <View style={styles.container}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>
              {/* {id}  */}
              {name}
            </Text>
            <Text style={styles.textP}>{`BDT-${price}`}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default PdItemGrid;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#0369a1',
    marginVertical: 16,
    backgroundColor: '#85aee3',
    elevation: 8,
  },
  container: {
    width: 290,
    height: 250,
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'stretch',
  },
  textContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  text: {
    fontSize: 16,
    color: '#033a58',
  },
  textP: {
    fontSize: 16,
    color: '#033a58',
    marginLeft: 76,
  },
});
