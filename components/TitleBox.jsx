import { StyleSheet, Text, View, Platform } from 'react-native';

const TitleBox = ({ children }) => {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
};

export default TitleBox;

const styles = StyleSheet.create({
  title: {
    // fontFamily: 'open-sans-bold',
    fontSize: 24,
    // fontWeight: "bold",
    color: '#1563e9',
    textAlign: 'center',
    //borderWidth: Platform.OS === 'android' ? 2 : 0,
    borderWidth: Platform.select({ ios: 0, android: 1.5 }),
    borderColor: '#1563e9',
    padding: 8,
    maxWidth: '90%',
    width: 300,
    borderRadius: 6,
  },
});
