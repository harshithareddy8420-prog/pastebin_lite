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