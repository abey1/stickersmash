import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ImageViewer,
  Button,
  IconButton,
  CircleButton,
  EmojiPicker,
  EmojiList,
  EmojiSticker,
} from "./components";
import * as ImagePicker from "expo-image-picker";
import { useState, useRef } from "react";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

const placeholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const imageRef = useRef();

  // start building an array of emojis before going to screenshot part of the project
  const [emojiArray, setEmojiArray] = useState([]);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("you did not select any image");
    }
  };

  const setPickedEmoji = (newEmoji) => {
    setEmojiArray([...emojiArray, newEmoji]);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onModalOpen = () => {
    setIsModalVisible(true);
  };

  const onCloseAppOption = () => {
    setShowAppOptions(false);
    setEmojiArray([]);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("saved");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <GestureHandlerRootView className="bg-darkBg flex-1 items-center justify-center">
      <SafeAreaView className="flex-1 w-full px-4">
        <View
          className="flex-1 h-full w-full"
          ref={imageRef}
          collapsable={false}
        >
          <View className="flex-1 pt-2 w-full">
            <ImageViewer
              placeholderImageSource={placeholderImage}
              selectedImage={selectedImage}
            />
            {emojiArray.map((emoji, index) => {
              return (
                <EmojiSticker
                  key={index}
                  imageSize={40}
                  stickerSource={emoji}
                />
              );
            })}
          </View>
        </View>
        <View className="basis-1/4 items-center justify-center overflow-hidden">
          {showAppOptions ? (
            <View className="h-full w-screen flex-row justify-between items-center  px-14">
              <IconButton
                label="Reset"
                icon={<MaterialIcons name="refresh" size={30} color="white" />}
                onPress={onCloseAppOption}
              />
              <CircleButton
                icon={<FontAwesome5 name="plus" size={24} color="black" />}
                onModalOpen={onModalOpen}
              />
              <IconButton
                label="Save"
                icon={
                  <Ionicons
                    name="md-download-outline"
                    size={30}
                    color="white"
                  />
                }
                onPress={onSaveImageAsync}
              />
            </View>
          ) : (
            <View>
              <Button
                hasIcon={true}
                label="Choose a photo"
                onPress={pickImageAsync}
              />
              <Button
                label="Use this photo"
                onPress={() => setShowAppOptions(true)}
              />
            </View>
          )}
        </View>
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
        <StatusBar style="light" />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
