import React, { Component } from "react";
import { ScrollView, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { PhoneHeight, PhoneWidth, responsiveSize } from "../components/config/env";
import { getPhotos} from "../actions/MainAction";
import {connect} from 'react-redux';

class PhotosRenderItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedPhoto: false,
          };
    }
    
    selectPhotos = (item) => {
      console.log("array: ", this.state.photosArray);
      if(this.state.selectedPhoto === false){
        this.setState({ selectedPhoto:true })    
      }
      else{
        this.setState({ selectedPhoto:false })
      }
    }
    render() {
        const { item } = this.props;
        return(
            <View>
              <ScrollView>
                <View style = {styles.checkContainer}>
                { this.state.selectedPhoto !== true ? <Image
                    style={{
                      width: responsiveSize(25),
                      height: responsiveSize(25) }} 
                      source={require('../images/circle.png')}/> :
                       <Image style={{
                        width: responsiveSize(25),
                        height: responsiveSize(25) }} 
                        source={require('../images/check.png')} ></Image>}
                </View>
                <TouchableOpacity onPress = {( ) => this.selectPhotos(item)}>
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
    const { cameraRoll } = state.MainReducer;
    return {
      cameraRoll
    }
  }
export default connect(
    mapStateToProps,
    {
      getPhotos
    }
  )(PhotosRenderItem)