# 🌤️ Application Météo React

Une application React qui affiche la météo en vous géolocalisant automatiquement.

## 🚀 Fonctionnalités

- 📍 Géolocalisation automatique
- 🌡️ Affichage de la température actuelle
- 💧 Humidité, vent et visibilité
- 🔄 Actualisation manuelle
- 🎨 Interface moderne et responsive

## 📦 Prérequis

- Docker et Docker Compose installés

## 🔑 Configuration de l'API

1. Créez un compte gratuit sur [OpenWeatherMap](https://openweathermap.org/api)
2. Obtenez votre clé API gratuite
3. Remplacez `VOTRE_CLE_API` dans `src/App.jsx` par votre clé

## 🛠️ Installation et lancement

### Avec Docker (recommandé)

```bash
# Construire et lancer l'application
docker-compose up --build

# L'application sera accessible sur http://localhost:5173
```

### Arrêter l'application

```bash
docker-compose down
```

## 📁 Structure du projet

```
weather-app/
├── src/
│   ├── App.jsx        # Composant principal
│   ├── main.jsx       # Point d'entrée React
│   └── index.css      # Styles CSS
├── index.html         # Page HTML
├── package.json       # Dépendances
├── vite.config.js     # Configuration Vite
├── Dockerfile         # Image Docker
└── docker-compose.yml # Orchestration Docker
```

## 🌐 API utilisée

- [OpenWeatherMap API](https://openweathermap.org/api) - API météo gratuite

## 📝 Notes

- Autorisez la géolocalisation dans votre navigateur pour que l'app fonctionne
- La clé API gratuite permet 1000 appels/jour
