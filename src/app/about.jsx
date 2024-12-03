import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function About() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Sobre</Text>
            <Button title="voltar" onPress={() => {router.replace("/")}} />
        </View>
    );
}