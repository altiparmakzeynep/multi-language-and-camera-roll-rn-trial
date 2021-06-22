// import React, { Component } from 'react';
import { Dimensions } from "react-native";

export const PhoneHeight = Dimensions.get("window").height;
export const PhoneWidth  = Dimensions.get("window").width;

const scale = PhoneWidth / 320;
export const responsiveSize = (size) => {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}