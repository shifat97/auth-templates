# Auth Templates

A full-stack authentication template featuring modern technologies and security best practices. This project provides a solid foundation for implementing user registration, login, and protected routes using JWT with access and refresh tokens.

## 🚀 Features

- **JWT Authentication**: Secure authentication using Access and Refresh tokens.
- **Secure Token Handling**: Refresh tokens are stored in HTTP-only cookies to mitigate XSS attacks.
- **Input Validation**: Robust server-side and client-side validation using Zod.
- **Modern Frontend**: Built with React 19, Vite, and React Router 7.
- **Scalable Backend**: Powered by Express.js and Mongoose.
- **Containerized Database**: MongoDB setup with Docker Compose for easy local development.

## 🛠️ Tech Stack

### Backend
- **Node.js & Express**: Fast and minimalist web framework.
- **MongoDB & Mongoose**: NoSQL database for flexible data storage.
- **JWT (jsonwebtoken)**: For secure transmission of information between parties.
- **Bcrypt**: For hashing passwords.
- **Zod**: TypeScript-first schema declaration and validation.
- **Cookie-parser**: For handling HTTP-only cookies.

### Frontend
- **React 19**: The latest version of the popular UI library.
- **Vite**: A fast and modern build tool.
- **React Router 7**: For declarative routing.
- **Axios**: Promise-based HTTP client for the browser and node.js.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (optional, for running MongoDB)

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/auth-templates.git
cd auth-templates
```

### 2. Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory based on `.env.example`:
```env
PORT=5000
ALLOWED_ORIGIN=http://localhost:5173
MONGO_URI=mongodb://admin:admin@localhost:27017/auth_db?authSource=admin
DB_NAME=auth_db
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

Start the MongoDB container (if using Docker):
```bash
docker-compose up -d
```

Run the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

## 🛣️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/v1/auth/signup` | Register a new user |
| POST | `/api/v1/auth/login` | Login and receive tokens |
| POST | `/api/v1/auth/refresh` | Refresh access token using refresh token |
| POST | `/api/v1/auth/signout` | Sign out and clear cookies |
| GET | `/api/v1/protected` | Example of a protected route |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
