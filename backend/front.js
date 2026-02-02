// Form selection and list
const form = document.querySelector("form");
const animeList = document.querySelector(".anime-list");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevents reload

  const titleInput = form.querySelector('input[placeholder="Titre de l\'animé"]');
  const noteInput = form.querySelector('input[type="number"]');
  const commentInput = form.querySelector('input[placeholder="Commentaire (optionnel)"]');

  const title = titleInput.value.trim();
  const note = noteInput.value.trim();
  const comment = commentInput.value.trim();

  // Simple validation
  if (!title || !note) {
    alert("Titre et note obligatoires !");
    return;
  }

  // Create the li element
  const li = document.createElement("li");

  const rank = document.createElement("span");
  rank.className = "rank";

  const info = document.createElement("div");
  info.className = "info";

  const strong = document.createElement("strong");
  strong.textContent = title;

  const small = document.createElement("small");
  small.textContent = `Note : ${note}`;

  info.appendChild(strong);
  info.appendChild(small);

  if (comment !== "") {
    const p = document.createElement("p");
    p.textContent = comment;
    info.appendChild(p);
  }

  const actions = document.createElement("div");
  actions.className = "actions";

  const editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.innerHTML = "<small>Editer</small>";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.innerHTML = "<small>Supprimé</small>";

  // Delete button
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateRanks();
  });

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(rank);
  li.appendChild(info);
  li.appendChild(actions);

  animeList.appendChild(li);

  updateRanks();

  // Reset form
  form.reset();
});

// Update numbers
function updateRanks() {
  const ranks = document.querySelectorAll(".rank");

  ranks.forEach((span, index) => {
    span.textContent = index + 1;
  });
}