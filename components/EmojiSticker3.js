import { View, Image } from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import {
  TapGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

const EmojiSticker3 = ({ imageSize, stickerSource }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const sharedImageSize = useSharedValue(imageSize);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(sharedImageSize.value),
      height: withSpring(sharedImageSize.value),
    };
  });

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (sharedImageSize.value !== imageSize * 2) {
        sharedImageSize.value = sharedImageSize.value * 2;
      } else if (sharedImageSize.value === imageSize * 2) {
        sharedImageSize.value = imageSize;
      }
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });
  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <AnimatedImage
            source={stickerSource}
            style={[animatedStyle, { height: imageSize, width: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
};

export default EmojiSticker3;
