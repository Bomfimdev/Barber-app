import { Button, Layout, Text } from "@ui-kitten/components";
import React from "react";
import homeStyles from "../styles/homeStyles";

const HomeScreen = ({ navigation }) => {
  return (
    <Layout style={homeStyles.container}>
      <Text category="h1" style={homeStyles.welcomeText}>
        Bem-vindo à BarberConha!
      </Text>
      <Button style={homeStyles.button} onPress={() => navigation.navigate("Schedule")}>
        Agendar Serviço
      </Button>
      <Button style={homeStyles.button} onPress={() => navigation.navigate("Services")}>
        Ver Serviços
      </Button>
      <Button appearance="ghost" style={homeStyles.button} onPress={() => navigation.navigate("Login")}>
        Sair
      </Button>
    </Layout>
  );
};

export default HomeScreen;
