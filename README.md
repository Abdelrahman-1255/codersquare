# CodersSquare

A social web application for sharing and discovering programming learning resources in a Hacker News-style experience. CodersSquare enables developers to post links to valuable articles, videos, tutorials, and other educational resources, while the community votes and comments to surface the best content.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Post Management**: Create, view, and delete learning resource posts
- **Voting System**: Upvote posts to help surface quality content
- **Comments**: Engage in discussions on posts
- **Tagging**: Organize posts with tags and filter by language
- **RESTful API**: Clean HTTP API for all operations

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.x
- **Database**: SQLite3 (with potential PostgreSQL migration path)
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **ORM**: Custom DAO pattern with sqlite driver

### Development Tools
- **TypeScript**: Type-safe development
- **tsx**: Fast TypeScript execution for development
- **Express Async Handler**: Simplified async error handling
- **dotenv**: Environment variable management

## 📁 Project Structure

```
codersquare/
├── docs/
│   ├── ERD-codersquare.md      # Database design and architecture
│   └── PRD-codersquare.md      # Product requirements document
├── server/
│   ├── src/
│   │   ├── api.ts              # API types and interfaces
│   │   ├── auth.ts             # JWT utilities
│   │   ├── server.ts           # Express server setup
│   │   ├── types.ts            # Core type definitions
│   │   ├── datastore/          # Data access layer
│   │   │   ├── index.ts        # DataStore interface
│   │   │   ├── sql/            # SQLite implementation
│   │   │   └── memorydb/       # In-memory implementation
│   │   ├── handlers/           # Route handlers
│   │   │   ├── authHandlers.ts
│   │   │   └── postHandlers.ts
│   │   └── middleware/         # Express middleware
│   │       ├── authMiddleware.ts
│   │       ├── errorMiddleware.ts
│   │       └── loggerMiddleware.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdelrahman-1255/codersquare.git
   cd codersquare
   ```

2. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=3000
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   SALT_ROUNDS=10
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000` with hot-reload enabled.

## 📡 API Documentation

### Authentication Endpoints

#### Sign Up
```http
POST /v1/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: { "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

#### Sign In
```http
POST /v1/signin
Content-Type: application/json

{
  "login": "johndoe",  // username or email
  "password": "securepassword123"
}

Response: {
  "user": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "username": "johndoe",
    "email": "john@example.com"
  },
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Post Endpoints (Protected)

All post endpoints require the `Authorization: Bearer <token>` header.

#### Get All Posts
```http
GET /v1/posts
Authorization: Bearer <jwt_token>

Response: {
  "posts": [
    {
      "id": "uuid",
      "title": "Awesome TypeScript Tutorial",
      "url": "https://example.com/typescript-guide",
      "userId": "uuid",
      "postedAt": 1637251200000
    }
  ]
}
```

#### Create Post
```http
POST /v1/posts
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Learn React Hooks",
  "url": "https://react.dev/hooks"
}

Response: 201 Created
```

### Health Check
```http
GET /healthz

Response: { "status": "ok" }
```

## 🗄 Database Schema

### Users
| Column     | Type        | Description                    |
|------------|-------------|--------------------------------|
| id         | STRING/UUID | Primary key                    |
| firstName  | STRING      | User's first name              |
| lastName   | STRING      | User's last name               |
| username   | STRING      | Unique username                |
| email      | STRING      | Unique email address           |
| password   | STRING      | Bcrypt hashed password         |

### Posts
| Column   | Type        | Description                    |
|----------|-------------|--------------------------------|
| id       | STRING/UUID | Primary key                    |
| title    | STRING      | Post title                     |
| url      | STRING      | Resource URL                   |
| userId   | STRING/UUID | Foreign key to Users           |
| postedAt | TIMESTAMP   | Creation timestamp             |

### Likes
| Column | Type        | Description                    |
|--------|-------------|--------------------------------|
| userId | STRING/UUID | Foreign key to Users           |
| postId | STRING/UUID | Foreign key to Posts           |

### Comments
| Column   | Type        | Description                    |
|----------|-------------|--------------------------------|
| id       | STRING/UUID | Primary key                    |
| userId   | STRING/UUID | Foreign key to Users           |
| postId   | STRING/UUID | Foreign key to Posts           |
| comment  | STRING      | Comment text                   |
| postedAt | TIMESTAMP   | Creation timestamp             |

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm start` - Start production server
- `npm run build` - Compile TypeScript to JavaScript

### Code Structure

The project follows a layered architecture:

1. **API Layer** (`server.ts`, `handlers/`) - HTTP endpoints and request handling
2. **Business Logic** (`handlers/`, `auth.ts`) - Application logic and validation
3. **Data Access** (`datastore/`) - Database operations with DAO pattern
4. **Middleware** (`middleware/`) - Cross-cutting concerns (auth, logging, errors)

### Adding New Features

1. Define types in `types.ts` and API interfaces in `api.ts`
2. Create DAO interface in `datastore/`
3. Implement database operations in `datastore/sql/`
4. Create handler in `handlers/`
5. Add route in `server.ts`
6. Add middleware as needed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🔮 Future Enhancements

- React.js web client
- Advanced tagging and filtering
- Post ranking algorithm based on votes and age
- User profiles and reputation system
- Search functionality

## 👤 Author

**Abdelrahman**
- GitHub: [@Abdelrahman-1255](https://github.com/Abdelrahman-1255)

## 🙏 Acknowledgments

- Inspired by Hacker News and Reddit
- Built for educational purposes to showcase modern backend development

---
