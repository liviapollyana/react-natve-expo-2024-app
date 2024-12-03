import { useFonts } from "expo-font";
import { createContext, useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const FontContext = createContext();

export function FontProvider({ children }) {
  const [loaded, error] = useFonts({
    regular: require("../../assets/fonts/Montserrat-Regular.ttf"),
    bold: require("../../assets/fonts/Montserrat-Bold.ttf"),
    thin: require("../../assets/fonts/Montserrat-Thin.ttf"),
    light: require("../../assets/fonts/Montserrat-Light.ttf"),
    medium: require("../../assets/fonts/Montserrat-Medium.ttf"),
    semiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    extraBold: require("../../assets/fonts/Montserrat-ExtraBold.ttf"),
    black: require("../../assets/fonts/Montserrat-Black.ttf"),
  });

  if (!loaded && !error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando usuários</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FontContext.Provider value={{ loaded }} style={{ flex: 1 }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}