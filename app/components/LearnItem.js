import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { subtextcolor, themeColor, themeColor2 } from '../contants/style';
import { Image } from 'expo-image';

export default function LearnItem({ title, description, imagesrc, iconposition, onpress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onpress()}>
      <View style={styles.leftside}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Image 
        source={imagesrc}
        style={[styles.icon, {
          top: iconposition == "top" ? -10 : 0,
        }]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColor2,
    marginHorizontal: 10,
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  },
  leftside: {
    width: "70%"
  },
  title:{
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10
  },
  description: {
    fontSize: 14,
    color: subtextcolor
  },
  icon:{
    width: 120,
    height: 120,
    position: "absolute",
    right: 8,
    top: -10
  }
})
