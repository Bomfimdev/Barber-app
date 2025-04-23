import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Icon, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, TouchableWithoutFeedback } from "react-native";
import { RootStackParamList } from "../AppNavigator";
import { auth } from "../config/firebaseConfig";
import { handleAuthError } from "../utils/authUtils";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Login realizado com sucesso!");
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorMessage = handleAuthError(error);
        setError(errorMessage);
        Alert.alert("Erro ao realizar login", errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      {error ? (
        <Text status="danger" category="s1" style={{ marginBottom: 4 }}>
          {error}
        </Text>
      ) : null}
      <Input
        label="Email"
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 15 }}
      />
      <Input
        label="Senha"
        placeholder="Digite sua senha"
        secureTextEntry={secureTextEntry}
        value={password}
        accessoryRight={renderIcon}
        onChangeText={setPassword}
        style={{ marginBottom: 15 }}
      />
      {loading ? (
        <Spinner style={{ justifyContent: "center", alignItems: "center" }} />
      ) : (
        <Button onPress={handleLogin}>Login</Button>
      )}
      <Button appearance="ghost" onPress={() => navigation.navigate("Register")} style={{ marginTop: 10 }}>
        Não tem uma conta? Registre-se
      </Button>
    </Layout>
  );
};

export default LoginScreen;
