import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImgToBase64 from 'react-native-image-base64';

const allSigns = {
    "alif": require('../../assets/signs/alif.png'),
    "ba": require('../../assets/signs/ba.png'),
    "ta": require('../../assets/signs/ta.png'),
    "tha": require('../../assets/signs/tha.png'),
    "jim": require('../../assets/signs/jim.png'),
    "7a": require('../../assets/signs/7a.png'),
    "kha": require('../../assets/signs/kha.png'),
    "dal": require('../../assets/signs/dal.png'),
    "thal": require('../../assets/signs/thal.png'),
    "ra": require('../../assets/signs/ra.png'),
    "zay": require('../../assets/signs/zay.png'),
    "sin": require('../../assets/signs/sin.png'),
    "shin": require('../../assets/signs/shin.png'),
    "sad": require('../../assets/signs/sad.png'),
    "dad": require('../../assets/signs/dad.png'),
    "tad": require('../../assets/signs/tad.png'),
    "thad": require('../../assets/signs/thad.png'),
    "3in": require('../../assets/signs/3in.png'),
    "ghin": require('../../assets/signs/ghin.png'),
    "fa": require('../../assets/signs/fa.png'),
    "9af": require('../../assets/signs/9af.png'),
    "kaf": require('../../assets/signs/kaf.png'),
    "lam": require('../../assets/signs/lam.png'),
    "mim": require('../../assets/signs/mim.png'),
    "noun": require('../../assets/signs/noun.png'),
    "ha": require('../../assets/signs/ha.png'),
    "waw": require('../../assets/signs/waw.png'),
    "ya": require('../../assets/signs/ya.png')
}

const useCore = () => {
    
    const lettersToImage = (letter) => {
        if(["ا", "أ", "آ", "إ", "ٱ"].includes(letter)) return allSigns["alif"]
        if(["ب"].includes(letter)) return allSigns["ba"]
        if(["ت"].includes(letter)) return allSigns["ta"]
        if(["ث"].includes(letter)) return allSigns["tha"]
        if(["ج"].includes(letter)) return allSigns["jim"]
        if(["ح"].includes(letter)) return allSigns["7a"]
        if(["خ"].includes(letter)) return allSigns["kha"]
        if(["د"].includes(letter)) return allSigns["dal"]
        if(["ذ"].includes(letter)) return allSigns["thal"]
        if(["ر"].includes(letter)) return allSigns["ra"]
        if(["ز"].includes(letter)) return allSigns["zay"]
        if(["س"].includes(letter)) return allSigns["sin"]
        if(["ش"].includes(letter)) return allSigns["shin"]
        if(["ص"].includes(letter)) return allSigns["sad"]
        if(["ض"].includes(letter)) return allSigns["dad"]
        if(["ط"].includes(letter)) return allSigns["tad"]
        if(["ظ"].includes(letter)) return allSigns["that"]
        if(["ع"].includes(letter)) return allSigns["3in"]
        if(["غ"].includes(letter)) return allSigns["ghin"]
        if(["ف"].includes(letter)) return allSigns["fa"]
        if(["ق"].includes(letter)) return allSigns["9af"]
        if(["ك"].includes(letter)) return allSigns["kaf"]
        if(["ل"].includes(letter)) return allSigns["lam"]
        if(["م"].includes(letter)) return allSigns["mim"]
        if(["ن"].includes(letter)) return allSigns["noun"]
        if(["ه"].includes(letter)) return allSigns["ha"]
        if(["و"].includes(letter)) return allSigns["waw"]
        if(["ي"].includes(letter)) return allSigns["ya"]


        return null;
    }
    
    const [recognizedText, setRecognizedText] = useState('');
    

    const processImage = async (imageBase64) => {
        const apiKey = 'YOUR_API_KEY'; // Replace with your Google Cloud Vision API key
        
        // Prepare API request
        const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;
        const requestBody = {
            requests: [
                {
                    image: { content: imageBase64 },
                    features: [{ type: 'TEXT_DETECTION' }],
                },
            ],
        };

        // Send request to Google Cloud Vision API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        // Parse the response
        const result = await response.json();
        const text = result.responses[0]?.fullTextAnnotation?.text || 'No text found';

        if(text === 'No text found') {
            setRecognizedText(text);
            return;
        }

        const apiVerse = `https://api.quran.com/api/v4/search?q=${encodeURIComponent(text)}`
        const verseResponse = await fetch(apiVerse, {
            method: 'GET'
        });

        const foundVerse = await verseResponse.json();
        const realSurahApi = `https://api.quran.com/api/v4/quran/verses/imlaei?chapter_number=${foundVerse.search.results[0].verse_key.split(':')[0]}`;
        
        const surahResponse = await fetch(realSurahApi, {
            method: 'GET'
        });
        
        const foundSurah = await surahResponse.json();

        const realSurah = foundSurah.verses.map(s => s.text_imlaei).join(' ');

        setRecognizedText(stripArabicDiacritics(realSurah));
    };

    function stripArabicDiacritics(input) {
        // Use a regular expression to match Arabic diacritics and other specific characters
        var diacriticRegex = /[\u064B-\u065F\u0610-\u061A\u0656-\u065F\u0670-\u0671]/g;
    
        // Replace diacritics with an empty string
        var strippedString = input.replace(diacriticRegex, '');
    
        return strippedString;
    }
    

    return {
        processImage,
        recognizedText,
        lettersToImage,
        setRecognizedText
    }
};

export default useCore;
