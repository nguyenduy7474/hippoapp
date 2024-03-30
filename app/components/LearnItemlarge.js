import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { subtextcolor, themeColor, themeColor2 } from '../contants/style';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { scale } from 'react-native-size-matters';
import LottieView from 'lottie-react-native';

export default function LearnItemLarge({ title, description, imagesrc, iconposition, onpress, color, style, disabled = false, complete }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={() => onpress()} disabled={disabled}>
      <LinearGradient
        // Button Linear Gradient
        colors={color}
        style={styles.containerlinear}
        start={[0, 0]}
        end={[1, 0]}
      >
        {complete ? (
          <LottieView
            autoPlay={true}
            loop={false}
            style={{
              width: scale(70),
              position: "absolute",
              left: scale(0),
              top: scale(0),
              zIndex: 10000,
            }}
            source={require('../../assets/lottie/complete.json')}
          />
        ): null}

        <Image
          source={imagesrc}
          style={[styles.icon, {
            top: iconposition == "top" ? -10 : 0,
          }]}
        />
        <View style={styles.leftside}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          {disabled ? (
            <Text style={{ color: "#780000", fontWeight: "bold", fontSize: scale(18) }}>Coming soon</Text>
          ) : ""}
        </View>
      </LinearGradient>


    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  containerlinear: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center"
  },
  leftside: {
    alignItems: "center"
  },
  title: {
    fontSize: scale(28),
    fontWeight: "bold",
    color: "white",
    marginBottom: 10
  },
  description: {
    fontSize: scale(14),
    color: subtextcolor
  },
  icon: {
    width: 120,
    height: 120,
  }
})
