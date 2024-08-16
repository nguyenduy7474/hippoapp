import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { FlashList } from '@shopify/flash-list';
import ToggleSwitch from 'toggle-switch-react-native'
import { scale } from 'react-native-size-matters';
import * as Notifications from 'expo-notifications';


import { meaningbackground, tabbarcolor, themeColor2 } from '../../contants/style';
import i18n from '../../i18n';
import StatusBarComponent from '../../components/StatusBar'
import TopMenu from '../../components/TopMenu';
import { getSchedule, updateSchedule } from '../../api/ocrm';
import { isTablet } from 'react-native-device-info';

const isAndroid = Platform.OS === 'android'

export default function Schedule() {
    const [showstart, setShowstart] = useState(false)
    const [showend, setShowend] = useState(false)
    const [updatenoti, setUpdatenoti] = useState(false)
    const [dateofweek, setDateofweek] = useState([])
    const [scheduledata, setScheduledata] = useState({
        "start_time": new Date("2023-01-01"),
        "end_time": new Date("2025-01-01T20:00"),
        "enable": false
    })

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
            setScheduledata({
                ...scheduledata,
                start_time: value
            })
        } else {
            setScheduledata({
                ...scheduledata,
                end_time: value
            })
        }
    }

    const chooseDayWeek = (index) => {
        dateofweek[index].active = !dateofweek[index].active
        setDateofweek(dateofweek)
        setUpdatenoti(!updatenoti)
    }

    const onOfNoti = (state) => {
        setScheduledata({
            ...scheduledata,
            enable: state
        })
    }

    const checkNotipermission = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        return existingStatus
    }

    const dateWeekCheck = async () => {
        const check = await checkNotipermission()
        console.info("🚀 ~ file: index.js:78 ~ dateWeekCheck ~ check:", check)

        if(check == "granted"){
            let dataSchedule = await getSchedule()
            
            setDateofweek(JSON.parse(dataSchedule.data.weekday))
            setScheduledata({
                "start_time":new Date(`2025-01-01T${dataSchedule.data.start_at}`),
                "end_time": new Date(`2025-01-01T${dataSchedule.data.end_at}`),
                "enable": dataSchedule.data.enable
            })
        }
    }

    useEffect(() => {
        if(dateofweek.length == 0){
            return
        }

        if (!scheduledata.enable) {
            setShowstart(false)
            setShowend(false)
        }

        let datasend = {
            "enable":  scheduledata.enable ? 1 : 0,
            "start_at": `${scheduledata.start_time.getHours() < 10 ? "0" + scheduledata.start_time.getHours() : scheduledata.start_time.getHours()}:${scheduledata.start_time.getMinutes() < 10 ? "0" + scheduledata.start_time.getMinutes() : scheduledata.start_time.getMinutes()}:00`,
            "end_at": `${scheduledata.end_time.getHours() < 10 ? "0" + scheduledata.end_time.getHours() : scheduledata.end_time.getHours()}:${scheduledata.end_time.getMinutes() < 10 ? "0" + scheduledata.end_time.getMinutes() : scheduledata.end_time.getMinutes()}:00`,
            "weekday": JSON.stringify(dateofweek)
        }

        updateSchedule(datasend)

    }, [scheduledata, updatenoti])


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
                        isOn={scheduledata.enable}
                        onColor={meaningbackground}
                        offColor="#e8e8e8"
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="large"
                        onToggle={onOfNoti}
                    />
                </View>
            </View>
            {scheduledata.enable ? (
                <View>
                    <View
                        style={styles.timeContainer}
                    >
                        <View style={styles.timeRow}>
                            <View style={styles.textBoxText}>
                                <Text style={styles.timeText}>{i18n.t('start_at')}</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.textBox, { backgroundColor: meaningbackground, alignItems: "center", }]}
                                onPress={() => openTime("start")}
                            >
                                <Text style={styles.timeText}>{scheduledata.start_time.getHours() < 10 ? `0${scheduledata.start_time.getHours()}` : scheduledata.start_time.getHours()}:{scheduledata.start_time.getMinutes() < 10 ? `0${scheduledata.start_time.getMinutes()}` : scheduledata.start_time.getMinutes()}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.timeRow, { borderTopColor: meaningbackground, borderTopWidth: 1 }]}>
                            <View style={styles.textBoxText}>
                                <Text style={styles.timeText}>{i18n.t('end_at')}</Text>
                            </View>
                            <TouchableOpacity
                                style={[styles.textBox, { backgroundColor: meaningbackground, alignItems: "center", }]}
                                onPress={() => openTime("end")}
                            >
                                <Text style={styles.timeText}>{scheduledata.end_time.getHours() < 10 ? `0${scheduledata.end_time.getHours()}` : scheduledata.end_time.getHours()}:{scheduledata.end_time.getMinutes() < 10 ? `0${scheduledata.end_time.getMinutes()}` : scheduledata.end_time.getMinutes()}</Text>
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
                    value={scheduledata.start_time}
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
                    value={scheduledata.end_time}
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
    textBoxText: {
        padding: 10,
        borderRadius: 10,
    },
    textBox: {
        padding: 10,
        borderRadius: 10,
        width: isTablet() ? 200 : 100
    },
    timeText: {
        fontSize: isTablet() ? scale(14) : scale(18),
        color: "white",
    },
    daylearn: {
        backgroundColor: "white",
        width: scale(36),
        paddingVertical: isAndroid ? scale(6) : scale(8),
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