import React from "react";
import { View, Text, Image, ScrollView, useColorScheme } from "react-native";

const statuses = [

  {
    name: "Hashen Malsha",
    time: "1h ago",
    image: require("../../assets/staus2.jpeg"),
  },
  {
    name: "Kasuni Nirmal",
    time: "2h ago",
    image: require("../../assets/status3.jpeg"),
  },
    {
    name: "Senuri Galkotuwa",
    time: "24h ago",
    image: require("../../assets/staus2.jpeg"),
  },
];


export default function App() {
  const scheme = useColorScheme(); // auto detect dark/light
  const isDark = scheme === "dark";

  return (
    <View className={`flex-1 ${isDark ? "bg-black" : "bg-white"} px-4 pt-12`}>
      {/* Header */}
      <Text className={`text-2xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>
        Status
      </Text>

      {/* My Status */}
      <View className="flex-row items-center mb-6">
        <Image
         source={require("../../assets/status4.jpeg")}
          className="w-14 h-14 rounded-full border border-gray-400"
        />
        <View className="ml-4 flex-1">
          <Text className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>
            My Status
          </Text>
          <Text className="text-gray-400">Add to my status</Text>
        </View>
        <View className="flex-row">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center mr-2 ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <Text className={`${isDark ? "text-white" : "text-black"}`}>📷</Text>
          </View>
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          >
            <Text className={`${isDark ? "text-white" : "text-black"}`}>✏️</Text>
          </View>
        </View>
      </View>

      {/* Recent Updates */}
      <Text className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-black"}`}>
        Recent updates
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {statuses.map((user, index) => (
          <View key={index} className="flex-row items-center mb-4">
            <Image
              source={user.image}
              className="w-14 h-14 rounded-full border-2 border-green-500"
            />
            <View className="ml-4">
              <Text className={`font-semibold ${isDark ? "text-white" : "text-black"}`}>
                {user.name}
              </Text>
              <Text className="text-gray-400">{user.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer text */}
      <Text className="text-center text-gray-400 mt-auto mb-2 text-sm">
        Your status updates are end-to-end encrypted 🔒
      </Text>
    </View>
  );
}
