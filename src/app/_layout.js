import { Stack } from "expo-router";
import { AppProvider } from "../hooks";

export default function Layout() {
    return (
        <AppProvider>
          <Stack />
        </AppProvider>
    );
}