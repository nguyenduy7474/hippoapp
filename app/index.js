import { useState, useLayoutEffect } from "react";
import CheckLogin from "./utils/checklogined";
import { router } from 'expo-router';
import HomePage from "./containers/Home";
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';

export default function ContainerPage() {
  useLayoutEffect(() => {
    CheckLogin().then((check) => {
      if(!check){
        router.replace('/containers/Login');
        return
      }
    })
  }, [])


  return (
    <NavigationContainer independent={true}>
      <HomePage />
    </NavigationContainer>
  );
}

registerRootComponent(ContainerPage)
