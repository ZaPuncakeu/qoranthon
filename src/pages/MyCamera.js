import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import useCore from './Core';
import { stripTashkeel, tokenize, stripHarakat, stripShadda } from 'arajs';
import Footer from '../components/Footer';

export default function MyCamera({navigation}) {

    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    //const [image, setImage] = useState(null);
    const ref = useRef(null);
    const TIMEOUT = 7000;

    const core = useCore();

    const takePicture = async () => {
        if (ref) {
            try {
                const options = { format: 'png', quality: 0.8 };
                const uri = await captureRef(ref, options);
                const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });

                //console.log('Captured image saved:', base64);
                core.processImage(base64)
                //core.setSurahImage(base64);
                setTimeout(takePicture, TIMEOUT);
            } catch (error) {
                console.error('Error capturing image:', error);
            }
        }
    };

    useState(() => {
        (async () => {
            if (!permission) {
                await requestPermission();
            }

            
        })()

        setTimeout(async () =>  await takePicture(), TIMEOUT);
        //core.setRecognizedText('بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ١ ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ ٢ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ٣ مَـٰلِكِ يَوْمِ ٱلدِّينِ ٤ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ٥ ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ ٦ صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ ٧')
    }, [])

    if (!permission) return <Text>An error happened</Text>;

    if (!permission.granted) return <Text>Please allow the camera</Text>;

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera} type={type}
                ref={ref}
            >
            </Camera>
            <ScrollView style={styles.translation}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {core.recognizedText ? (
                        <>
                            <View style={{ alignSelf: 'flex-end', flexDirection: 'row-reverse', marginBottom: 70, flexWrap: 'wrap' }}>
                                {
                                    tokenize(core.recognizedText).map((word, index) => {
                                        return <View style={{ flexDirection: 'row-reverse', margin: 10 }} key={`key-word-${index}`}>
                                            {
                                                word.split("").map((letter, index2) => {
                                                    const currImage = core.lettersToImage(letter);
                                                    return currImage ?
                                                        <Image resizeMode='contain' key={`key-letter-${index}-${index2}`} style={{ width: 25, height: 25 }} source={currImage}></Image>
                                                        :
                                                        null
                                                })
                                            }
                                        </View>
                                    })
                                }
                            </View>
                        </>
                    ) : null}
                </View>
            </ScrollView>
            <Footer hideBtn={true} navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    camera: {
        width: '100%',
        height: '50%'
    },
    translation: {
        width: '100%',
        height: '50%'
    }
})