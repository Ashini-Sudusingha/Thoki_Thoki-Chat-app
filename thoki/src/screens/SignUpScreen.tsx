import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,

} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { useTheme } from "../theme/ThemeProvider";
import { FloatingLabelInput } from "react-native-floating-label-input";
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import { validateFirstName, validateLastName } from "../util/Validation";

type SignUpProps = NativeStackNavigationProp<RootStack, "SignUpScreen">;

export default function SignUpScreen() {
  const navigation = useNavigation<SignUpProps>();
  const { applied } = useTheme();
  const logo =
    applied === "light"
      ? require("../../assets/justlogo.png")
      : require("../../assets/justlogo.png");

  const { userData, setUserData } = useUserRegistration();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <ImageBackground
        source={require("../../assets/back5.jpeg")}
        className="bg-cover flex-1 w-full h-full justify-center items-center"
      >
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
      className="flex-1 items-center "
    >
      
        <SafeAreaView className="justify-center items-center p-5">
          <StatusBar hidden={true} />
          <View className="bg-white/50 p-5 rounded-2xl mt-[100px] w-[370px]">
            <Text className="font-semibold text-purple-900 text-3xl ">
                Sign Up
              </Text>
             <Image
                    source={require("../../assets/justlogo.png")}
                    className="mx-auto mb-[45px] mt-[10px]"
                    style={{ height: 100, width: 100 }}
                />
            <View className="w-full justify-start items-start">
              <Text className="font-semibold text-black text-2 ">
                Create Your Thoki (づ ◕‿◕ )づ Thoki Account
              </Text>
              <Text className="font-normal text-black text-sm mt-[5px] ">
                signup with Thoki Thoki with today.Lest Start!
              </Text>
            </View>
            <View className="self-stretch mt-[15px]">
              <View className="w-full my-3">
                <FloatingLabelInput                  
                  label={"Enter Your First Name"}
                  value={userData.firstName}
                   containerStyles={{
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    height: 50,
                  }}
                  onChangeText={(text) => {
                    setUserData((previous) => ({
                      ...previous, 
                      firstName: text,
                    }));
                    
                  }}
                />
              </View>
              <View className="w-full my-3">
                <FloatingLabelInput
                  label={"Enter Your Last Name"}
                  value={userData.lastName}
                   containerStyles={{
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    paddingHorizontal: 15,
                    height: 50,
                  }}
                  onChangeText={(text) => {
                    setUserData((previous) => ({
                      ...previous,
                      lastName: text,
                    }));
                  }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
        <View className="mt-1 w-full px-5">
          <Pressable
            className="bg-purple-700 h-14 justify-center items-center rounded-2xl w-[300px]"
            onPress={() => {
              let validFirstName = validateFirstName(userData.firstName);
              let validLastName = validateLastName(userData.lastName);
              if (validFirstName) {
                // skip null
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: "Warning",
                  textBody: validFirstName,
                });
              } else if (validLastName) {
                // skip null
                Toast.show({
                  type: ALERT_TYPE.WARNING,
                  title: "Warning",
                  textBody: validLastName,
                });
              } else {
                navigation.navigate("ContactScreen");
              }
            }}
          >
            <Text className="text-white font-bold text-xl">Next</Text>
          </Pressable>
        </View>

      
    </KeyboardAvoidingView>
    </ImageBackground>
  );
}
