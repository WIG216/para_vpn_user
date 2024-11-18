import { View, Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from "react-native";
import React from "react";
import { Colors } from "@/constants";

interface ButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: ViewStyle ;
  textStyles?: TextStyle;
  isLoading?: boolean;
}

const Button = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.buttonContainer,
        containerStyles,
        isLoading && styles.buttonLoading,
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    minHeight: 62,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  buttonText: {
    fontSize: 18,
    color: Colors.black,
    fontFamily: "Poppins-SemiBold",
  },

  buttonLoading: {
    opacity: 0.5,
  },
});

export default Button;
