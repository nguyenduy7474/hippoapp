import { View, SafeAreaView, StatusBar } from 'react-native';
import { themeColor } from '../contants/style';
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight;

export default function StatusBarComponent({ color }) {
  return (
      <View style={{height: StatusBar.currentHeight || statusBarHeight, backgroundColor: color || themeColor}}>
        <StatusBar
            barStyle={color ? "dark-content" : "dark-content"}
        />
      </View>
  );
}
