import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';

const ButtonLogin = ({text, backgroundcolor, color, onPress, iconname, iconcolor}) => {
    return(
        <TouchableOpacity onPress={onPress} style={[styles.buttoncontainer, {backgroundColor: backgroundcolor}]}>
            <Ionicons name={iconname} size={32} color={iconcolor} />
            <Text style={{color: color, fontSize: scale(16), fontWeight: "bold", marginLeft: 10}}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttoncontainer: {
        width: "80%",
        alignItems: "center",
        paddingVertical: 25,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        paddingLeft: "5%",
        marginBottom: 15
    },

});


export default ButtonLogin