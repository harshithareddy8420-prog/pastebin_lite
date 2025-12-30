# Pastebin Lite

A minimal Pastebin-like web application that allows users to create text pastes and share them via a unique URL.  
Pastes can optionally expire based on time (TTL) or number of views.

This project is built to satisfy automated grading requirements and works reliably in serverless environments.

---

## ✨ Features

- Create a text paste
- Generate a shareable URL
- View paste via API or HTML page
- Optional constraints:
  - Time-based expiry (TTL)
  - View-count limit
- Deterministic time handling for automated tests
- Persistent storage (serverless-safe)

---

## 🛠 Tech Stack

- **Framework:** Next.js (Node.js)
- **Database:** Upstash Redis (REST-based, token auth)
- **Deployment:** Vercel
- **Language:** JavaScript

---

## 📦 Installation

### Prerequisites

- Node.js **v18+**
- npm
- An Upstash Redis database

---

### Clone the Repository

```bash
git clone https://github.com/harshithareddy8420-prog/pastebin_lite.git
cd pastebin-lite
```

### Install Dependencies
```bash
npm install
```

### Start the Application
```bash
npm run dev
```

### Rersistence layer Note

Pastebin Lite uses a **simple file-based persistence layer** to store paste data. All pastes are saved locally in a JSON file on the server, allowing the application to persist data across restarts without requiring an external database. This approach keeps the setup lightweight and easy to run locally, making it well-suited for demos and small-scale use cases, while avoiding the overhead of database configuration.

