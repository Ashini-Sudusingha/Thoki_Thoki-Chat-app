import { useEffect } from "react";
import { Image, ImageBackground, StatusBar, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import CircleShape from "../components/CircleShape";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { runOnJS } from "react-native-worklets";
import { useTheme } from "../theme/ThemeProvider";

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;

export default function SplashScreen() {
  const navigation = useNavigation<Props>();
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 3000 });
    const timer = setTimeout(() => {
      navigation.replace("SignUpScreen");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: opacity.value };
  });

  const { applied } = useTheme();
  const logo =
    applied === "light"
      ? require("../../assets/thoki.png")
      : require("../../assets/thoki.png");

  return (
    <ImageBackground
      source={require("../../assets/back5.jpeg")}
      className="bg-cover flex-1 w-full h-full justify-center items-center"
    >
      <SafeAreaView className="flex-1 justify-center items-center  ">
        <StatusBar hidden={true} />


        <Animated.View style={animatedStyle}>
          <Image
            source={logo}
            style={{ height: 300, width: 320 }}
          />
        </Animated.View>

        <Animated.View className="absolute bottom-10" style={animatedStyle}>
          <View className="justify-center items-center">
            <Text className="text-xs font-bold text-slate-600 ">
              POWERED BY: {process.env.EXPO_PUBLIC_APP_OWNER}
            </Text>
            <Text className="text-xs font-bold text-slate-600 ">
              VERSION: {process.env.EXPO_PUBLIC_APP_VERSION}
            </Text>
          </View>
        </Animated.View>

      </SafeAreaView>
    </ImageBackground>
  );
}
