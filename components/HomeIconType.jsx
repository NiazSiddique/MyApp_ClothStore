import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeIconType = ({ onPress, icon, color, size, iconText }) => {
  return (
    <View style={styles.container}>
      <Pressable android_ripple={{ color: '#1f67c5' }} onPress={onPress}>
        <View style={styles.icon}>
          <Ionicons name={icon} size={size} color={color} />
        </View>
        <View style={styles.text}>
          <Text>{iconText}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default HomeIconType;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#abc7ed',
    margin: 12,
    height: 80,
    width: 80,
    borderRadius: 8,
    elevation: 4,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
