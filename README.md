# Backend Setup CLI

🚀 A powerful command-line interface for creating production-ready backend projects with Express, MongoDB, Prisma, and more!

## Features

✨ **Interactive Project Setup**

- Choose your preferred framework (Express, Fastify, Hapi)
- Select databases (MongoDB, Prisma, MySQL, PostgreSQL)
- TypeScript or JavaScript support
- Optional features: ESLint, Prettier, Docker, JWT, Environment variables, Husky

🎨 **Colorized Output**

- Beautiful, color-coded terminal output
- Progress indicators and status messages
- Easy-to-read setup summaries

📦 **Pre-configured Templates**

- Express.js setup
- Database connections (MongoDB, Prisma, PostgreSQL, MySQL)
- Authentication (JWT with bcrypt)
- Linting and formatting (ESLint, Prettier)
- Docker support
- Environment configuration

🔧 **Developer Experience**

- Ready-to-use project structure
- Pre-configured dependencies
- Best practices baked in
- Quick start commands

## Installation

```bash
# Clone or download this repository
cd your-cli-folder

# Install dependencies
npm install

# Link the CLI globally (for local development)
npm link
```

## Usage

### Create a New Project

```bash
# Interactive setup (prompts for project name)
init-backend create

# With project name - creates a new folder with that name
init-backend create my-awesome-app

# Using alias
init-backend new my-project

# Setup in current directory
init-backend create .

# Setup in current directory (shorter)
init-backend new .
```

### Setup in Current Directory vs New Folder

#### Option 1: Create a New Folder

```bash
init-backend create my-api
# Creates a folder 'my-api' with complete project structure
# Next steps: cd my-api && npm install && npm run dev
```

#### Option 2: Setup in Current Directory

```bash
mkdir my-api
cd my-api
init-backend create .
# Sets up the project in the current directory
# Next steps: npm install && npm run dev
```

Or if the directory is empty:

```bash
init-backend create .
# If current directory is empty, setup happens here automatically
```

If the directory is not empty, you'll be asked for confirmation before proceeding.

### Interactive Prompts

When you run the CLI, you'll be asked:

1. **Project Name** - What do you want to call your project?
2. **Framework** - Choose between Express, Fastify, or Hapi
3. **Databases** - Select one or more databases:
   - MongoDB
   - Prisma ORM
   - MySQL
   - PostgreSQL
4. **TypeScript** - Would you like to use TypeScript? (recommended)
5. **Additional Features**:
   - ESLint for code linting
   - Prettier for code formatting
   - Docker for containerization
   - JWT Authentication
   - Environment Variables (.env)
   - Git Hooks (Husky)

### Example Session

```
╔════════════════════════════════════════════════════════╗
║    🚀 Backend Project Generator                      ║
╚════════════════════════════════════════════════════════╝

? What is your project name? my-api
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

📋 Setup Summary:
──────────────────────────────────────────────────────────
  Framework: Express.js
  Databases: MongoDB, Prisma ORM
  TypeScript: Yes
  Features: ESLint, Prettier, Docker, JWT Authentication, Environment Variables (.env)
──────────────────────────────────────────────────────────

? Continue with this setup? Yes

╔════════════════════════════════════════════════════════╗
║    Creating Project                                  ║
╚════════════════════════════════════════════════════════╝

✓ Creating project in /home/user/my-api
✓ Directories created
✓ package.json created
✓ Configuration files created
✓ Source files created

✨ Project created successfully!
Location: /home/user/my-api

Next steps:
  1. cd my-api
  2. npm install
  3. npm run dev
```

## Generated Project Structure

```
my-api/
├── src/
│   ├── index.ts          # Entry point
│   ├── app.ts            # Express app
│   ├── config/           # Configuration files
│   ├── routes/           # API routes
│   ├── controllers/       # Route handlers
│   ├── models/           # Data models
│   ├── middleware/       # Custom middleware
│   └── utils/            # Utility functions
├── tests/                # Test files
├── public/               # Static files
├── prisma/               # Prisma schema (if selected)
├── .env.example          # Environment variables template
├── .eslintrc.json        # ESLint configuration
├── .prettierrc.json      # Prettier configuration
├── tsconfig.json         # TypeScript configuration
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose setup
├── package.json          # Dependencies
└── README.md             # Project documentation
```

## Next Steps After Creation

### 1. Install Dependencies

```bash
cd my-api
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env
# Edit .env with your actual values
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Run Linting and Formatting

```bash
# Lint your code
npm run lint

# Fix linting issues
npm run lint:fix

# Format with Prettier
npm run format
```

### 5. Build for Production

```bash
npm run build
npm start
```

## Available Scripts

All generated projects include these npm scripts:

```json
{
  "dev": "ts-node src/index.ts", // Development with hot-reload
  "build": "tsc", // Build TypeScript to JavaScript
  "start": "node dist/index.js", // Run production build
  "test": "jest", // Run tests
  "lint": "eslint src/", // Check code style
  "lint:fix": "eslint src/ --fix", // Fix code style issues
  "format": "prettier --write src/**/*.ts" // Format code
}
```

## Configuration Files Explained

### .env.example

Template for environment variables. Copy to `.env` and fill with real values.

### .eslintrc.json

Code quality and style rules. Prevents common mistakes and enforces consistency.

### .prettierrc.json

Code formatting rules. Automatically formats your code for consistency.

### tsconfig.json

TypeScript compiler options. Enables strict type checking and modern features.

### Dockerfile

Containerizes your application for deployment.

### Prisma Schema

Database schema definition. Enables type-safe database access with Prisma ORM.

## Available Templates

The CLI includes templates for:

- ✅ Express Server Setup
- ✅ ESLint Configuration
- ✅ Prettier Configuration
- ✅ MongoDB Connection
- ✅ Prisma Setup
- ✅ JWT Authentication
- ✅ Docker Containerization
- ✅ Environment Variables

## Supported Databases

- **MongoDB** - NoSQL database with Mongoose
- **Prisma ORM** - Type-safe database access
- **MySQL** - Relational database
- **PostgreSQL** - Advanced relational database

## Supported Frameworks

- **Express.js** - Most popular Node.js framework
- **Fastify** - High-performance framework
- **Hapi** - Rich plugin system framework

## Tips & Best Practices

1. **Always use TypeScript** - Better development experience with type safety
2. **Use environment variables** - Never hardcode secrets or configuration
3. **Setup Git hooks** - Use Husky to enforce code quality before commits
4. **Follow project structure** - Keep routes, controllers, models separate
5. **Write tests** - Include tests in your development workflow
6. **Use Docker** - For consistent development and deployment environments

## Troubleshooting

### Command not found: init-backend

```bash
# Make sure you've linked the CLI
npm link
```

### Port already in use

```bash
# Change PORT in .env
PORT=3001
```

### Database connection errors

- Check your DATABASE_URL/MONGODB_URI in .env
- Ensure database server is running
- Verify credentials are correct

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

---

**Happy coding! 🚀**

For more templates and examples, check the `src/templates/` folder.
