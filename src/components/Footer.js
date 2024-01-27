import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableHighlight } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear'
import { faBookAtlas } from '@fortawesome/free-solid-svg-icons/faBookAtlas'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse'

const buttons = [
    {
        iconSize: 25,
        icon: faGear,
        text: 'إعدادات',
        type: 'settings'
    },
    {
        iconSize: 25,
        icon: faBookAtlas,
        text: 'مكتبتك',
        type: 'library'
    },
    {
        iconSize: 25,
        icon: faSearch,
        text: 'بحث',
        type: 'search'
    },
    {
        iconSize: 25,
        icon: faHouse,
        text: 'الرئيسية',
        type: 'home',
        page: 'Home'
    }
]
export default function Footer({selectedType, hideBtn=false, navigation}) {
    return(
        <View style={styles.footer}>
            {
                buttons.map((ic, index) => 
                    <TouchableOpacity key={'icon-'+index} style={styles.btn} onPress={() => {
                        if(typeof(ic.page) != 'undefined') {
                            navigation.navigate(ic.page)
                        }
                    }}>
                        <FontAwesomeIcon color={ic.type !== selectedType ? 'black' : 'rgba(254, 175, 83, 1)'} size={ic.iconSize} icon={ ic.icon } />
                        <Text style={[styles.text, {color: ic.type !== selectedType ? 'black' : 'rgba(254, 175, 83, 1)'}]}>{ic.text}</Text>
                    </TouchableOpacity>
                )
            }

            {
                !hideBtn ?
                <TouchableHighlight style={styles.scanButtonContainer} onPress={() => navigation.navigate("Camera")}>
                    <View style={styles.scanButton}>
                        <Image style={styles.imgScan} source={require('../../assets/images/icons/scan_icon.png')}/>
                        <Text style={styles.textTranslation}>ترجم الآن</Text>
                    </View>
                </TouchableHighlight>
                :
                null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        height: 70,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderRadius: 5,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    btn: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scanButtonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 60
    },
    scanButton: {
        width: 80,
        height: 80,
        borderRadius: 80/2,
        backgroundColor: 'rgba(23, 177, 103, 1)',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity:  1,
        shadowRadius: 1,
        elevation: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgScan: {
        width: 40,
        height: 40
    }
});