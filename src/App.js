import React,{ useEffect, useState } from "react";

import "./styles.css";

import api from './services/api'

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => 
      setRepositories(response.data))  
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Melqui Sodre",
      techs: ["Javascript"],
      url: "melquisedeque.com.br"
    })

    const repositorie = response.data

    setRepositories([...repositories, repositorie])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const idRepository = repositories.findIndex(repositorieId => repositorieId === id)
    repositories.splice(idRepository, 1)
    setRepositories([...repositories], repositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repositorie => (
            <li key={repositorie.id}>
              {repositorie.title}

              <button onClick={() => handleRemoveRepository(repositorie.id)}>
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
