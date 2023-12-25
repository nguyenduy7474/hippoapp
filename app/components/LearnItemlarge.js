import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { subtextcolor, themeColor, themeColor2 } from '../contants/style';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';


export default function LearnItemLarge({ title, description, imagesrc, iconposition, onpress, color, style, disabled = false }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={() => onpress()} disabled={disabled}>
      <LinearGradient
          // Button Linear Gradient
          colors={color}
          style={styles.containerlinear}
          start={[0, 0]} 
          end={[1, 0]}
      >
        <Image 
          source={imagesrc}
          style={[styles.icon, {
            top: iconposition == "top" ? -10 : 0,
          }]}
        />
        <View style={styles.leftside}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </LinearGradient>


    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  containerlinear: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center"
  },
  leftside: {
    alignItems: "center"
  },
  title:{
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    color: subtextcolor
  },
  icon:{
    width: 120,
    height: 120,
  }
})
