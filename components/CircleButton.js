import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CircleButton = ({ icon, onModalOpen }) => {
  return (
    <TouchableOpacity
      className="rounded-full border-4 border-buttonBorderColor"
      onPress={onModalOpen}
    >
      <View className="rounded-full p-1">
        <View className="rounded-full flex items-center justify-center p-10 bg-white ">
          {icon}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CircleButton;
