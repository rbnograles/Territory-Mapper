import React from "react";

import Phase7 from "@/components/maps/Phase7";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedView } from "@/components/themed-view";
import Button from "@/components/ui/button";
import { Image } from "expo-image";
import { StyleSheet, Text } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function MapScreen() {
  // Shared values for zoom and pan
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1); // stores the scale after pinch ends
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedX = useSharedValue(0);
  const savedY = useSharedValue(0);

  // Pinch (Zoom)
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      // Apply scale relative to last saved scale
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      // Save the scale so it persists
      savedScale.value = scale.value;
    });

  // Pan (Move)
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = savedX.value + e.translationX;
      translateY.value = savedY.value + e.translationY;
    })
    .onEnd(() => {
      savedX.value = translateX.value;
      savedY.value = translateY.value;
    });

  // Combine pinch + pan
  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const resetViewGesture = () => {
    scale.value = 1;
    savedScale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    savedX.value = 0;
    savedY.value = 0;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#e77dffff", dark: "#d2d2d2ff" }}
      headerImage={
        <>
          <Image
            source={require("@/assets/territory-banner/phase7-logo.png")}
            style={styles.bannerLogo}
          />
          <Text style={styles.titleContainer}>Terr. # 40: Phase 7</Text>
        </>
      }
    >
      {/* GestureHandlerRootView is needed for gestures to work */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemedView style={styles.container}>
          <GestureDetector gesture={composedGesture}>
            <Animated.View style={animatedStyle}>
              <Phase7 />
            </Animated.View>
          </GestureDetector>
        </ThemedView>
        <Button
          title="Reset"
          onPress={() => resetViewGesture()}
          style={{ position: "absolute", right: 5, bottom: 5 }}
        />
      </GestureHandlerRootView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    overflow: "hidden",
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 52,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  bannerLogo: {
    height: 250,
    width: 290,
    bottom: -50,
    left: 0,
    position: "absolute",
  },
});
