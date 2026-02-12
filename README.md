# Realtime-Chat-System

A real-time one-to-one chatting web application built using **Node.js, Socket.IO, MongoDB, and Express**, designed with a **WhatsApp-inspired UI**.

This project enables users to register, log in, chat privately, and store conversations securely with password encryption.

---

## 🚀 Features

### 🔐 Authentication System

* User Registration with password validation
* Unique username enforcement
* Secure password hashing (bcrypt)
* Login using username
* Password Reset option
* Show/Hide password (👁 eye toggle)
* Remember username option

---

### 💬 Real-Time Chat

* One-to-one private messaging
* Real-time message delivery (Socket.IO)
* Instant chat updates
* Message alignment (sender/receiver UI)
* Chat history loading

---

### 🗄️ Database Storage

* MongoDB integration
* Messages stored permanently
* Chat history retrieved on user selection

---

### 🟢 Online User System

* Displays currently online users
* Updates dynamically on login/logout

---

### 🎨 WhatsApp-Style UI

* Sidebar user list
* Profile header
* Message bubbles
* Chat header
* Empty state screen
* Responsive chat layout

---

## 🛠️ Tech Stack

| Technology | Usage                   |
| ---------- | ----------------------- |
| Node.js    | Backend runtime         |
| Express.js | Server framework        |
| Socket.IO  | Real-time communication |
| MongoDB    | Database                |
| Mongoose   | ODM                     |
| bcrypt     | Password encryption     |
| HTML5      | Frontend structure      |
| CSS3       | UI styling              |
| JavaScript | Client logic            |

---

## 📂 Project Structure

```
online-chat/
│
├── public/
│   └── index.html        # Frontend UI + Chat Logic
│
├── server.js             # Backend + Socket + Auth
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/online-chat.git
cd online-chat
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start MongoDB

Make sure MongoDB is running locally:

```bash
mongodb://127.0.0.1:27017/chatapp
```

### 4️⃣ Run Server

```bash
node server.js
```

Server runs at:

```
http://localhost:3000
```

---

## 📱 Multi-Device Testing

To test on mobile:

1. Connect phone & PC to same Wi-Fi
2. Find PC IP:

   ```
   ipconfig
   ```
3. Open in phone browser:

   ```
   http://YOUR-IP:3000
   ```

---

## 🔒 Password Requirements

Passwords must include:

* Minimum 8 characters
* 1 Uppercase letter
* 1 Lowercase letter
* 1 Number
* 1 Special character
  (`$ # _ @ ! % …`)

---

## 📸 Screenshots

Add your project screenshots here:

```
/screens/login.png
/screens/chat.png
/screens/reset.png
```

---

## 📈 Future Enhancements

* Media sharing (images, videos, files)
* Voice messages
* Group chats
* Read receipts
* Typing indicators
* Emoji picker
* Deployment (Render / Railway / VPS)

---

## 👨‍💻 Author

**Dharani C**

* Full Stack & Real-Time App Developer
* Passionate about Web & AI Projects

---

## 📜 License

This project is licensed under the **MIT License** — free to use and modify.

---

## ⭐ Support

If you like this project:

* Star ⭐ the repository
* Fork 🍴 it
* Share 📢 it

---

**Built with ❤️ using Node.js & Socket.IO**
