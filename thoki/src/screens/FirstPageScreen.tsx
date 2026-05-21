import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, View, StyleSheet, SafeAreaView, Image, Pressable, Text, ImageBackground,StatusBar } from "react-native";
import { RootStack } from "../../App";

type FirstPageNavigationProps = NativeStackNavigationProp<RootStack, "FirstPageScreen">;

export function FirstPageScreen() {

    const navigator = useNavigation<FirstPageNavigationProps>();
    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white">
 
      <StatusBar hidden={true} />

            <View className="mt-[200px]">
                <Image
                    source={require("../../assets/justlogo.png")}
                    className="mx-auto mb-[20px]"
                    style={{ height: 100, width: 100 }}
                />
                <Text className="text-3xl font-bold text-purple-700 mb-[20px] ">Welcom ! to Thoki Thoki </Text>

                <Pressable className="w-[280px] h-[40px] border-4 border-r-4 border-black rounded-2xl
                mt-[20px] items-center justify-center ">
                    <Text className="text-xl text-purple-800 font-bold b" onPress={() => { navigator.navigate("SignUpScreen") }}>Sign Up</Text>
                </Pressable>
                <Pressable className="w-[280px] h-[40px]  rounded-2xl
                mt-[20px] items-center justify-center bg-purple-700">
                    <Text className="text-xl text-white font-bold b" onPress={() => { navigator.navigate("SignInScreen") }}>Sign In</Text>
                </Pressable>

            </View>
            <Image
                source={require("../../assets/coverimage.png")}
                className="w-[400px] h-[550px]"
            />


        </SafeAreaView>
    );
}

