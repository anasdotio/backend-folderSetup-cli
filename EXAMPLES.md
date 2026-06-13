# Usage Examples

## Example 1: Basic Express + MongoDB + TypeScript

```bash
$ init-backend create my-api

? What is your project name? my-api
? Choose a framework: Express.js
? Select databases (choose at least one):
  ◉ MongoDB
? Use TypeScript? Yes
? Select additional features:
  ◉ ESLint
  ◉ Prettier

✨ Project created successfully!
Location: /home/user/my-api

Next steps:
  1. cd my-api
  2. npm install
  3. npm run dev
```

---

## Example 1b: Setup in Current Directory

```bash
$ mkdir my-api && cd my-api
$ init-backend create .

? Choose a framework: Express.js
? Select databases (choose at least one):
  ◉ MongoDB
? Use TypeScript? Yes
? Select additional features:
  ◉ ESLint
  ◉ Prettier

✨ Project created successfully!
Location: /home/user/my-api

Next steps:
  1. npm install
  2. npm run dev
```

---

## Example 2: Full-Featured Production Setup

```bash
$ init-backend create ecommerce-api

? What is your project name? ecommerce-api
? Choose a framework: Express.js
? Select databases (choose at least one):
  ◉ MongoDB
  ◉ Prisma ORM
? Use TypeScript? Yes
? Select additional features:
  ◉ ESLint
  ◉ Prettier
  ◉ Docker
  ◉ JWT Authentication
  ◉ Environment Variables (.env)
  ◉ Git Hooks (Husky)

📋 Setup Summary:
──────────────────────────────────────────────────────────
  Framework: Express.js
  Databases: MongoDB, Prisma ORM
  TypeScript: Yes
  Features: ESLint, Prettier, Docker, JWT Authentication, Environment Variables (.env), Git Hooks (Husky)
──────────────────────────────────────────────────────────

✨ Project created successfully!
```

---

## Example 3: PostgreSQL with Prisma

```bash
$ init-backend new user-service

? What is your project name? user-service
? Choose a framework: Express.js
? Select databases (choose at least one):
  ◉ Prisma ORM
? Use TypeScript? Yes
? Select additional features:
  ◉ ESLint
  ◉ Prettier

# Result: TypeScript project with Prisma + PostgreSQL
```

---

## Example 4: Docker-Ready Microservice

```bash
$ init-backend create payment-service

? Select databases: PostgreSQL
? Additional features:
  ◉ Docker
  ◉ JWT Authentication

# Project is ready to be containerized and deployed
```

---

## After Project Creation

### Setup Environment

```bash
cd my-api
cp .env.example .env

# Edit .env with your values:
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/mydb
# JWT_SECRET=your_secret_key
```

### Install and Run

```bash
npm install
npm run dev

# Navigate to http://localhost:3000
# Check health endpoint: http://localhost:3000/health
```

### Code Quality

```bash
# Check for errors
npm run lint

# Auto-fix errors
npm run lint:fix

# Format code
npm run format
```

### Build for Production

```bash
npm run build
npm start
```

### Docker Deployment

```bash
# Build image
docker build -t my-api .

# Run container
docker run -p 3000:3000 my-api

# Or use docker-compose
docker-compose up
```

---

## File Structure After Creation

```
my-api/
├── src/
│   ├── index.ts              # Entry point
│   ├── app.ts                # Express app setup
│   ├── config/
│   │   └── index.ts          # Configuration
│   ├── routes/               # API routes
│   ├── controllers/          # Route handlers
│   ├── models/               # Data models
│   ├── middleware/           # Custom middleware
│   └── utils/                # Helper functions
├── prisma/
│   └── schema.prisma         # Database schema
├── tests/                    # Test files
├── .env                      # Environment variables (git-ignored)
├── .env.example              # Environment template
├── .eslintrc.json            # Linting rules
├── .prettierrc.json          # Formatting rules
├── tsconfig.json             # TypeScript config
├── Dockerfile                # Container definition
├── docker-compose.yml        # Multi-container setup
├── package.json              # Dependencies
└── README.md                 # Project documentation
```

---

## Common Tasks

### Add a New Route

Create `src/routes/users.ts`:

```typescript
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ users: [] });
});

export default router;
```

Add to `src/app.ts`:

```typescript
import usersRouter from "./routes/users";
app.use("/api/users", usersRouter);
```

### Connect to MongoDB

Edit `src/config/index.ts`:

```typescript
import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("MongoDB connected");
};
```

Call in `src/index.ts`:

```typescript
import { connectDB } from "./config";
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
```

### Setup JWT Authentication

Use the included template from `src/utils/auth.ts`:

```typescript
import { authMiddleware } from "./utils/auth";

// Protect routes
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
```

### Run with Docker Compose

```bash
# Start all services
docker-compose up

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```
