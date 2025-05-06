import axios from "axios";

const API_URL = "http://localhost:8080/extensions"; // URL da API

// Tipos para os retornos esperados
interface Extension {
  extensionNumber: number;
  loggedUser: string | null;
}

// Busca todos os ramais disponíveis
export const getAvailableExtension = async (): Promise<Extension[]> => {
  try {
    const response = await axios.get(`${API_URL}/available`);
    return response.data; // Retorna a lista de ramais disponíveis
  } catch (error) {
    console.error("Erro ao buscar ramal disponível:", error);
    throw new Error("Erro ao buscar ramal disponível");
  }
};

// Faz login em um ramal
export const loginToExtension = async (extensionNumber: string, user: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/login`, null, {
      params: { extensionNumber, user },
    });
    return response.data.message; // Retorna a mensagem de sucesso
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    throw new Error("Erro ao realizar login");
  }
};

// Faz logout de um ramal
export const logoutFromExtension = async (extensionNumber: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/logout`, null, {
      params: { extensionNumber },
    });
    return response.data.message; // Retorna a mensagem de sucesso
  } catch (error) {
    console.error("Erro ao realizar logout:", error);
    throw new Error("Erro ao realizar logout");
  }
};

// Busca todos os ramais em uso
export const getExtensionsInUse = async (): Promise<Extension[]> => {
  try {
    const response = await axios.get(`${API_URL}/in-use`);
    return response.data; // Retorna a lista de ramais em uso
  } catch (error) {
    console.error("Erro ao buscar ramais em uso:", error);
    throw new Error("Erro ao buscar ramais em uso");
  }
};
