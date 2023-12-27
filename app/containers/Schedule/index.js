import { Pressable, StyleSheet, Text, TouchableOpacity, View, LayoutAnimation, Platform } from 'react-native';
import StatusBarComponent from '../../components/StatusBar'
import TopMenu from '../../components/TopMenu';
import { LinearGradient } from 'expo-linear-gradient';
import { scale } from 'react-native-size-matters';
import { themeColor2 } from '../../contants/style';
import { useEffect, useRef, useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FlashList } from '@shopify/flash-list';
import ToggleSwitch from 'toggle-switch-react-native'

const color = ["#614385", "#516395"]
const dateWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"] 

export default function Schedule() {
    const [startTime, setStartTime] = useState(new Date("2023-01-01"))
    const [endTime, setEndTime] = useState(new Date("2025-01-01T20:00"))
    const [showstart, setShowstart] = useState(false)
    const [showend, setShowend] = useState(false)
    const [notiDay, setNotiDay] = useState([])
    const [updatenoti, setUpdatenoti] = useState(false)
    const [enabledNoti, setEnabledNoti] = useState(true)

    const openTime = (type) => {
        if(type == "start"){
            setShowstart(true)
        }else{
            setShowend(true)
        }
    }

    const changeTime = (event, value) => {
        if(showstart){
            setShowstart(false)
            setStartTime(value)
            
        }else{
            setShowend(false)
            setEndTime(value)
        }
    }

    const chooseDayWeek = (index) => {
        if(notiDay[index]){
            notiDay[index] = false
        }else{
            notiDay[index] = true
        }
        setNotiDay(notiDay)
        setUpdatenoti(!updatenoti)
    }

    const dateWeekItem = (day, index) => {

        return (
            <TouchableOpacity 
                style={[styles.daylearn, { backgroundColor: notiDay[index] ? "#3697ba" : "white"}]}
                onPress={() => chooseDayWeek(index)}
            >
                <Text style={[styles.dayText, { color: notiDay[index] ? "white" : "black"}]}>{day}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <StatusBarComponent />
            <TopMenu />
            <View
                style={styles.timeContainer}
            >
                <View style={[styles.timeRow, { borderTopColor:"#fff0f0", borderTopWidth: 1}]}>
                    <View style={[styles.textBox, { width: scale(200)}]}>
                        <Text style={styles.timeText}>Enable Notification</Text>
                    </View>
                    <ToggleSwitch
                        isOn={enabledNoti}
                        onColor="#2fb55c"
                        offColor="#e8e8e8"
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="large"
                        onToggle={setEnabledNoti}
                    />
                </View>
            </View>
            {enabledNoti ? (
                <View>
                    <View
                        style={styles.timeContainer}
                    >
                        <View style={styles.timeRow}>
                            <View style={styles.textBox}>
                                <Text style={styles.timeText}>Start At</Text>
                            </View>
                            <TouchableOpacity 
                                style={[styles.textBox, { backgroundColor: "#1d997c", alignItems: "center",}]}
                                onPress={() => openTime("start")}
                            >
                                <Text style={styles.timeText}>{startTime.getHours() < 10 ? `0${startTime.getHours()}` : startTime.getHours()}:{startTime.getMinutes() < 10 ? `0${startTime.getMinutes()}` : startTime.getMinutes()}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.timeRow, { borderTopColor:"#fff0f0", borderTopWidth: 1}]}>
                            <View style={styles.textBox}>
                                <Text style={styles.timeText}>End At</Text>
                            </View>
                            <TouchableOpacity 
                                style={[styles.textBox, { backgroundColor: "#1d997c", alignItems: "center",}]}
                                onPress={() => openTime("end")}
                            >
                                <Text style={styles.timeText}>{endTime.getHours() < 10 ? `0${endTime.getHours()}` : endTime.getHours()}:{endTime.getMinutes() < 10 ? `0${endTime.getMinutes()}` : endTime.getMinutes()}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={styles.timeContainer}
                    >
                        <View>
                            <Text style={styles.title}>Lặp lại</Text>
                            <View style={[styles.timeRow, { justifyContent: "center" }]}>
                                <FlashList
                                    data={dateWeek}
                                    renderItem={({ item, index }) => dateWeekItem(item, index)}
                                    keyExtractor={item => item.toString()}
                                    horizontal
                                    scrollEnabled={false}
                                    showsHorizontalScrollIndicator={false}
                                    extraData={updatenoti}
                                    estimatedItemSize={7}
                                />
                            </View>
                        </View>
                        <View style={[styles.timeRow, { borderTopColor:"#fff0f0", borderTopWidth: 1}]}>
                            <View style={styles.textBox}>
                                <Text style={styles.timeText}>Sound</Text>
                            </View>
                            <TouchableOpacity 
                                style={[styles.textBox, { backgroundColor: "#1d997c", alignItems: "center",}]}
                                disabled
                            >
                                <Text style={[styles.timeText]}>vippro</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            ): ""}
            
            {showstart ? (
                <RNDateTimePicker
                    testID="dateTimePicker1"
                    value={startTime}
                    mode={"time"}
                    is24Hour={true}
                    onChange={changeTime}
                    display={Platform.OS == "Android" ? "default" : "spinner"}
                    minuteInterval={15}

                />
            ): ""}
            {showend && (
                <RNDateTimePicker
                    testID="dateTimePicker2"
                    value={endTime}
                    mode={"time"}
                    is24Hour={true}
                    onChange={changeTime}
                    display={Platform.OS == "Android" ? "default" : "spinner"}
                    minuteInterval={15}
                />
            )}
{/*             <DateTimePicker
                testID="dateTimePicker"
                value={new Date()}
                mode={"time"}
                is24Hour={true}
                timeZoneName={'Asia/Bangkok'}
                onChange={onChange}
            /> */}
        </View>
      );
}

const styles = StyleSheet.create({
    timeContainer: {
        borderRadius: 10,
        margin: 10,
        backgroundColor: themeColor2,
    },
    timeRow: {
        padding: 15,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textBox: {
        width: 100,
        padding: 10,
        borderRadius: 10,

    },
    timeText: {
        fontSize: scale(18),
        color: "white",
    },
    daylearn: {
        backgroundColor: "white",
        width: scale(36),
        paddingVertical: scale(8),
        alignItems: "center",
        borderRadius: 50,
        marginHorizontal: scale(4)
    },
    dayText: {
        fontSize: scale(16)
    },
    title: {
        alignSelf: "center",
        marginTop: 10,
        fontSize: scale(18),
        color: "white",
    }
})