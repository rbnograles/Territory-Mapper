import { Colors } from "@/constants/theme";
import React from "react";
import { Pressable, StyleProp, Text, ViewStyle } from "react-native";

type ButtonProps = {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
};

export default function Button({ onPress, title, style }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        { padding: 10, backgroundColor: Colors.light.tint, borderRadius: 5 },
        style,
      ]}
    >
      <Text style={{ color: "white", textAlign: "center" }}>{title}</Text>
    </Pressable>
  );
}
