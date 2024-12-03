// import { AuthProvider } from "./Auth";
import { AuthProvider } from "./Auth";
import { DataProvider } from "./Data";
import { FontProvider } from "./Font";

export function AppProvider({ children }) {
  return (
    <FontProvider>
      <DataProvider>
        <AuthProvider>{children}</AuthProvider>
      </DataProvider>
    </FontProvider>
  );
}