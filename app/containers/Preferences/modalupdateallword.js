import Modal from "react-native-modal";
import {
    Text, 
    View, 
    TouchableOpacity, 
    StyleSheet
} from 'react-native';
import LottieView from 'lottie-react-native';
import { colorWrong } from "../../contants/style";
import i18n from "../../i18n";
import { scale } from "react-native-size-matters";

export default function UpdateAllWord({ 
    isVisibleModal,
    loading,
    closeModal,
    accept
}) {
    return (
        <Modal isVisible={isVisibleModal}>
            {loading ? (
                <>
                    <View >
                    </View>
                    <LottieView
                        autoPlay={true}
                        style={{
                            width: scale(200),
                            position: "absolute",
                            zIndex: 10,
                            alignSelf: "center",
                            height: "100%"
                        }}
                        // Find more Lottie files at https://lottiefiles.com/featured
                        source={require('../../../assets/lottie/loading.json')}
                    />
                </>
            ) : (
                <View style={styles.modal}>

                    <Text style={styles.titleModal}>{i18n.t('update_all_word_text')}</Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity
                            style={[styles.buttonModal, { backgroundColor: "grey" }]}
                            onPress={closeModal}
                        >
                            <Text style={styles.buttonText}>{i18n.t('cancel')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonModal, { backgroundColor: colorWrong, marginLeft: 20 }]}
                            onPress={accept}
                        >
                            <Text style={styles.buttonText}>{i18n.t('update')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Modal>
    )
}

const styles = StyleSheet.create({
    buttontext: {
        color: "white",
        fontSize: scale(16),
        fontWeight: "bold"
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        paddingVertical: 30,
        alignItems: "center"
    },
    buttonModal: {
        padding: 10,
        paddingVertical: 15,
        borderRadius: 5,
        width: "40%",
        alignItems: "center"
    },
    buttonText: {
        fontSize: scale(14),
        color: "white"
    },
    titleModal: {
        fontSize: scale(16),
        marginBottom: 20
    }
})

