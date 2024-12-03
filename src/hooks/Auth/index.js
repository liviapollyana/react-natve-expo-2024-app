import { createContext, useContext, useEffect, useState } from "react";
import { useUserDatabase, useUserDatabaseauthUser } from "../../database/useUsersDatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, View } from "react-native";

const AuthContext = createContext({}); 

export const Role = {
    SUPER: "SUPER",
    ADM: "ADM",
    USER: "USER"
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        autenticated: null,
        user: null,
        role: null,
    });

    const { authUser }  = useUserDatabase();

    useEffect(() => {
        const loadStorangeData = async () => {
            const storageuser = await AsyncStorage.getItem("@payment:user");

            if (storageuser) {
                setUser({
                    autenticated: true, 
                    user: JSON.parse(storageuser),
                    role: JSON.parse(storageuser).role,
                });
            } else {
                setUser({
                    autenticated: false, 
                    user: null,
                    role: null,
                });
            }
        }
    });

    loadStorangeData();

    const signIn = async ({ email, password }) => {
        const response = await authUser({ email, password });

        if (!response) {
            setUser({
                autenticated: false, 
                user: null,
                role: null,
            });
            throw new Error("Usuário ou senha inválidos!");
        }

        await AsyncStorage.setItem("@payment:user", JSON.stringify(response));

        setUser({
            autenticated: true, 
            user: response, 
            role: response.role,
        });
    };    

    const signOut = async () => {
        await AsyncStorage.removeItem("@payment:user");
        setUser({});
    };

    if (user?.autenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 28, marginTop: 15 }}>
                    Carregando Dados do Usuário
                </Text>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};