import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  initialQuery,
  otherStyles = {},
  ...props
}) => {
  const [query, setQuery] = useState(initialQuery || "");
  const [isFocused, setIsFocused] = useState(false);
  const pathName = usePathname();

  const onHandleSearch = () => {
    if (!query) {
      Alert.alert(
        "Missing query",
        "Please input something to search results across database"
      );
      return;
    }

    // Check if current path starts with "/search"
    if (pathName.startsWith("/search")) {
      const searchParams = new URLSearchParams({ query });
      router.replace(`/search?${searchParams.toString()}`);
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View
      style={[
        styles.inputContainer,
        isFocused && styles.activeInputContainer,
        otherStyles,
      ]}
    >
      <TextInput
        style={styles.input}
        value={value}
        placeholder={"Search for a video topic"}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        secureTextEntry={title === "Password"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <TouchableOpacity onPress={onHandleSearch}>
        <Image source={icons.search} style={styles.icon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
    width: 20,
    height: 20,
  },
});

export default SearchInput;
