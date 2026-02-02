import { useState } from 'react';

function AnimeForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [commentaire, setCommentaire] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    onAdd({
      title,
      note: Number(note),
      commentaire,
      rang: Date.now()
    });

    setTitle('');
    setNote('');
    setCommentaire('');
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Ajouter un animé</h2>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Titre"
        required
      />

      <input
        type="number"
        min="1"
        max="10"
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Note (1-10)"
        required
      />

      <input
        value={commentaire}
        onChange={e => setCommentaire(e.target.value)}
        placeholder="Commentaire (optionnel)"
      />

      <button>Ajouter</button>
    </form>
  );
}

export default AnimeForm;
