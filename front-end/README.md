# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




#Anime Top List

Anime Top List est une application web qui permet à un utilisateur de gérer sa liste d’animés préférés et de la partager facilement avec d’autres personnes.

L’utilisateur peut :
- ajouter des animés à sa liste personnelle,
- modifier leur ordre, leur note ou ajouter un commentaire,
- supprimer des animés,
- partager sa liste grâce à un lien public.

---

## Technologies utilisées

### Frontend
- React
- Axios (ou Fetch API pour les appels HTTP)

### Backend
- Node.js
- Express

### Base de données
- PostgreSQL  
  (une version avec stockage en mémoire peut aussi être utilisée)

---

## Installation

### 1. Cloner le projet
bash
git clone <url-du-repo>
cd anime-top-list
