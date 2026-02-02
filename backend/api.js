const API_BASE_URL = 'http://localhost:3000/api';

export function getAnimes(userId) {
  return fetch(`${API_BASE_URL}/users/${userId}/animes`)
    .then(res => res.json());
}

export function addAnime(userId, anime) {
  return fetch(`${API_BASE_URL}/users/${userId}/animes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anime)
  }).then(res => res.json());
}

export function deleteAnime(animeId) {
  return fetch(`${API_BASE_URL}/animes/${animeId}`, {
    method: 'DELETE'
  });
}
