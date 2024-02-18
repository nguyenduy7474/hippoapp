import { Pressable, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FlashList } from '@shopify/flash-list';
import ToggleSwitch from 'toggle-switch-react-native'
import { scale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { meaningbackground, tabbarcolor, themeColor2 } from '../../contants/style';
import i18n from '../../i18n';
import StatusBarComponent from '../../components/StatusBar'
import TopMenu from '../../components/TopMenu';
import { getSchedule, updateSchedule } from '../../api/ocrm';

const dateWeekEng = [
    { "name": 0, "active": true, "day": "shortSunday" }, 
    { "name": 1, "active": true, "day": "shortMonday" }, 
    { "name": 2, "active": true, "day": "shortTuesday" }, 
    { "name": 3, "active": true, "day": "shortWednesday" }, 
    { "name": 4, "active": true, "day": "shortThursday" }, 
    { "name": 5, "active": true, "day": "shortFriday" },
    { "name": 6, "active": true, "day": "shortSaturday" }
]

export default function Schedule() {
    const [startTime, setStartTime] = useState(new Date("2023-01-01"))
    const [endTime, setEndTime] = useState(new Date("2025-01-01T20:00"))
    const [showstart, setShowstart] = useState(false)
    const [showend, setShowend] = useState(false)
    const [updatenoti, setUpdatenoti] = useState(false)
    const [enabledNoti, setEnabledNoti] = useState(true)
    const [dateofweek, setDateofweek] = useState([])

    const openTime = (type) => {
        if (type == "start") {
            if (!showstart) {
                setShowend(false)
            }
            setShowstart(!showstart)
        } else {
            if (!showend) {
                setShowstart(false)
            }
            setShowend(!showend)
        }
    }

    const changeTime = (event, value) => {
        if (showstart) {
            // setShowstart(false)
            setStartTime(value)

        } else {
            // setShowend(false)
            setEndTime(value)
        }
    }

    const chooseDayWeek = (index) => {
        dateofweek[index].active = !dateofweek[index].active
        setDateofweek(dateofweek)
        setUpdatenoti(!updatenoti)
    }

    const dateWeekCheck = async () => {
        let dataSchedule = await getSchedule()
        setDateofweek(JSON.parse(dataSchedule.data.weekday))
    }

    useEffect(() => {
        if(dateofweek.length == 0){
            return
        }

        if (!enabledNoti) {
            setShowstart(false)
            setShowend(false)
        }

        let datasend = {
            "enable":  enabledNoti ? 1 : 0,
            "start_at": `${startTime.getHours() < 10 ? "0" + startTime.getHours() : startTime.getHours()}:${startTime.getMinutes() < 10 ? "0" + startTime.getMinutes() : startTime.getMinutes()}:00`,
            "end_at": `${endTime.getHours() < 10 ? "0" + endTime.getHours() : endTime.getHours()}:${endTime.getMinutes() < 10 ? "0" + endTime.getMinutes() : endTime.getMinutes()}:00`,
            "weekday": JSON.stringify(dateofweek)
        }
        updateSchedule(datasend)

    }, [enabledNoti, startTime, endTime, updatenoti])


    useEffect(() => {
        dateWeekCheck()
    }, [])

    const dateWeekItem = ({ name, day }, index) => {
        return (
            <TouchableOpacity
                style={[styles.daylearn, { backgroundColor: dateofweek[index].active ? meaningbackground : "white" }]}
                onPress={() => chooseDayWeek(index)}
            >
                <Text style={[styles.dayText, { color: dateofweek[index].active ? "white" : "black" }]}>{i18n.t(day)}</Text>
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
                <View style={[styles.timeRow, { borderTopColor: "#fff0f0", borderTopWidth: 1 }]}>
                    <View style={[styles.textBox, { width: scale(200) }]}>
                        <Text style={styles.timeText}>{i18n.t('enable_notification')}</Text>
                    </View>
                    <ToggleSwitch
                        isOn={enabledNoti}
                        onColor={meaningbackground}
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
                                <Text style={styles.timeText}>{i18n.t('start_at')}</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.textBox, { backgroundColor: meaningbackground, alignItems: "center", }]}
                                onPress={() => openTime("start")}
                            >
                                <Text style={styles.timeText}>{startTime.getHours() < 10 ? `0${startTime.getHours()}` : startTime.getHours()}:{startTime.getMinutes() < 10 ? `0${startTime.getMinutes()}` : startTime.getMinutes()}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.timeRow, { borderTopColor: meaningbackground, borderTopWidth: 1 }]}>
                            <View style={styles.textBox}>
                                <Text style={styles.timeText}>{i18n.t('end_at')}</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.textBox, { backgroundColor: meaningbackground, alignItems: "center", }]}
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
                            <Text style={styles.title}>{i18n.t('repeat')}</Text>
                            <View style={[styles.timeRow, { justifyContent: "center" }]}>
                                {dateofweek.length > 0 ? (
                                    <FlashList
                                        data={dateofweek}
                                        renderItem={({ item, index }) => dateWeekItem(item, index)}
                                        keyExtractor={item => item.name.toString()}
                                        horizontal
                                        scrollEnabled={false}
                                        showsHorizontalScrollIndicator={false}
                                        extraData={updatenoti}
                                        estimatedItemSize={7}
                                    />
                                ): ""}

                            </View>
                        </View>
{/*                         <View style={[styles.timeRow, { borderTopColor: "#fff0f0", borderTopWidth: 1 }]}>
                            <View style={[styles.textBox, , { width: scale(200) }]}>
                                <Text style={styles.timeText}>{i18n.t('sound')}</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.textBox, { backgroundColor: meaningbackground, alignItems: "center", }]}
                                disabled
                            >
                                <Text style={[styles.timeText]}>Hippo</Text>
                            </TouchableOpacity>
                        </View> */}
                    </View>
                </View>
            ) : ""}

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
            ) : ""}
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
        backgroundColor: tabbarcolor,
        marginBottom: 5
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