import { AntDesign } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserRegistration } from "../components/UserContext";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";
import { validateCountryCode, validatePhoneNo } from "../util/Validation";
import { signInAccount } from "../api/UserService";
import { AuthContext } from "../components/AuthProvider";
type ContactProps = NativeStackNavigationProp<RootStack, "ContactScreen">;

export default function ContactScreen() {
  const navigation = useNavigation<ContactProps>();
  const [loading, setLoading] = useState(false);

  const [countryCode, setCountryCode] = useState<CountryCode>("LK"); // default country code
  const [country, setCountry] = useState<Country | null>(null);
  const [show, setShow] = useState<boolean>(false);

  const { userData, setUserData } = useUserRegistration();
  const [callingCode, setCallingCode] = useState("+94");
  const [phoneNo, setPhoneNo] = useState("");

    const auth = useContext(AuthContext);

  return (
     <ImageBackground
          source={require("../../assets/back5.jpeg")}
          className="bg-cover flex-1 w-full h-full justify-center items-center"
        >
    <SafeAreaView className="items-center">
      <StatusBar hidden={true} />
     
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 100 : 100}
      >
        
          <View className="bg-white/50 -50 rounded-2xl m-5 ">
            <View className="p-5 items-center">
               <Text className="font-semibold text-purple-900 text-3xl mr-[220px]">
                Sign In
              </Text>
              <View>
                <Image
                    source={require("../../assets/justlogo.png")}
                    className="mx-auto mb-[60px] mt-[30px]"
                    style={{ height: 100, width: 100 }}
                />            
              </View>
              <View>
                <Text className="text-slate-600 font-bold">
                  We use your contacts to help you find friends who are already on
                  the app. Your contacts stay private.
                </Text>
              </View>
              <View className="mt-5 w-full mb-10">
                <View className="border-b-2 border-purple-900  justify-center items-center flex-row h-14 mb-3">
                  <CountryPicker
                    countryCode={countryCode}
                    withFilter
                    withFlag
                    withCountryNameButton
                    withCallingCode
                    visible={show}
                    onClose={() => {
                      setShow(false);
                    }}
                    onSelect={(c) => {
                      setCountryCode(c.cca2);
                      setCountry(c);
                      setShow(false);
                    }}
                  />

                  <AntDesign
                    name="caret-down"
                    size={18}
                    color="black"
                    style={{ marginTop: 5 }}
                  />
                </View>
                <View className="mt-2 flex flex-row justify-center">
                  <TextInput
                    inputMode="tel"
                    className="h-16 font-bold text-lg  bg-white w-[18%] p-4 rounded-2xl"
                    placeholder="+94"
                    editable={false}
                    value={country ? `+${country.callingCode}` : callingCode}
                    onChangeText={(text) => {
                      setCallingCode(text);
                    }}
                    
                  />
                  <TextInput
                    inputMode="tel"
                    className="h-16 font-bold text-lg bg-white rounded-2xl w-[80%] ml-2 p-4"
                    placeholder="77 #### ###"
                    value={phoneNo}
                    onChangeText={(text) => {
                      setPhoneNo(text);
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="mt-[20px] w-full mx-auto">
            <Pressable
              className="justify-center items-center bg-purple-700 h-14 rounded-2xl w-[300px]"
              onPress={async () => {
                const validCountryCode = validateCountryCode(callingCode);
                const validPhoneNo = validatePhoneNo(phoneNo);

                if (validCountryCode) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validCountryCode,
                  });
                } else if (validPhoneNo) {
                  Toast.show({
                    type: ALERT_TYPE.WARNING,
                    title: "Warning",
                    textBody: validPhoneNo,
                  });
                } else {
                  setUserData((previous) => ({
                    ...previous,
                    countryCode: country
                      ? `+${country.callingCode}`
                      : callingCode,
                    contactNo: phoneNo,
                  }));
                   try {
                                    setLoading(true);
                                    console.log(userData)
                                    const response = await signInAccount(userData);
                                    if (response.status) {
                                      const id = response.userId;
                                      if (auth) {
                                        await auth.signUp(String(id));
                                        // navigation.replace("HomeScreen");
                                      }
                                    } else {
                                      Toast.show({
                                        type: ALERT_TYPE.WARNING,
                                        title: "Warning",
                                        textBody: response.message,
                                      });
                                    }
                                  } catch (error) {
                                    console.log(error);
                                  } finally {
                                    setLoading(false);
                                  }
                }
              }}
            >
              <Text className="text-xl font-bold text-slate-50">Next</Text>
            </Pressable>

          </View>
           </KeyboardAvoidingView>
               </SafeAreaView>
        </ImageBackground>
     

  );
}
