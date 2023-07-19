import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Button = ({ label, hasIcon, onPress }) => {
  return (
    <TouchableOpacity
      className={`flex-row w-72 h-16 gap-x-4 items-center justify-center mb-2 ml-[1] ${
        hasIcon && "bg-white border-4 border-buttonBorderColor rounded-2xl"
      } `}
      onPress={onPress}
    >
      {hasIcon && <FontAwesome name="picture-o" size={24} color="black" />}
      <Text className={` ${hasIcon ? "text-black" : "text-white"} text-sm`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
  },
});

export default Button;
