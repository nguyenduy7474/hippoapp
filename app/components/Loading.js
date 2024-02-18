import LottieView from 'lottie-react-native';
import { scale } from 'react-native-size-matters';

export default function Loading(){
    return (
        <LottieView
            autoPlay={true}
            style={{
                width: scale(200),
                position: "absolute",
                zIndex: 10,
                alignSelf: "center",
                height: "100%"
            }}
            source={require('../../assets/lottie/loading.json')}
        />
    )
}