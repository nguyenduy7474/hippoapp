import { Stack } from 'expo-router';
import { themeColor } from './contants/style';
import i18n from './i18n';

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerStyle:{
                backgroundColor: themeColor,
                height: 50
            },
            headerTintColor:"white",
            headerTitleStyle:{
                fontWeight: "bold"
            }
        }}>
            <Stack.Screen name="containers/Login/index" options={{headerShown: false}}/>
            <Stack.Screen name="containers/Home/index" options={{headerShown: false}}/>            
            <Stack.Screen name="index" options={{headerShown: false}} />
            <Stack.Screen name="containers/FlashCard/index" options={{
                    headerShown: false,
                    gestureDirection: "vertical",
                    gestureEnabled: true,
                }} 
            />
            <Stack.Screen name="containers/Quiz/index" options={{
                    headerShown: false,
                    gestureDirection: "vertical",
                    gestureEnabled: true,
                }} 
            />
            <Stack.Screen name="containers/Profile/index" options={{
                    headerTitle: i18n.t('settings'),
                    gestureDirection: "horizontal",
                    gestureEnabled: true
                }} 
            />
            <Stack.Screen name="containers/AddWord/index" options={{
                    headerTitle: '',
                    gestureDirection: "vertical",
                    gestureEnabled: true,
                    headerShown: false
                }} 
            />
        </Stack>

    )
}