# 📇 API Gestion des Cartes de Visite

API REST pour la gestion des commandes de cartes de visite avec authentification JWT et panel d'administration.

## 🚀 URL de Base

```
http://localhost:3000
```

---

## 📋 Table des Matières

- [Installation](#installation)
- [Authentification](#authentification)
- [Endpoints Publics](#endpoints-publics)
- [Endpoints Admin (Protégés)](#endpoints-admin-protégés)
- [Modèles de Données](#modèles-de-données)
- [Codes d'État HTTP](#codes-détat-http)

---

## 🔧 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MySQL
- npm ou yarn

### Configuration

1. **Cloner le projet**

```bash
git clone <votre-repo>
cd MySql
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env` à la racine du projet :

```env
DATABASE_URL="mysql://user:password@localhost:3306/votre_database"
JWT_SECRET="votre_secret_jwt_tres_securise"
```

4. **Initialiser la base de données**

```bash
npx prisma generate
npx prisma db push
```

5. **Démarrer le serveur**

```bash
npm start
```

Le serveur sera accessible sur `http://localhost:3000`

---

## 🔐 Authentification

L'API utilise **JWT (JSON Web Token)** pour sécuriser les routes administrateur.

### Obtenir un Token

**Endpoint:** `POST /`

**Body:**

```json
{
  "username": "admin",
  "password": "votre_mot_de_passe"
}
```

**Réponse réussie (200):**

```json
{
  "success": true,
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

### Utiliser le Token

Pour accéder aux routes protégées (routes `/admin/*`), incluez le token dans l'en-tête Authorization :

```
Authorization: Bearer votre_token_jwt
```

**Exemple avec Fetch API:**

```javascript
fetch("http://localhost:3000/admin/allorders", {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
```

**Exemple avec Axios:**

```javascript
axios.get("http://localhost:3000/admin/allorders", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

## 🌐 Endpoints Publics

### 1. Page d'Accueil

**GET** `/`

Affiche un message de bienvenue.

**Réponse (200):**

```
Bienvenue sur l'API des commandes de cartes de visite !
```

---

### 2. Connexion Admin

**POST** `/`

Authentifie un utilisateur admin et retourne un token JWT.

**Body:**

```json
{
  "username": "admin",
  "password": "motdepasse"
}
```

**Réponse réussie (200):**

```json
{
  "success": true,
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

**Erreurs possibles:**

- **400** - Champs manquants
- **401** - Identifiants incorrects
- **500** - Erreur serveur

---

### 3. Créer une Commande

**POST** `/addorder`

Permet à un client de créer une nouvelle commande de cartes de visite.

**Body:**

```json
{
  "nom": "Jean Dupont",
  "telephone": "0612345678",
  "wilaya_code": "16",
  "wilaya": "Alger",
  "commune": "Bab Ezzouar",
  "nombre_cartes": 100,
  "prix_total": 5000.0,
  "reseaux_sociaux": {
    "facebook": "https://facebook.com/jeandupont",
    "instagram": "@jeandupont",
    "linkedin": "linkedin.com/in/jeandupont"
  }
}
```

**Réponse réussie (200):**

```json
{
  "message": "✅ Commande créée",
  "commande": {
    "id_commande": 1,
    "nom": "Jean Dupont",
    "telephone": "0612345678",
    "wilaya_code": "16",
    "wilaya": "Alger",
    "commune": "Bab Ezzouar",
    "nombre_cartes": 100,
    "prix_total": 5000.0,
    "reseaux_sociaux": {
      "facebook": "https://facebook.com/jeandupont",
      "instagram": "@jeandupont",
      "linkedin": "linkedin.com/in/jeandupont"
    },
    "statut": "EN_ATTENTE",
    "date_heure": "2025-10-17T10:30:00.000Z"
  }
}
```

**Erreurs possibles:**

- **500** - Erreur lors de la création

---

## 🔒 Endpoints Admin (Protégés)

> ⚠️ **Authentification requise** - Toutes ces routes nécessitent un token JWT valide dans l'en-tête `Authorization: Bearer <token>`

---

### 1. Récupérer Toutes les Commandes

**GET** `/admin/allorders`

Récupère la liste complète des commandes, triées par date décroissante.

**Headers:**

```
Authorization: Bearer <votre_token>
```

**Réponse réussie (200):**

```json
{
  "success": true,
  "count": 25,
  "orders": [
    {
      "id_commande": 1,
      "nom": "Jean Dupont",
      "telephone": "0612345678",
      "wilaya_code": "16",
      "wilaya": "Alger",
      "commune": "Bab Ezzouar",
      "nombre_cartes": 100,
      "prix_total": 5000.0,
      "reseaux_sociaux": {
        "facebook": "https://facebook.com/jeandupont",
        "instagram": "@jeandupont"
      },
      "statut": "EN_ATTENTE",
      "date_heure": "2025-10-17T10:30:00.000Z"
    }
    // ... autres commandes
  ]
}
```

**Erreurs possibles:**

- **401** - Token manquant ou invalide
- **500** - Erreur serveur

---

### 2. Récupérer une Commande par ID

**GET** `/admin/order/:id`

Récupère les détails d'une commande spécifique.

**Paramètres URL:**

- `id` (number) - ID de la commande

**Headers:**

```
Authorization: Bearer <votre_token>
```

**Exemple:**

```
GET /admin/order/1
```

**Réponse réussie (200):**

```json
{
  "success": true,
  "order": {
    "id_commande": 1,
    "nom": "Jean Dupont",
    "telephone": "0612345678",
    "wilaya_code": "16",
    "wilaya": "Alger",
    "commune": "Bab Ezzouar",
    "nombre_cartes": 100,
    "prix_total": 5000.0,
    "reseaux_sociaux": {
      "facebook": "https://facebook.com/jeandupont",
      "instagram": "@jeandupont"
    },
    "statut": "EN_ATTENTE",
    "date_heure": "2025-10-17T10:30:00.000Z"
  }
}
```

**Erreurs possibles:**

- **401** - Token manquant ou invalide
- **404** - Commande non trouvée
- **500** - Erreur serveur

---

### 3. Mettre à Jour le Statut d'une Commande

**PUT** `/admin/order/:id/status`

Met à jour le statut d'une commande existante.

**Paramètres URL:**

- `id` (number) - ID de la commande

**Headers:**

```
Authorization: Bearer <votre_token>
Content-Type: application/json
```

**Body:**

```json
{
  "statut": "CONFIRMEE"
}
```

**Valeurs autorisées pour `statut`:**

- `EN_ATTENTE` - Commande en attente de validation
- `CONFIRMEE` - Commande confirmée
- `LIVREE` - Commande livrée
- `ANNULEE` - Commande annulée

**Exemple:**

```
PUT /admin/order/1/status
```

**Réponse réussie (200):**

```json
{
  "success": true,
  "message": "Statut mis à jour avec succès.",
  "order": {
    "id_commande": 1,
    "nom": "Jean Dupont",
    "statut": "CONFIRMEE",
    "date_heure": "2025-10-17T10:30:00.000Z"
  }
}
```

**Erreurs possibles:**

- **400** - Statut invalide
- **401** - Token manquant ou invalide
- **500** - Erreur serveur

---

### 4. Supprimer une Commande

**DELETE** `/admin/order/:id`

Supprime définitivement une commande.

**Paramètres URL:**

- `id` (number) - ID de la commande

**Headers:**

```
Authorization: Bearer <votre_token>
```

**Exemple:**

```
DELETE /admin/order/1
```

**Réponse réussie (200):**

```json
{
  "success": true,
  "message": "Commande supprimée avec succès."
}
```

**Erreurs possibles:**

- **401** - Token manquant ou invalide
- **500** - Erreur serveur (commande introuvable ou autre erreur)

---

## 📊 Modèles de Données

### Commande (visit_card)

```typescript
{
  id_commande: number;           // ID auto-incrémenté
  nom: string;                   // Nom du client
  telephone: string;             // Numéro de téléphone
  wilaya_code: string;           // Code de la wilaya
  wilaya: string;                // Nom de la wilaya
  commune: string;               // Nom de la commune
  nombre_cartes: number;         // Nombre de cartes commandées (défaut: 1)
  prix_total: number;            // Prix total de la commande
  reseaux_sociaux: JSON;         // Réseaux sociaux (objet JSON)
  statut: enum;                  // EN_ATTENTE | CONFIRMEE | LIVREE | ANNULEE
  date_heure: DateTime;          // Date et heure de la commande
}
```

### Utilisateur (user)

```typescript
{
  id: number; // ID auto-incrémenté
  username: string; // Nom d'utilisateur (unique)
  password: string; // Mot de passe hashé (bcrypt)
}
```

---

## 📡 Exemples d'Utilisation Frontend

### Exemple avec Fetch API (Vanilla JS)

#### 1. Créer une commande (Public)

```javascript
async function creerCommande(data) {
  try {
    const response = await fetch("http://localhost:3000/addorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Commande créée:", result.commande);
      return result;
    } else {
      console.error("Erreur:", result.error);
    }
  } catch (error) {
    console.error("Erreur réseau:", error);
  }
}

// Utilisation
creerCommande({
  nom: "Jean Dupont",
  telephone: "0612345678",
  wilaya_code: "16",
  wilaya: "Alger",
  commune: "Bab Ezzouar",
  nombre_cartes: 100,
  prix_total: 5000.0,
  reseaux_sociaux: {
    facebook: "https://facebook.com/jeandupont",
    instagram: "@jeandupont",
  },
});
```

#### 2. Connexion Admin

```javascript
async function loginAdmin(username, password) {
  try {
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (result.success) {
      // Sauvegarder le token
      localStorage.setItem("authToken", result.token);
      console.log("Connexion réussie");
      return result.token;
    } else {
      console.error("Erreur connexion:", result.message);
    }
  } catch (error) {
    console.error("Erreur réseau:", error);
  }
}
```

#### 3. Récupérer toutes les commandes (Admin)

```javascript
async function getAllOrders() {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch("http://localhost:3000/admin/allorders", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.success) {
      console.log(`${result.count} commandes trouvées`);
      return result.orders;
    } else {
      console.error("Erreur:", result.message);
    }
  } catch (error) {
    console.error("Erreur réseau:", error);
  }
}
```

#### 4. Mettre à jour le statut d'une commande

```javascript
async function updateOrderStatus(orderId, newStatus) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(
      `http://localhost:3000/admin/order/${orderId}/status`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ statut: newStatus }),
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log("Statut mis à jour:", result.order);
      return result.order;
    } else {
      console.error("Erreur:", result.message);
    }
  } catch (error) {
    console.error("Erreur réseau:", error);
  }
}

// Utilisation
updateOrderStatus(1, "CONFIRMEE");
```

#### 5. Supprimer une commande

```javascript
async function deleteOrder(orderId) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch(
      `http://localhost:3000/admin/order/${orderId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (result.success) {
      console.log("Commande supprimée");
      return true;
    } else {
      console.error("Erreur:", result.message);
    }
  } catch (error) {
    console.error("Erreur réseau:", error);
  }
}
```

---

### Exemple avec Axios (React)

```javascript
import axios from "axios";

const API_URL = "http://localhost:3000";

// Configuration de l'instance axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter automatiquement le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fonctions API
export const apiService = {
  // Connexion
  login: async (username, password) => {
    const { data } = await api.post("/", { username, password });
    if (data.success) {
      localStorage.setItem("authToken", data.token);
    }
    return data;
  },

  // Créer une commande
  createOrder: async (orderData) => {
    const { data } = await api.post("/addorder", orderData);
    return data;
  },

  // Récupérer toutes les commandes
  getAllOrders: async () => {
    const { data } = await api.get("/admin/allorders");
    return data;
  },

  // Récupérer une commande par ID
  getOrderById: async (id) => {
    const { data } = await api.get(`/admin/order/${id}`);
    return data;
  },

  // Mettre à jour le statut
  updateOrderStatus: async (id, statut) => {
    const { data } = await api.put(`/admin/order/${id}/status`, { statut });
    return data;
  },

  // Supprimer une commande
  deleteOrder: async (id) => {
    const { data } = await api.delete(`/admin/order/${id}`);
    return data;
  },
};

// Utilisation dans un composant React
function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await apiService.getAllOrders();
        if (result.success) {
          setOrders(result.orders);
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const result = await apiService.updateOrderStatus(orderId, newStatus);
      if (result.success) {
        // Rafraîchir la liste
        const updated = await apiService.getAllOrders();
        setOrders(updated.orders);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id_commande}>
          <h3>{order.nom}</h3>
          <p>Statut: {order.statut}</p>
          <button
            onClick={() => handleUpdateStatus(order.id_commande, "CONFIRMEE")}
          >
            Confirmer
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 🚦 Codes d'État HTTP

| Code | Signification         | Description                        |
| ---- | --------------------- | ---------------------------------- |
| 200  | OK                    | Requête réussie                    |
| 400  | Bad Request           | Données invalides ou manquantes    |
| 401  | Unauthorized          | Token manquant, invalide ou expiré |
| 404  | Not Found             | Ressource non trouvée              |
| 500  | Internal Server Error | Erreur serveur                     |

---

## 🔒 Sécurité

### Bonnes Pratiques

1. **Token JWT**

   - Le token expire après un certain temps (configuré dans `utils.js`)
   - Stockez le token de manière sécurisée (localStorage/sessionStorage)
   - N'exposez jamais le token dans les URL

2. **CORS**

   - L'API accepte les requêtes cross-origin
   - Configurez CORS selon vos besoins en production

3. **Mots de passe**

   - Toujours hashés avec bcrypt
   - Ne jamais envoyer de mots de passe en clair

4. **HTTPS**
   - En production, utilisez toujours HTTPS
   - Ne transmettez jamais de tokens sur HTTP

---

## 📝 Notes Importantes

1. **Statuts de commande** : Seules les valeurs `EN_ATTENTE`, `CONFIRMEE`, `LIVREE`, `ANNULEE` sont acceptées

2. **Format des données** :

   - Les dates sont au format ISO 8601
   - Les prix sont en nombres décimaux
   - Les réseaux sociaux sont stockés en JSON

3. **Gestion des erreurs** :

   - Toutes les réponses incluent un champ `success`
   - Les erreurs incluent un `message` explicatif

4. **Pagination** :
   - Actuellement, toutes les commandes sont retournées
   - Envisagez d'implémenter la pagination pour de grandes quantités de données

---

## 🛠️ Technologies Utilisées

- **Node.js** - Environnement d'exécution
- **Express.js** - Framework web
- **Prisma** - ORM pour MySQL
- **JWT** - Authentification
- **bcryptjs** - Hashage des mots de passe
- **CORS** - Gestion des requêtes cross-origin

---

## 👨‍💻 Support

Pour toute question ou problème :

- Vérifiez que le serveur est démarré sur le port 3000
- Vérifiez que la base de données est accessible
- Consultez les logs du serveur pour plus de détails sur les erreurs

---

## 📄 Licence

© 2025 - API Cartes de Visite

---

**Fait avec ❤️ pour faciliter la gestion des commandes de cartes de visite**
