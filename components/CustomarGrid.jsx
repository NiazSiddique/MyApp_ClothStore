import { useNavigation } from '@react-navigation/native';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

const CustomarGrid = ({ id, name, cellNo, address, imageUrl }) => {
  const navigation = useNavigation();

  function customerPressHandler() {
    navigation.navigate('AddCustomer', { custmrId: id });
  }

  return (
    <TouchableOpacity onPress={customerPressHandler}>
      <View style={styles.container}>
        <View>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {/* {id}  */}
            {name}
          </Text>
          <Text style={styles.text}>{cellNo}</Text>
          <Text style={styles.text}> {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomarGrid;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    maxWidth: 380,
    padding: 16,
    marginVertical: 12,
    marginHorizontal: 12,
    alignItems: 'center',
    backgroundColor: '#80aae1',
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    marginHorizontal: 4,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});
