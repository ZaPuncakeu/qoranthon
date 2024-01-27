import * as React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

export default function HomeScreen({navigation}){
    setTimeout(() => navigation.navigate("Home"), 2000);

    return(
        <View>
            <Image style={styles.img} source={require("../../assets/images/splash_screen.png")}/>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        width: "100%",
        height: "100%"
    }
});