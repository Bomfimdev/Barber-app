import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Datepicker, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { RootStackParamList } from "../AppNavigator";
import { scheduleService } from "../services/apiService";
import scheduleStyles from "../styles/scheduleStyles";
import { formatTimeInput } from "../utils/formValidation";

type ScheduleScreenNavigationProp = StackNavigationProp<RootStackParamList, "Schedule">;

const ScheduleScreen = () => {
  const [name, setName] = useState("");
  const [day, setDay] = useState(new Date());
  const [time, setTime] = useState("");
  const navigation = useNavigation<ScheduleScreenNavigationProp>();

  const handleSchedule = async () => {
    try {
      const formattedDay = day.toISOString().split("T")[0];
      const formattedTime = time;
      await scheduleService(name, formattedTime, formattedDay);
      alert("Serviço agendado com sucesso!");
      navigation.navigate("Home");
    } catch (error) {
      alert("Erro ao agendar o serviço.");
    }
  };

  return (
    <Layout style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text category="h1" style={{ marginBottom: 9 }}>
        Agendar um horario
      </Text>
      <Input placeholder="Nome" value={name} onChangeText={setName} style={{ marginBottom: 15 }} />
      <Datepicker date={day} min={new Date()} onSelect={(nextDate) => setDay(nextDate)} style={{ marginBottom: 15 }} />
      <Input
        placeholder="Hora"
        value={time}
        onChangeText={(text) => setTime(formatTimeInput(text))}
        style={{ marginBottom: 15 }}
      />
      <Button style={scheduleStyles.button} onPress={handleSchedule}>
        Confirmar Agendamento
      </Button>
    </Layout>
  );
};

export default ScheduleScreen;
