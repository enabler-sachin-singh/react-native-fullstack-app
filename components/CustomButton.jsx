import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CustomButton = ({
  title,
  onPress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.button,
        containerStyles,
        isLoading && styles.buttonLoading,
      ]}
      disabled={isLoading}
    >
      <Text style={[styles.buttonText, textStyles]}>{title}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          style={styles.spinner}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF9C01",
    paddingVertical: 15,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLoading: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#161622",
    fontWeight: "600",
    fontSize: 18,
  },
  spinner: {
    marginLeft: 8,
  },
});

export default CustomButton;
