import { useEffect, useState } from "react";  
import "./App.css";  

const API = "http://localhost:3000/api/animes";  

export default function App() {  
  const [animes, setAnimes] = useState([]);  
  const [name, setName] = useState("");  
  const [rank, setRank] = useState("");  
  const [image, setImage] = useState("");  

  // Load animes  
  const fetchAnimes = async () => {  
    const res = await fetch(API);  
    const data = await res.json();  
    setAnimes(data);  
  };  

  useEffect(() => {  
    fetchAnimes();  
  }, []);  

  // Add an anime  
  const handleAdd = async () => {  
    if (!name.trim()) return alert("Name is required");  

    await fetch(API, {  
      method: "POST",  
      headers: { "Content-Type": "application/json" },  
      body: JSON.stringify({  
        name,  
        rank: rank === "" ? 0 : Number(rank),  
        image: image || "🎬",  
      }),  
    });  

    setName("");  
    setRank("");  
    setImage("");  
    fetchAnimes();  
  };  

  // Update rank  
  const handleUpdateRank = async (id, currentRank) => {  
    const v = prompt("New rank (0-10)", currentRank);  
    if (v === null) return;  

    await fetch(`${API}/${id}`, {  
      method: "PUT",  
      headers: { "Content-Type": "application/json" },  
      body: JSON.stringify({ rank: Number(v) }),  
    });  

    fetchAnimes();  
  };  

  // Delete  
  const handleDelete = async (id, name) => {  
    if (!confirm(`Delete "${name}"?`)) return;  

    await fetch(`${API}/${id}`, { method: "DELETE" });  
    fetchAnimes();  
  };  

  return (  
    <>  
      <div className="head">  
        <h1>Ma top liste d'anime</h1>  
      </div>  

      <div className="box1">  
        <h2>Ajouter un anime</h2>  

        <div className="box2">  
          <p>Titre de l'animer</p>  
          <input value={name} onChange={(e) => setName(e.target.value)} />  
        </div>  

        <div className="box3">  
          <p>Rang (0-10)</p>  
          <input  
            type="number"  
            value={rank}  
            onChange={(e) => setRank(e.target.value)}  
          />  
        </div>  

        <input type="button" value="Add" onClick={handleAdd} />  
      </div>  

      <div className="box1">  
        <h2>Ma Liste</h2>  

        <ul className="anime-list">  
          {animes.map((anime) => (  
            <li key={anime.id}>  
              <span className="rank">  
                {anime.rank === 0 ? "-" : anime.rank}.  
              </span>  
              <span className="emoji">{anime.image}</span>  
              <span className="name">{anime.name}</span>  

              <button onClick={() => handleUpdateRank(anime.id, anime.rank)}>  
                Edit  
              </button>  
              <button onClick={() => handleDelete(anime.id, anime.name)}>  
                Supprimer  
              </button>  
            </li>  
          ))}  
        </ul>  
      </div>  
    </>  
  );  
}  