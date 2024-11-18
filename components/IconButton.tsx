// components/CustomIcon.tsx
import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg"; 
import { Colors } from "@/constants";
import { Icon } from "iconsax-react-native";

interface IconButtonProps {
  onPress?: () => void;
  size?: number;
  color?: string;
  style?: ViewStyle;
  icon: Icon;
}

const IconButton = ({
  onPress,
  size = 24,
  color = Colors.white,
  style,
  icon: Icon,
}: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.iconWrapper, style]}>
      <Icon size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 12,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 10,
  },
});

export default IconButton;
