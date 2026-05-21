import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const recentCalls = [
  {
    name: "Don.Hash💞",
    image: require("../../assets/p1.jpeg"),
    type: "Incoming",
    time: "8:15 PM",
  },
  {
    name: "Don.Hash💞",
    image: require("../../assets/p1.jpeg"),
    type: "Outgoing",
    time: "8:14 PM",
  },
  {
    name: "Don.Hash(Chu Chuu💞)",
    image: require("../../assets/p1.jpeg"),
    type: "Incoming",
    time: "8:02 PM",
  },
  {
    name: "☀️ Ashara Madubashini ☀️",
    image: require("../../assets/p3.jpeg"),
    type: "Incoming",
    time: "12:40 PM",
  },
  {
    name: "☀️Ashara Madubashini☀️",
    image: require("../../assets/p3.jpeg"),
    type: "Outgoing",
    time: "12:39 PM",
  },
];

export default function App() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <View className={`flex-1 px-4 pt-12 ${isDark ? "bg-black" : "bg-white"}`}>
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className={`text-2xl font-bold ${isDark ? "text-white" : "text-black"}`}>
          Calls
        </Text>
        <Ionicons
          name="call-outline"
          size={24}
          color={isDark ? "white" : "black"}
        />
      </View>

      {/* Search Bar */}
      <View
        className={`flex-row items-center rounded-2xl px-4 py-2 mb-4 ${isDark ? "bg-gray-800" : "bg-gray-100"
          }`}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={isDark ? "#ccc" : "#555"}
        />
        <TextInput
          placeholder="Search or start a new call"
          placeholderTextColor={isDark ? "#aaa" : "#666"}
          className={`ml-2 flex-1 ${isDark ? "text-white" : "text-black"}`}
        />
      </View>

      {/* Favorites */}
      <Text
        className={`text-base mb-2 font-semibold ${isDark ? "text-white" : "text-black"}`}
      >
        Favorites
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        className="flex-row items-center mb-6"
      >
        <View
          className={`w-14 h-14 rounded-full items-center justify-center border ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-gray-100"
            }`}
        >
          <Ionicons name="person-add-outline" size={26} color="#888" />
        </View>
        <Text
          className={`ml-3 text-base ${isDark ? "text-white" : "text-black"}`}
        >
          Add favorite
        </Text>
      </TouchableOpacity>

      {/* Recent Calls */}
      <Text
        className={`text-base mb-3 font-semibold ${isDark ? "text-white" : "text-black"}`}
      >
        Recent
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {recentCalls.map((call, index) => (
          <View
            key={index}
            className="flex-row items-center justify-between mb-4"
          >
            <View className="flex-row items-center">
              <Image
                source={call.image}
                className="w-12 h-12 rounded-full"
              />
              <View className="ml-3">
                <Text
                  numberOfLines={1}
                  className={`text-base font-semibold ${isDark ? "text-white" : "text-black"
                    }`}
                >
                  {call.name}
                </Text>
                <View className="flex-row items-center">
                  <MaterialIcons
                    name={
                      call.type === "Incoming"
                        ? "call-received"
                        : "call-made"
                    }
                    size={16}
                    color={
                      call.type === "Incoming"
                        ? "#22c55e"
                        : "#3b82f6"
                    }
                  />
                  <Text className="ml-1 text-gray-400 text-sm">{call.type}</Text>
                </View>
              </View>
            </View>
            <Text className="text-gray-400 text-sm">{call.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
