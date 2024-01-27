import * as React from 'react';
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonSelection from '../components/ButtonSelection';
import Footer from '../components/Footer';

const buttons = [
    {
        icon: require('../../assets/images/icons/quran.png'),
        text: 'القرءان'
    },
    {
        icon: require('../../assets/images/icons/reading.png'),
        text: 'تعلم'
    },
    {
        icon: require('../../assets/images/icons/reading.png'),
        text: 'مجموعتك'
    },
    {
        icon: require('../../assets/images/icons/prayer.png'),
        text: 'صلاتك'
    },
    {
        icon: require('../../assets/images/icons/open-hands.png'),
        text: 'أدعية'
    },
    {
        icon: require('../../assets/images/icons/islam.png'),
        text: 'أحاديث'
    }
]
export default function Home({ navigation }) {
    //setTimeout(() => navigation.navigate("Home2"), 2000);
    //const [fontsLoaded] = useFonts({
    //    'Inter-Black': require('../../assets/fonts/Inter-Black.ttf'),
    //});

    //if (!fontsLoaded) return null

    return (
        <View style={styles.page}>
            <Text>Hi</Text>
            <View style={styles.header}>
                <View style={styles.profile}>
                    <View style={styles.profilePic}></View>
                    <Text style={styles.profileText}>مرحبا بك محمد 👋 نحن هنا لمساعدتك !</Text>
                </View>
                <LinearGradient
                    colors={['rgba(255, 212, 123, 1)', 'rgba(254, 175, 83, 1)']}
                    style={styles.beadsContainer}
                >
                    <Image source={require('../../assets/images/beads.png')} />
                    <View style={styles.textContainer}>
                        <Text style={styles.textAdkar}>أذكار</Text>
                        <Text style={styles.textAdkar}>الصباح بلغة الإشارة</Text>
                        <TouchableOpacity style={styles.btnIqraa}>
                            <Text style={styles.btnIqraaText}>إقرأ الآن</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.btnContainer}>
                        {
                            buttons.map((btn, index) => <ButtonSelection
                                key={'Btn-'+index}
                                icon={btn.icon}
                                text={btn.text}
                            />)
                        }
                    </View>

                    <LinearGradient
                        colors={['rgba(46, 85, 61, 1)', 'rgba(80, 145, 108, 1)']}
                        style={styles.listeningContainer}
                    >
                        <Image style={styles.motif} source={require('../../assets/images/motif.png')} />
                        <View style={styles.textContainer}>
                            <Text style={styles.textListen}>سوف نستمع الآن و نترجم لك أي قرءآن أو خطبة بلغة الإشارة </Text>
                            <TouchableOpacity style={styles.btnClickHere}>
                                <Image style={styles.imageAudio} source={require('../../assets/images/icons/audio.png')}/>
                                <Text style={styles.clickHere}>
                                    إضغط هنا
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </ScrollView>
            </SafeAreaView>
            <Footer selectedType={'home'} navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(19, 50, 52, 1)',
        flex: 1
    },
    header: {
        height: '35%',
        paddingHorizontal: 25
    },
    profile: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        flexDirection: 'row-reverse'
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: 'white'
    },
    profileText: {
        //fontFamily: 'Inter-Black',
        paddingHorizontal: 15,
        color: 'white',
        fontSize: 15
    },
    container: {
        width: '100%',
        height: '65%',
        backgroundColor: '#FCFCFC',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    beadsContainer: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        backgroundColor: 'red',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    textAdkar: {
        paddingHorizontal: 25,
        fontSize: 25,
        color: 'rgba(25, 55, 57, 1)'
    },
    btnIqraa: {
        height: 45,
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        width: 100,
        backgroundColor: 'rgba(25, 55, 57, 1)',
        borderRadius: 10,
        marginTop: 5
    },
    btnIqraaText: {
        fontSize: 20,
        color: 'white'
    },
    scrollView: {
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    btnContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 25,
        flexWrap: 'wrap',
    },
    listeningContainer: {
        marginTop: 55,
        width: "100%",
        height: 150,
        borderRadius: 10
    },
    motif: {
        position: 'absolute',
        bottom: -10,
        left: -11
    },
    textListen: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 25,
        paddingHorizontal: 40,
        color: 'white'
    },
    btnClickHere: {
        width: 130,
        height: 40,
        backgroundColor: 'rgba(254, 175, 83, 1)',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        borderRadius: 10
    },
    clickHere: {
        fontSize: 20,
        color: 'white'
    },
    imageAudio: {
        width: 20,
        height: 20
    }
});