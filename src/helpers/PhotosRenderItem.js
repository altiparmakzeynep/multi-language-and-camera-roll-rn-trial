import React, { Component } from "react";
import { ScrollView, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PhoneHeight, PhoneWidth, responsiveSize } from "../components/config/env";
import { getPhotos, selectPhotos} from "../actions/MainAction";
import {connect} from 'react-redux';

class PhotosRenderItem extends Component {
    constructor(props){
        super(props);
        this.state = {
          };
    }
    render() {
        const { item } = this.props;
        return(
            <View>
              <ScrollView>
                <View style = {styles.checkContainer}>
                { item.selectedItem !== true ? <Image
                    style={{
                      width: responsiveSize(25),
                      height: responsiveSize(25) }} 
                      source={require('../images/circle.png')}/> :
                       <Image style={{
                        width: responsiveSize(25),
                        height: responsiveSize(25) }} 
                        source={require('../images/check.png')} ></Image>}
                </View>
                <TouchableOpacity onPress = {( ) => this.props.selectPhotos(item)}>
                <Image
                    style={{
                    width: PhoneWidth / 3,
                    height: responsiveSize(100) }}
                    source={{ uri: item.node.image.uri }}/>
                </TouchableOpacity>             
              </ScrollView>                 
            </View>

        )
    }
}
const styles = StyleSheet.create({
  checkContainer: {
    width: responsiveSize(40),
    height: responsiveSize(40),
    position: "absolute",
    zIndex: 1
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
  )(PhotosRenderItem)