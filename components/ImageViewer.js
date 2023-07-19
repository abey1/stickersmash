import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const ImageViewer = ({ placeholderImageSource, selectedImage }) => {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;
  return (
    <View className="h-full flex items-center justify-center ">
      <Image
        style={{ objectFit: "cover", flex: 1, width: "100%" }}
        className="  rounded-2xl"
        // h-[440] w-[320]
        source={imageSource}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageViewStyle: {
    height: 100,
    width: 100,
  },
});

export default ImageViewer;
