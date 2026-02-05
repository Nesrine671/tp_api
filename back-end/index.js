const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ===== MIDDLEWARES =====
app.use(cors()); // autorise react a appeller l'api
app.use(express.json()); // Parse le JSON des requêtes

// ===== BASE DE DONNÉES (en mémoire) =====
let animes = [
    { id: 1, name: "東京リベンジャーズ", rank: 1, image: "🏍️" },
    { id: 2, name: "The seven deadly sins", rank: 2, image: "⚔️" },
    { id: 3, name: "One piece", rank: 3, image: "🏴‍☠️" },
    { id: 4, name: "My héros academia", rank: 4, image: "💥" },
    { id: 5, name: "Given", rank: 5, image: "🎸" }
  ];

// ===== ROUTE DE TEST =====
app.get('/', (req, res) => {
    res.json({ 
        message: '🎌 API Top Anime is running!',
        endpoints: {
            list: 'GET /api/animes',
            create: 'POST /api/animes',
            update: 'PUT /api/animes/:id',
            delete: 'DELETE /api/animes/:id'
        }
    });
});

// ===== ROUTE GET - Récupérer tous les animés =====
app.get('/api/animes', (req, res) => {
    // Trier par rang (du plus petit au plus grand)
    const sorted = [...animes].sort((a, b) => {
        // Les rangs 0 (non classés) vont à la fin
        if (a.rank === 0) return 1;
        if (b.rank === 0) return -1;
        return a.rank - b.rank;
    });
    
    console.log(`📥 GET /api/animes - ${sorted.length} animés envoyés`);
    res.json(sorted);
});


// ===== ROUTE POST - Ajouter un animé =====
app.post('/api/animes', (req, res) => {
    const { name, rank, image } = req.body;
    
    // Validation
    if (!name || name.trim() === '') {
        return res.status(400).json({ 
            success: false,
            error: 'Le nom est obligatoire' 
        });
    }

    // Vérifier si le rang est déjà pris
    let finalRank = parseInt(rank) || 0;
    let message = 'Animé ajouté avec succès !';
    
    if (finalRank !== 0) {
        const isRankTaken = animes.some(a => a.rank === finalRank);
        if (isRankTaken) {
            finalRank = 0;
            message = '⚠️ Ce rang était déjà pris. Animé mis en "Non classé".';
        }
    }

    // Créer le nouvel animé
    const newAnime = {
        id: Date.now(), // ID unique basé sur le timestamp
        name: name.trim(),
        rank: finalRank,
        image: image || '🎬'
    };

    animes.push(newAnime);

    console.log(`📤 POST /api/animes - Ajouté: ${newAnime.name}`);
    
    res.status(201).json({
        success: true,
        message,
        anime: newAnime
    });
});

// ===== ROUTE PUT - Modifier un animé =====
app.put('/api/animes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, rank, image } = req.body;
    
    // Trouver l'animé
    const anime = animes.find(a => a.id === id);
    
    if (!anime) {
        return res.status(404).json({ 
            success: false,
            error: 'Animé non trouvé' 
        });
    }

    // Vérifier si le nouveau rang est déjà pris
    let finalRank = parseInt(rank);
    let message = 'Animé modifié avec succès !';
    
    if (finalRank !== 0 && finalRank !== anime.rank) {
        const isRankTaken = animes.some(a => a.rank === finalRank && a.id !== id);
        if (isRankTaken) {
            finalRank = 0;
            message = '⚠️ Ce rang était déjà pris. Mis en "Non classé".';
        }
    }

    // Mise à jour
    if (name) anime.name = name.trim();
    if (rank !== undefined) anime.rank = finalRank;
    if (image) anime.image = image;

    console.log(`✏️ PUT /api/animes/${id} - Modifié: ${anime.name}`);
    
    res.json({
        success: true,
        message,
        anime
    });
});



// ===== ROUTE DELETE - Supprimer un animé =====
app.delete('/api/animes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // Vérifier que l'animé existe
    const animeIndex = animes.findIndex(a => a.id === id);
    
    if (animeIndex === -1) {
        return res.status(404).json({ 
            success: false,
            error: 'Animé non trouvé' 
        });
    }

    // Récupérer le nom avant suppression (pour le log)
    const deletedName = animes[animeIndex].name;
    
    // Supprimer l'animé
    animes = animes.filter(a => a.id !== id);

    console.log(`🗑️ DELETE /api/animes/${id} - Supprimé: ${deletedName}`);
    
    res.json({
        success: true,
        message: `"${deletedName}" a été supprimé`
    });
});



// ===== DÉMARRAGE DU SERVEUR =====
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api/animes`);
});