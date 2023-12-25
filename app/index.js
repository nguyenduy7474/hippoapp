import { useState, useLayoutEffect } from "react";
import CheckLogin from "./utils/checklogin";
import { router } from 'expo-router';
import HomePage from "./containers/Home";


export default function ContainerPage() {
  const [logined, setlogined] = useState(0)
  useLayoutEffect(() => {
    CheckLogin().then((check) => {
      if(!check){
        router.replace('/containers/Login');
      }
    })
  }, [])


  return (
    <HomePage />
  );
}
