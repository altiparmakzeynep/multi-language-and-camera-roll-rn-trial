import React, { Component } from "react";
import { ScrollView, View, Image, StyleSheet } from "react-native";
import { PhoneHeight, PhoneWidth, responsiveSize } from "../components/config/env";
import CameraRoll from "@react-native-community/cameraroll";
import { getPhotos } from "../actions/MainAction";
import {connect} from 'react-redux';

class PhotosRenderItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            // photos: []
          };
    }
    
    // getPhotosByAlbum = () => {
    //     CameraRoll.getPhotos({
    //         first: 10,
    //         assetType: "Photos",
    //     }).then(r => {
    //     //  this.setState({ photos: r.edges });
    //     this.props.getPhotos(r.edges)
    //     console.log("allah aşkına sonuç", r.edges);
 
    //    })
 
    //  }
    render() {
        console.log("photos: ", this.props.cameraRoll[0].node.image.uri);
        // this.getPhotosByAlbum;
        const { item } = this.props;
        return(
            <View>
                <Image
                                style={{
                                width: PhoneWidth / 3,
                                height: responsiveSize(100) }}
                                source={{ uri: item.node.image.uri }}/>
                    {/* {this.props.cameraRoll.map((item) => {
                        console.log("map içinde? ", item.node.image.uri);
                        return (
                            <Image
                                style={{
                                width: PhoneWidth / 3,
                                height: responsiveSize(100) }}
                                source={{ uri: item.node.image.uri }}/>
                        );
                    })} */}
                    
            </View>

        )
    }
}
const styles = StyleSheet.create({

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