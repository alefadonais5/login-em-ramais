import { useState, useEffect } from "react";
import { getAvailableExtension, loginToExtension, logoutFromExtension, getExtensionsInUse } from "./services/api";
import { AiFillCloseSquare } from "react-icons/ai";
import "./App.css";

// Interface para tipar os ramais
interface Extension {
  extensionNumber: number;
  loggedUser: string | null;
}

function App() {
  const [availableExtension, setAvailableExtension] = useState<string | null>(null);
  const [extensionsInUse, setExtensionsInUse] = useState<Extension[]>([]); 
  const [extensionNumber, setExtensionNumber] = useState(""); 
  const [username, setUsername] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [message, setMessage] = useState<string | null>(null);
  const [shouldUpdateExtensions, setShouldUpdateExtensions] = useState(false); 

  // Carrega os ramais em uso
  useEffect(() => {
    getExtensionsInUse()
      .then((response) => {
        if (Array.isArray(response)) {
          setExtensionsInUse(response);
        } else {
          setMessage("Erro ao buscar ramais em uso");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar ramais em uso:", error);
        setMessage("Erro ao buscar ramais em uso");
      });
  }, []);

  // Busca o primeiro ramal disponível que não está em uso
  const fetchAvailableExtension = () => {
    setLoading(true);
    setMessage(null); 

    getAvailableExtension()
      .then((response) => {
        if (Array.isArray(response) && response.length > 0) {
          
          const available = response.find(
            (ext) => !extensionsInUse.some((inUse) => inUse.extensionNumber === ext.extensionNumber)
          );
          if (available) {
            setAvailableExtension(available.extensionNumber.toString());
          } else {
            setAvailableExtension("Nenhum disponível");
          }
        } else {
          setAvailableExtension("Nenhum disponível");
        }
      })
      .catch(() => {
        setMessage("Erro ao buscar ramal disponível");
      })
      .finally(() => setLoading(false));
  };

  // Realiza o login em um ramal
  const handleLogin = () => {
    if (!extensionNumber || !username) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Verifica se o ramal já está em uso
    const isExtensionInUse = extensionsInUse.some(
      (ext) => ext.extensionNumber === parseInt(extensionNumber)
    );
    if (isExtensionInUse) {
      setMessage("Este ramal já está em uso.");
      setAvailableExtension(null); // Limpa a mensagem de ramal disponível
      return; 
    }

    loginToExtension(extensionNumber, username)
      .then(() => {
        setMessage(`Ramal ${extensionNumber} logado com sucesso como ${username}`);
        // Limpa a mensagem sobre o ramal disponível após o login
        setAvailableExtension(null);
        // Atualiza a lista de ramais em uso após o login
        getExtensionsInUse()
          .then((response) => {
            if (Array.isArray(response)) {
              setExtensionsInUse(response);
            } else {
              setMessage("Erro ao buscar ramais em uso após login");
            }
          })
          .catch((error) => console.error("Erro ao atualizar ramais em uso:", error));
      })
      .catch((error) => {
        setMessage(`Erro ao realizar login: ${error.message}`);
      });
  };

  // Realiza o logout de um ramal
  const handleLogout = (extNumber: number) => {
    logoutFromExtension(extNumber.toString())
      .then(() => {
        setMessage(`Ramal ${extNumber} deslogado com sucesso`);
        setAvailableExtension(null); // Limpa a mensagem sobre o ramal disponível após o logout
        setShouldUpdateExtensions(true); // Dispara a atualização da lista de ramais
      })
      .catch((error) => {
        setMessage(`Erro ao realizar logout: ${error.message}`);
      });
  };

  
  useEffect(() => {
    if (shouldUpdateExtensions) {
      // Atualiza a lista de ramais em uso após o logout
      getExtensionsInUse()
        .then((response) => {
          if (Array.isArray(response)) {
            setExtensionsInUse(response);
            setShouldUpdateExtensions(false); 
          } else {
            setMessage("Erro ao buscar ramais em uso após logout");
          }
        })
        .catch((error) => {
          console.error("Erro ao atualizar ramais em uso:", error);
          setMessage("Erro ao atualizar ramais em uso");
        });
    }
  }, [shouldUpdateExtensions]); 

  return (
    <div className="container">
      <h1>Gerenciador de Ramais</h1>

      <button onClick={fetchAvailableExtension}>Buscar Ramal Disponível</button>
      {loading && <p>Buscando...</p>} {/* Mostra o estado de carregamento */}
      {availableExtension && <p>Ramal disponível: {availableExtension}</p>}
      {message && <p>{message}</p>} {/* Exibe mensagem dinâmica */}

      <h2>Login no Ramal</h2>
      <input
        type="text"
        placeholder="Número do Ramal"
        value={extensionNumber}
        onChange={(e) => setExtensionNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      <h2>Ramais em Uso</h2>
      <table>
        <thead>
          <tr>
            <th>Ramal</th>
            <th>Usuário Logado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {extensionsInUse.map((ext) => (
            <tr key={ext.extensionNumber}>
              <td>{ext.extensionNumber}</td>
              <td>{ext.loggedUser || "Nenhum"}</td>
              <td>
                <button className="logout-button" onClick={() => handleLogout(ext.extensionNumber)}>
                  <AiFillCloseSquare className="logout-icon"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
