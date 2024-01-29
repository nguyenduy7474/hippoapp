import { View, SafeAreaView, StatusBar } from 'react-native';
import { tabbarcolor, themeColor } from '../contants/style';
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight;

export default function StatusBarComponent({ color }) {
  return (
      <View style={{height: StatusBar.currentHeight || statusBarHeight, backgroundColor: color || tabbarcolor}}>
        <StatusBar
            barStyle={color ? "dark-content" : "light-content"}
        />
      </View>
  );
}
