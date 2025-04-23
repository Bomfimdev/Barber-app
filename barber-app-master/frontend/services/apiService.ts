import axios from "axios";

const API_BASE_URL = "http://localhost:8080/agendamentos";

export const scheduleService = async (nome, hora, dia) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/agendar`, {
      nome,
      hora,
      dia,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao agendar serviço:", error);
    throw error;
  }
};
