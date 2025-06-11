# Mon Petit Badiste 🏸

Une application Angular moderne pour la gestion de ligues de badminton.

## 🚀 Technologies utilisées

- **Angular 18** - Framework frontend
- **Angular Material** - Composants UI
- **TypeScript** - Langage de programmation
- **SCSS** - Préprocesseur CSS
- **RxJS** - Programmation réactive

## 📁 Structure du projet

```
src/
├── app/
│   ├── components/          # Composants réutilisables
│   ├── pages/              # Pages de l'application
│   ├── services/           # Services Angular
│   ├── interfaces/         # Interfaces TypeScript
│   ├── guards/             # Guards de routage
│   └── environments/       # Configuration d'environnement
├── assets/                 # Ressources statiques
└── styles.scss            # Styles globaux
```

## 🛠️ Installation et développement

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation
```bash
npm install
```

### Développement
```bash
npm start
# L'application sera accessible sur http://localhost:4200
```

### Build de production
```bash
npm run build:prod
```

### Tests
```bash
# Tests unitaires
npm test

# Tests avec couverture de code
npm run test:coverage
```

### Linting
```bash
npm run lint
```

### Analyse du bundle
```bash
npm run analyze
```

## 🏗️ Bonnes pratiques implémentées

### Architecture
- ✅ **Séparation des responsabilités** : Services, composants et pages séparés
- ✅ **Barrel exports** : Simplification des imports avec des fichiers d'index
- ✅ **Guards de routage** : Protection des routes authentifiées
- ✅ **Configuration d'environnement** typée

### Code
- ✅ **TypeScript strict** : Configuration stricte pour une meilleure qualité de code
- ✅ **Gestion des souscriptions** : Pattern unsubscribe avec takeUntil
- ✅ **Interfaces typées** : Définition stricte des types de données
- ✅ **Constantes** : Utilisation de constantes pour éviter la duplication
- ✅ **Gestion d'erreurs** : Gestion centralisée des erreurs HTTP

### Performance
- ✅ **Lazy loading** : Chargement différé des modules
- ✅ **OnPush strategy** : Optimisation de la détection de changements
- ✅ **Preloading strategy** : Préchargement des modules
- ✅ **Optimisation du bundle** : Configuration optimisée pour la production

### UX/UI
- ✅ **Material Design** : Interface utilisateur cohérente
- ✅ **Loading states** : Indicateurs de chargement
- ✅ **Error handling** : Messages d'erreur utilisateur-friendly
- ✅ **Responsive design** : Interface adaptative

## 🔐 Authentification

L'application utilise un système d'authentification basé sur JWT avec :
- Stockage sécurisé dans localStorage
- Guards pour protéger les routes
- Gestion automatique des tokens

## 🌐 API

L'application communique avec une API REST pour :
- Authentification utilisateur
- Gestion des ligues
- Gestion des joueurs

## 📱 Pages disponibles

- **Accueil** (`/home`) - Page d'accueil publique
- **Inscription** (`/register`) - Création de compte
- **Connexion** (`/connexion`) - Authentification
- **Dashboard** (`/dashboard`) - Tableau de bord utilisateur (protégé)
- **Création de ligue** (`/create-league`) - Création d'une nouvelle ligue (protégé)
- **Page de ligue** (`/league`) - Gestion d'une ligue (protégé)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Scripts disponibles

| Script | Description |
|--------|-------------|
| `npm start` | Démarre le serveur de développement |
| `npm run build` | Build de développement |
| `npm run build:prod` | Build de production |
| `npm test` | Lance les tests unitaires |
| `npm run test:coverage` | Tests avec rapport de couverture |
| `npm run lint` | Linting du code |
| `npm run analyze` | Analyse de la taille du bundle |

## 📄 Licence

Ce projet est sous licence MIT.
