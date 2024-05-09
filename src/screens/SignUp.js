import React, { useState } from "react";
import {
  Text,
  TextInput,
  View, TouchableOpacity, StyleSheet, Alert
} from "react-native";
import { Feather } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";

export default function SignUp() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit() {
    setError("");
    if (!email.trim() || !userName.trim() || !password.trim()) {
      setError("Por favor, preencha todos os campos!");
      return;
    }
    try {
      await api.post("registrar", {
        email,
        username,
        password
      });
      Alert.alert("Sucesso", "Usuários criado com sucesso");
    } catch (err) {
      if(err.response){
        setError(err.response.data.message);
      }
      setError("Não foi possível se conectar com o servidor");
    }
  }
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={32} color="#8a8787" />
      </TouchableOpacity>
      <View>
        <Text style={style.title}>Estamos quase lá.</Text>
        <Text style={style.subtitle}>Faça seu login para começar a utilizar o app.</Text>
      </View>
      <View style={{ gap: 16 }}>
        <View style={style.inputBox}>
          <Feather name="user" size={24} color="#8a8787" />
          <TextInput placeholder="Digite seu nome" placeholderTextColor="#8a8787"  style={style.input} onChangeText={(text) => setUserName} />
        </View>
        <View style={style.inputBox}>
          <Feather name="mail" size={24} color="#8a8787" />
          <TextInput placeholder="Digite seu email" placeholderTextColor="#8a8787" keyboardType="email-address" style={style.input} onChangeText={(text) => setEmail} />
        </View>
        <View style={style.inputBox}>
          <Feather name="lock" size={32} color="#8a8787" />
          <TextInput placeholder="Digite sua senha" placeholderTextColor="#8a8787" secureTextEntry style={style.input} onChangeText={(text) => setPassword}/>
        </View>
        {error && <Text style={style.erro}>{error}</Text>}
        <MyButton text="Login" onPress={() => handleSubmit()} style={{ width: "100%" }} />
      </View>
    </View>
  );
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "streach",
    justifyContent: "space-between",
    padding: 16,
  },

  title: {
    fontSize: 54,
    fontWeight: "700",
    width: 240,
    color: "#3D3D4D",
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "300",
    width: 280,
    marginTop: 16,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#8a8787",
    borderRadius: 4,
    width: "100%",
  },

  input: {
    flex: 1,
    fontSize: 18,
  },
  erro: {
    color: "#DC1637",
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 16,
  },
});
