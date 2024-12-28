import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles = {},
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      {/* Field Title */}
      <Text style={styles.label}>{title}</Text>

      {/* Input Field Container */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.activeInputContainer,
        ]}
      >
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)} // Set focus state
          onBlur={() => setIsFocused(false)} // Remove focus state
          {...props}
        />

        {/* Password Visibility Toggle */}
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#E0E0E0",
    fontFamily: "Poppins-Medium",
  },
  inputContainer: {
    width: "100%",
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: "#1E1E2A",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#2E2E38",
    flexDirection: "row",
    alignItems: "center",
  },
  activeInputContainer: {
    borderColor: "#FF9F0A",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default FormField;
