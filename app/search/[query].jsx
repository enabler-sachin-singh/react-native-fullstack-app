import React from "react";
import { View, Text } from "react-native";
import { useSearchParams } from "expo-router";

const QueryPage = () => {
  const { query } = useSearchParams();

  return (
    <View>
      <Text>Search Query: {query}</Text>
    </View>
  );
};

export default QueryPage;
