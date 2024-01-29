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
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { scale } from 'react-native-size-matters';
import { checkfirsttime } from '../../api';
import { router, useLocalSearchParams } from 'expo-router';


const Tab = createBottomTabNavigator();

const HomePage = () => {
  let { signed } = useLocalSearchParams()

  useEffect(() => {
    if(!signed){
      checkfirsttime().then((data) => {
        if(!data){
          router.replace("/containers/Onboard")
        }
      })
    }

  }, [])
  

  const borderRadius = 15

  return (
    <Tab.Navigator  
      screenOptions={({ route }) => ({
        tabBarStyle: { 
          height: Device.osName == "Android" ? 60 : 100,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          borderTopWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderColor: "#d1d1d1"
        },
        tabBarIcon: ({ focused, color, size }) => {
          const animationWord = useRef(null);
          let icon = require('../../../assets/lottie/book.json')
          let iconSize = Device.osName == "Android" ? scale(35) : scale(40)

          if(route.name === '/containers/LearnNow'){
            icon = require('../../../assets/lottie/learnnow.json')
            iconSize = Device.osName == "Android" ? scale(45) : scale(60)
          }

          if(route.name === '/containers/Schedule'){
            icon = require('../../../assets/lottie/schedule.json')
            iconSize = Device.osName == "Android" ? scale(35) : scale(50)
          }

          return (
          <LottieView
            ref={animationWord}
            style={{
              width: iconSize,
              height: iconSize,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured'
            autoPlay={focused}
            loop={false}
            progress={1}
            useNativeDriver={true}
            source={icon}
          />
      )},
    })}>
      <Tab.Screen 
        name="/containers/ListWords"
        component={ListWords} 
        options={{
          headerShown: false,
          tabBarLabel: `${i18n.t('words')}`,
          tabBarLabelStyle: {
            fontSize: scale(10),
            marginBottom: 3,
            fontWeight: "bold"
          },
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
            fontSize: scale(10),
            marginBottom: 3,
            fontWeight: "bold"
          },
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
            fontSize: scale(10),
            marginBottom: 3,
            fontWeight: "bold"
          },
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
