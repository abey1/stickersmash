import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const IconButton = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity
      className="flex items-center justify-center"
      onPress={onPress}
    >
      {icon}
      <Text className="text-white mt-4">{label}</Text>
    </TouchableOpacity>
  );
};

export default IconButton;
