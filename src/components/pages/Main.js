import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal } from "react-native";
import { PhoneHeight, PhoneWidth, responsiveSize } from "../config/env";
import i18n from "i18n-js";
import tr from "../../translations/tr.json";
import en from "../../translations/en.json";
import fr from "../../translations/fr.json";
import { loadSettings } from '../../translations/Settings';


// i18n.defaultLocale = 'tr';
// i18n.locale = 'fr';
// i18n.fallbacks = true;
i18n.translations = { tr, en, fr };
  
class Main extends Component {  
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
          };
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }
    setLanguage = (lang) => {
        i18n.locale = lang
        this.setModalVisible(false)
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
        const { modalVisible } = this.state;
        return(
            <View style = {styles.container}>
                <View style = {styles.textBoard}>
                    <Text style = {styles.text}>{i18n.t('hello')}</Text>
                    <TouchableOpacity style = {styles.settingsButton} onPress={() => this.setModalVisible(true)}>
                        <Image 
                            style = {styles.settingsIcon}
                            source={require('../../images/translation.png')}/>
                    </TouchableOpacity>
                    <Modal
                        animationType= "slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                        }}>
                        <View style = {styles.modalContainer}>
                        <TouchableOpacity
                                 style = {styles.frButton}
                                 onPress = {() => this.setLanguage("fr")}>
                                <Text>French</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style = {styles.enButton}
                                onPress = {() => this.setLanguage("en")}>
                                <Text>English</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style = {styles.trButton}
                                onPress = {() => this.setLanguage("tr")}>
                                <Text>Türkçe</Text>
                            </TouchableOpacity>
                            
                        </View>
                     </Modal>
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
    text: {
        fontSize: responsiveSize(13)
    },
    settingsButton: {
        borderWidth: 0,
        marginTop: PhoneHeight * 0.03,
        resizeMode: "contain"
        // width: PhoneWidth * 0.1,
        // height: PhoneHeight * 0.05,
    },
    settingsIcon: {
        width: responsiveSize(30),
        height: responsiveSize(30)
    },
    modalContainer: {
        backgroundColor: "pink",
        width: PhoneWidth * 0.3,
        height: PhoneHeight * 0.1,
        alignSelf: "center",
        marginTop: PhoneHeight * 0.55,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    }
})
export default Main;