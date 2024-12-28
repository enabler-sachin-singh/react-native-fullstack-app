import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle input changes
  const onHandleChange = (field, value) => {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  // Function to submit the form
  const onHandleSubmit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh]  px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>

          {/* Email Field */}
          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your Email"
            handleChangeText={(value) => onHandleChange("email", value)}
            otherStyles={{ marginTop: 20 }}
          />

          {/* Password Field */}
          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            handleChangeText={(value) => onHandleChange("password", value)}
            otherStyles={{ marginTop: 20 }}
          />

          <CustomButton
            title="Sign In"
            onPress={onHandleSubmit}
            containerStyles={{ marginTop: 20 }}
            textStyles={{ fontSize: 16 }}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
