import { View, Image } from "react-native";
import React from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  TapGestureHandler,
  PanGestureHandler,
} from "react-native-gesture-handler";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

const EmojiSticker2 = ({ imageSize, stickerSource }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const sharedImageSize = useSharedValue(imageSize);

  const onAnimate = useAnimatedGestureHandler({
    onActive: () => {
      if (sharedImageSize.value !== imageSize * 2) {
        sharedImageSize.value = sharedImageSize.value * 2;
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(sharedImageSize.value),
      height: withSpring(sharedImageSize.value),
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
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onAnimate} numberOfTaps={2}>
          <AnimatedImage
            source={stickerSource}
            style={[animatedStyle, { height: imageSize, width: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
};

export default EmojiSticker2;
