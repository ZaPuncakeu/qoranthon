import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

export default function ButtonSelection({
    icon,
    text
}) {
    return (
        <TouchableOpacity style={styles.btnApp}>
            <Image source={icon} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnApp: {
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000000",
        borderRadius: 5,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity:  1,
        shadowRadius: 1,
        elevation: 1,
        backgroundColor: 'white'
    },
    text: {
        paddingTop: 8,
        fontSize: 18
    }
});