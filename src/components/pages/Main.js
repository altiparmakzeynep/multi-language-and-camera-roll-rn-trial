import React, { Component } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal, ScrollView } from "react-native";
import { PhoneHeight, PhoneWidth, responsiveSize } from "../config/env";
import i18n from "i18n-js";
import tr from "../../translations/tr.json";
import en from "../../translations/en.json";
import fr from "../../translations/fr.json";
import { loadSettings } from '../../translations/Settings';
import { launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CameraRoll from "@react-native-community/cameraroll";
import { FlatList } from "react-native-gesture-handler";
import PhotosRenderItem from "../../helpers/PhotosRenderItem";
import { getPhotosFromCamereRoll } from "../../actions/MainAction";
import {connect} from 'react-redux';

class Main extends Component { 
     
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            imageUri: " ",
          };
    }
    
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
        console.log("modala girdi");
        this.getPhotosByAlbum();

    }
    
    setLanguage = (lang) => {
        i18n.locale = lang
        this.setModalVisible(false)
    }
    setImageUri = (data) => {
        this.setState({imageUri:data})
    }
    openCamera = () => {
        const options = {
         storageOptions: {
            path: "images",
            mediaType: "photo"
        },
         includeBase64: true
        };
        launchCamera(options, (response => {
            if(response.error) {
                console.log("Camera Error: ", response.error);
            } 
            else {
                console.log("image???????:", response);
                this.setState({imageUri:response.assets[0].uri});
            }
        }));
     };
    openGallery = () => {
        const options = {
            storageOptions: {
               path: "images",
               mediaType: "photo"
           },
            includeBase64: true
           };
           launchImageLibrary(options, (response => {
            if (response.error) {
                console.log('LaunchImageLibrary Error: ', response.error);
              }
              else {
                this.setState({imageUri:response.assets[0].uri});
              }
           }))
    }
    getPhotosByAlbum = () => {
        CameraRoll.getPhotos({
            first: 9,
            assetType: "Photos",
        }).then(r => {
        //  this.setState({ photos: r.edges });
        console.log("zz: ", r.edges);
        this.props.getPhotosFromCamereRoll(r.edges) 
       })
 
     }
    // getAlbums = () => {
    //     const result = CameraRoll.getAlbums({ assetType:"Photos" })
    //     this.setState({ albumList:result })
    //     console.log("fotolarrrrrr", result);
    // }
   
    async componentDidMount() {
        const settings = await loadSettings();
        console.log("language: ", i18n.defaultLocale);
        if (settings !== null) {
            i18n.locale = settings.locale;
            this.props.navigation.navigate('main');
          }
    } 
    render() {
        console.log("maindeki camera roll:", this.props.cameraRoll);
        i18n.translations = { tr, en, fr };
        const { modalVisible } = this.state;
        return(
            <View style = {styles.container}>
                {/* <View style = {styles.imageContainer}>
                    <Image source = {{uri: this.state.imageUri}} style = {styles.img}></Image>
                </View> */}
                <View style = {styles.textBoard}>
                    <Text style = {styles.text}>{i18n.t('hello')}</Text>
                    <View style = {styles.buttonsContainer}>
                        <TouchableOpacity style = {styles.settingsButton} onPress={() => this.setModalVisible(true)}>
                            <Image 
                                style = {styles.settingsIcon}
                                source = {require('../../images/translation.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.cameraButton} onPress = {this.openCamera}>
                            <Image 
                                style = {styles.cameraIcon}
                                source = {require('../../images/camera.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.cameraButton} onPress = {this.openGallery}>
                            <Image 
                                style = {styles.cameraIcon}
                                source = {require('../../images/gallery.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.cameraButton} onPress = {() => {this.setModalVisible(true)}}>
                            <Image 
                                style = {styles.cameraIcon}
                                source = {require('../../images/folder.png')}/>
                        </TouchableOpacity>
                    </View>
                    
                    {/* language's modal */}
                    {/* <Modal
                        animationType = "slide"
                        transparent = {true}
                        visible = {modalVisible}
                        onRequestClose = {() => {
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
                     </Modal> */}

                     <Modal  
                        animationType = "slide"
                        transparent = {true}
                        visible = {modalVisible}
                        onRequestClose = {() => {
                        this.setModalVisible(!modalVisible);
                        }}>  
                        <View style = {styles.photosModalContainer}>
                        <FlatList
                            numColumns = {3}
                            data = {this.props.cameraRoll}
                            renderItem = {({item}) => <PhotosRenderItem item= {item}/> }
                            keyExtractor={item => item.id}/>
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
        borderWidth: 1
    },
    textBoard: {
        width: PhoneWidth * 0.75,
        height: PhoneHeight * 0.2,
        borderRadius: 12,
        marginTop: PhoneHeight * 0.05,
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
    imageContainer: {
        borderWidth: 1,
        // width: responsiveSize(100),
        // height: responsiveSize(100),
        marginTop: PhoneHeight * 0.2,
        // borderRadius: 100
    },
    img: {
        width: responsiveSize(200),
        height: responsiveSize(200),
    },
    text: {
        fontSize: responsiveSize(13)
    },
    buttonsContainer: {
        flexDirection: "row"
    },
    settingsButton: {
        borderWidth: 0,
        marginTop: PhoneHeight * 0.03,
        resizeMode: "contain"
    },
    settingsIcon: {
        width: responsiveSize(30),
        height: responsiveSize(30)
    },
    cameraButton: {
        borderWidth: 0,
        marginTop: PhoneHeight * 0.03,
        resizeMode: "contain"
    },
    cameraIcon: {
        width: responsiveSize(30),
        height: responsiveSize(30),
        marginLeft: PhoneWidth * 0.05
    },
    modalContainer: {
        backgroundColor: "pink",
        width: PhoneWidth * 0.3,
        height: PhoneHeight * 0.1,
        alignSelf: "center",
        marginTop: PhoneHeight * 0.22,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    photosModalContainer: {
        backgroundColor: "white",
        width: PhoneWidth,
        height: PhoneHeight * 0.6,
        alignSelf: "center",
        marginTop: PhoneHeight * 0.4,
       
    }
})
const mapStateToProps = state => {
    const { cameraRoll } = state.MainReducer;
    return {
      cameraRoll
    }
  }
export default connect(
    mapStateToProps,
    {
        getPhotosFromCamereRoll
    }
  )(Main)