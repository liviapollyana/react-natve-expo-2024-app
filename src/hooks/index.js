import { AuthProvider } from "./Auth";
import { FontProvider } from "./Font";

export function AppProvider({ children }) {
    return (
        <FontProvider>
            <AuthProvider>{children}</AuthProvider>
        </FontProvider>
    );
}