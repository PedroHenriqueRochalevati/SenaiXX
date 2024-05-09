import AsyncStorage from "@react-native-community/async-storage";
import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { api } from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const[data, setData] = useState();
    useEffect(() => {
        async function lodStorageData(){
            const[token, user] = await AsyncStorage.multiGet(
                "@SenaiX:token",
                "@SenaiX:user",
            []);
            if(token[1] && user[1]){
                api.defaults.headers.authorization = `Bearer ${token[1]}`
                setData({token: token[1], user: JSON.parse(user[1])});
            }
        };
        lodStorageData();
        const signIn = useCallback(async({email, password}) => {
            const response = api.post("login", {email, password});
            const {token, user} = response.data;
            await AsyncStorage.multiSet([
                ["@SenaiX:token", token],
                ["@SenaiX:user", JSON.stringify(user)],
            ]);
        }, []);
        const signOut = useCallback(async() => { 
            await AsyncStorage.removeItem([
                "@SenaiX:token",
                "@SenaiX:user",
            ]);
            setData({});
        }, []);
        return(
            <AuthContext.Provider value={{...data, signIn, signOut}}>
                {children}
            </AuthContext.Provider>
        );
    });
};

export const useAuth = () => useContext(AuthContext);