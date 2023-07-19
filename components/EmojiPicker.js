import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const EmojiPicker = ({ isVisible, children, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View className="h-1/4 w-full bg-darkBg rounded-tr-2xl rounded-tl-2xl absolute bottom-0">
        <View className="basis-1/6 bg-modalTitleContainerBg rounded-tr-xl rounded-tl-xl px-5 flex-row items-center justify-between">
          <Text className="text-white text-lg">Choose a sticker</Text>
          <TouchableOpacity onPress={onClose}>
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default EmojiPicker;
