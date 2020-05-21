import React, { useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const data = {
      url: "https://github.com/mauricio-cantu",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["Javascript", "Elixir"],
    };

    try {
      const response = await api.post("repositories", data);
      const repository = response.data;
      setRepositories([...repositories, repository]);
    } catch (error) {
      alert("Erro ao cadastrar repositório.");
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch (error) {
      alert("Erro ao deletar repositório.");
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
