import React, { Component } from "react";
import { ScrollView, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PhoneHeight, PhoneWidth, responsiveSize } from "../components/config/env";
import {connect} from 'react-redux';
import { getPhotos, selectPhotos} from "../actions/MainAction";

class UploadedPhotosRenderItem extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { item } = this.props;
        return(
            <View>
                <ScrollView>
                    <Image 
                        style = {styles.uploadedPhotos}
                        source={{ uri: item.node.image.uri }}/>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    uploadedPhotos: {
        width: (PhoneWidth * 0.75) / 2,
        height: PhoneHeight * 0.1
    }
})
const mapStateToProps = state => {
    const { cameraRoll, selectedPhotos } = state.MainReducer;
    return {
      cameraRoll,
      selectedPhotos
    }
  }
export default connect(
    mapStateToProps,
    {
      getPhotos,
      selectPhotos
    }
  )(UploadedPhotosRenderItem)