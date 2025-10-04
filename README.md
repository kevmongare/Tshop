
---

## 🎨 **Frontend README (Vue.js + TypeScript + Tailwind CSS)**

```markdown
# 🎨 Frontend – Mini E-Commerce Platform

## 📌 Overview
This is the **frontend interface** for the Mini E-Commerce Platform.  
It is built with **Vue.js 3 (Composition API)**, **Vite**, and **Tailwind CSS**.  

The frontend allows:
- Customers to browse products, manage carts, and complete mock payments.
- Admins to log in, manage products, and view all orders.

---

## ⚙️ Tech Stack
- **Framework:** Vue.js 3 + Vite
- **Language:** TypeScript
- **State Management:** Pinia / Vuex
- **Routing:** Vue Router
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Build Tool:** Vite

---

## ✨ Features
- ✅ JWT-based Authentication
- ✅ Role-based access (Customer / Admin)
- ✅ Product listing and detailed views
- ✅ Shopping cart and checkout
- ✅ Payment status feedback (polling / websocket)
- ✅ Admin dashboard for managing products and orders
- ✅ Fully responsive (mobile-first design)
- ✅ TypeScript support for better maintainability

---

## 🗂️ Folder Structure
```bash
frontend/
├── src/
│   ├── components/      # Reusable UI elements
│   ├── views/           # Page components (Login, Register, Store, Admin)
│   ├── store/           # Pinia / Vuex store
│   ├── router/          # Vue Router setup
│   ├── assets/          # Images & static files
│   ├── utils/           # Helper functions
│   └── main.ts          # Entry file
├── public/
├── package.json
└── vite.config.ts
