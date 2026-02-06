import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:3000/api/animes";

function App() {
  // states
  const [animes, setAnimes] = useState([]);
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");

  // get – récupérer les animés
  const fetchAnimes = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setAnimes(data);
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  // post – ajouter un animé
  const handleAdd = async () => {
    if (!name) return alert("Nom obligatoire");

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        rank: rank ? Number(rank) : 0,
        image: "🎬"
      })
    });

    setName("");
    setRank("");
    fetchAnimes();
  };

  // delete – supprimer un animé
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchAnimes();
  };

  // render
  return (
    <div>
      <h1>Ma top liste d'animes</h1>

      <input
        placeholder="Nom de l'anime"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Rang"
        value={rank}
        onChange={(e) => setRank(e.target.value)}
      />

      <button onClick={handleAdd}>Ajouter</button>

      <ul>
        {animes.map((anime) => (
          <li key={anime.id}>
            {anime.rank} - {anime.image} {anime.name}
            <button onClick={() => handleDelete(anime.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;