import { useState, useLayoutEffect } from "react";
import CheckLogin from "./utils/checklogined";
import { router } from 'expo-router';
import HomePage from "./containers/Home";
import { NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import ListWords from "./containers/ListWords";

export default function ContainerPage() {
  const [signed, setSigned] = useState(false)

  useLayoutEffect(() => {
    CheckLogin().then((check) => {
      if(check){
        setSigned(true)
      }else{
        router.replace('/containers/Onboard');
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
