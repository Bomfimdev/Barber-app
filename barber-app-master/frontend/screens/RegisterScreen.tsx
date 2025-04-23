import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Icon, Input, Layout, Spinner, Text } from "@ui-kitten/components";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, TouchableWithoutFeedback } from "react-native";
import { RootStackParamList } from "../AppNavigator";
import { auth } from "../config/firebaseConfig";
import { doPasswordsMatch, isPasswordValid, isValidEmail } from "../utils/formValidation"; // Importando as funções

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "Register">;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureConfirmTextEntry, setSecureConfirmTextEntry] = useState(true);

  const handleRegister = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Cadastro realizado com sucesso!");
        navigation.navigate("Home");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError("Este e-mail já foi cadastrado.");
        } else {
          setError(error.message);
        }
        Alert.alert("Erro ao realizar cadastro:", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isFormValid = () => {
    return (
      isValidEmail(email) && doPasswordsMatch(password, confirmPassword) && isPasswordValid(password) // Verifica se a senha é válida
    );
  };

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
    setSecureConfirmTextEntry(!secureConfirmTextEntry);
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
      <Input
        label="Confirme sua senha"
        placeholder="Confirme sua senha"
        secureTextEntry={secureConfirmTextEntry}
        value={confirmPassword}
        accessoryRight={renderIcon}
        onChangeText={setConfirmPassword}
        style={{ marginBottom: 15 }}
      />
      {loading ? (
        <Spinner style={{ justifyContent: "center" }} />
      ) : (
        <Button onPress={handleRegister} disabled={!isFormValid()}>
          Cadastrar
        </Button>
      )}
      <Button appearance="ghost" onPress={() => navigation.navigate("Login")} style={{ marginTop: 10 }}>
        Já tem uma conta? Faça login
      </Button>
    </Layout>
  );
};

export default RegisterScreen;
