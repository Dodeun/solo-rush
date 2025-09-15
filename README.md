# 🌌 Neon Rank

**Neon Rank** is a web application that lets you create, manage, and rank lists of items however you like.  
Movies, books, games, personal goals — anything can be organized your way.  

The site deliberately embraces a **retro 80’s retrowave aesthetic** 🎶✨ — neon colors, futuristic vibes, and a nostalgic atmosphere.

---

## 🚀 Features
- ✨ Create and customize your own lists  
- 📊 Rank items with an intuitive interface  
- 🎨 Modern interface with a **retrowave 80’s style**  
- 🛠️ Backend API for list and ranking management  
- 🐳 Docker support for easy deployment

---

## 🛠️ Tech Stack
- **Frontend:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)  
- **Backend:** [Express.js](https://expressjs.com/) (Node.js)  
- **Database:** [MySQL](https://www.mysql.com/)  
- **Containerization:** [Docker](https://www.docker.com/)  

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)  
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)  
- [MySQL](https://www.mysql.com/) (if not using Docker)  

### Clone the Repository
```bash
git clone https://github.com/your-username/neon-rank.git neon-rank
cd neon-rank
```

### Environment Variables
Copy both `.env.sample` into `.env` files in client and server folder and add your variables

---

## 🐳 Run with Docker

### Development mode
```bash
docker compose up --watch
```
---

## 📜 Scripts

### Client
- `npm run dev` – start React dev server  

### Server
- `npm run start` – start Express server in development   

---

## ⚠️ Note on User Authentication

Currently, Neon Rank does not have user authentication. All lists are public and accessible without logging in.
If the project moves beyond the demo stage, adding secure user accounts and authentication would be the very first feature to implement.  
 
