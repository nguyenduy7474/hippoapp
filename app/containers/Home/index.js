import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListWords from '../ListWords/index'
import Schedule from '../Schedule/index'
import LearnNow from '../LearnNow/index'
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { tabbarcolor } from '../../contants/style';
import * as Device from 'expo-device';
import i18n from '../../i18n';

const Tab = createBottomTabNavigator();

const HomePage = () => {
  const borderRadius = 15
  const iconSizePlus = Device.osName == "Android" ? 0 : 15

  return (
    <Tab.Navigator   screenOptions={{
      tabBarStyle: { 
        height: Device.osName == "Android" ? 60 : 100,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#d1d1d1"
      },
    }}>
      <Tab.Screen 
        name="/containers/ListWords"
        component={ListWords} 
        options={{
          headerShown: false,
          tabBarLabel: `${i18n.t('words')}`,
          tabBarLabelStyle: {
            fontSize: 14,
            marginBottom: 3,
            fontWeight: "bold"
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              style={{width: size + iconSizePlus, height: size + iconSizePlus}}
              source={focused ? require('../../../assets/images/bookopen.png') : require('../../../assets/images/bookclose.png')}
              transition={1000}
            />
          ),
          tabBarItemStyle: {
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            borderBottomLeftRadius: Device.osName == "Android" ? 0 : borderRadius,
            borderBottomRightRadius : Device.osName == "Android" ? 0 : borderRadius,
          },
          tabBarActiveBackgroundColor: tabbarcolor,
          tabBarActiveTintColor: "white",
        }}
      />
      <Tab.Screen 
        name="/containers/LearnNow" 
        component={LearnNow} 
        options={{
          headerShown: false,
          tabBarLabel: `${i18n.t('learn')}`,
          tabBarLabelStyle: {
            fontSize: 14,
            marginBottom: 3,
            fontWeight: "bold"
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              style={{width: size + iconSizePlus, height: size + iconSizePlus}}
              source={focused ? require('../../../assets/images/learningfocus.png') : require('../../../assets/images/learningoutfocus.png')}
              transition={1000}
            />
          ),
          tabBarItemStyle: {
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            borderBottomLeftRadius: Device.osName == "Android" ? 0 : borderRadius,
            borderBottomRightRadius : Device.osName == "Android" ? 0 : borderRadius,
          },
          tabBarActiveBackgroundColor: tabbarcolor,
          tabBarActiveTintColor: "white"
        }}
      />
      <Tab.Screen 
        name="/containers/Schedule" 
        component={Schedule} 
        options={{
          headerShown: false,
          tabBarLabel: `${i18n.t('schedule')}`,
          tabBarLabelStyle: {
            fontSize: 14,
            marginBottom: 3,
            fontWeight: "bold"
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Image 
              style={{width: size + iconSizePlus, height: size + iconSizePlus}}
              source={focused ? require('../../../assets/images/schedulefocus.png') : require('../../../assets/images/scheduleoutfocus.png')}
              transition={1000}
            />
          ),
          tabBarItemStyle: {
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            borderBottomLeftRadius: Device.osName == "Android" ? 0 : borderRadius,
            borderBottomRightRadius : Device.osName == "Android" ? 0 : borderRadius,
          },
          tabBarActiveBackgroundColor: tabbarcolor,
          tabBarActiveTintColor: "white"
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default HomePage
