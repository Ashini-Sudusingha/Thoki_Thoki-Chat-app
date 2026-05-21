import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useUserProfile } from "../socket/UseUserProfile";
import { uploadProfileImage } from "../api/UserService";
import { AuthContext } from "../components/AuthProvider";

type ProfileScreenProp = NativeStackNavigationProp<RootStack, "ProfileScreen">;
export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenProp>();
  const { applied } = useTheme();
  const userProfile = useUserProfile();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "My Profile",
      headerStyle: {
        backgroundColor: applied === "dark" ? "black" : "#faf5ff",
      },
      headerTintColor: applied === "dark" ? "#fff" : "black",
    });
  }, [navigation, applied]);

  const [image, setImage] = useState<string | null>(null);
  const auth = useContext(AuthContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadProfileImage(String(auth ? auth.userId : 0), result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-slate-700 ">
      <View className="flex-1 mt-10 w-full p-5">
        <View className="items-center mb-[20px]">
          {image ? (
            <Image
              className="w-40 h-40 rounded-full border-gray-300 border-2"
              source={{ uri: image }}
            />
          ) : (
            <Image
              className="w-40 h-40 rounded-full border-gray-300 border-2"
              source={{ uri: userProfile?.profileImage }}
            />
          )}
        </View>
        <View className="my-1 mb-[30px] mt-[5px]">
          <TouchableOpacity
            className="justify-center items-center h-12"
            onPress={() => {
              pickImage();
            }}
          >
            <Text className="font-bold text-purple-900 text-lg dark:text-purple-100">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View className="justify-start flex-col gap-y-2 my-3">
          <View className="flex-row gap-x-3 items-center">
            <Feather name="user" size={24} color="black" />
            <Text className="font-bold text-lg dark:text-white">Name</Text>
          </View>
          <View className="bg-purple-50 w-[300px] h-[45px] mx-auto rounded-xl shadow-slate-100 ps-4 justify-center">
          <Text className="font-bold text-lg ">
            {userProfile?.firstName} {userProfile?.lastName}
          </Text></View>
        </View>
        <View className="justify-start flex-col gap-y-2 my-3">
          <View className="flex-row gap-x-3 items-center">
            <Feather name="phone" size={24} color="black" />
            <Text className="font-bold text-lg dark:text-white">Phone</Text>
          </View>
          <View className="bg-purple-50 w-[300px] h-[45px] mx-auto rounded-xl shadow-slate-100 justify-center ps-4">
          <Text className="font-bold text-lg ">
            {userProfile?.countryCode} {userProfile?.contactNo}
          </Text></View>
        </View>
      </View>
    </SafeAreaView>
  );
}
