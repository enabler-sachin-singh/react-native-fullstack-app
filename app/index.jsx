import { useContext, useState } from "react";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { GlobalContext } from "../contexts/GlobalProvider";

const App = () => {
  const GlobalCtx = useContext(GlobalContext);
  const { isLoggedIn, isLoading } = GlobalCtx;

  if (!isLoading && isLoggedIn) {
    <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View
          className="w-full 
          justify-center
        items-center h-full px-4"
        >
          {/* Logo */}
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />

          {/* Card Image */}
          <Image
            source={images.cards}
            className="w-[380px] h-[300px]"
            resizeMode="contain"
          />

          {/* Heading Section */}
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            {/* Path Image (Orange Line) */}
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-4 left-1/2 transform -translate-x-1/2"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 my-7 text-center">
            Where Creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            onPress={() => {
              router.replace("/home");
            }}
            containerStyles={{ width: "100%", marginTop: 20 }}
            textStyles={{ fontSize: 16 }}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default App;
