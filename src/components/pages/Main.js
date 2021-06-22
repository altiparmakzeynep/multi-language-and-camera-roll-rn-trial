import React, { Component } from "react";
import { View, StyleSheet, Text, I18nManager } from "react-native";
import { PhoneHeight, PhoneWidth } from "../config/env";
import i18n from "i18n-js";
import tr from "../../translations/tr.json";
import en from "../../translations/en.json";
import fr from "../../translations/fr.json";
import { loadSettings } from '../../translations/Settings';


// i18n.defaultLocale = 'tr';
// i18n.locale = 'fr';
i18n.fallbacks = true;
i18n.translations = { tr, en, fr };
  
class Main extends Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
        const settings = await loadSettings();
        console.log("language: ", i18n.locale);
        if (settings !== null) {
            i18n.locale = settings.locale;
            this.props.navigation.navigate('main');
          }
    }
    render() {
        return(
            <View style = {styles.container}>
                <View style = {styles.textBoard}>
                    <Text style = {styles.text}>{i18n.t('hello')}</Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#b0aac0",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1
    },
    textBoard: {
        width: PhoneWidth * 0.75,
        height: PhoneHeight * 0.2,
        borderRadius: 12,
        backgroundColor: "white",
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 12,
        elevation: 9,
    },
})
export default Main;