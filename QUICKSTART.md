# Quick Start Guide

## 🚀 Get Started in 2 Minutes

### Option 1: Create in a New Folder

#### Step 1: Run the CLI

```bash
init-backend create my-awesome-api
```

#### Step 2: Answer the Questions

```
? What is your project name? my-awesome-api
? Choose a framework: Express.js
? Select databases: MongoDB
? Use TypeScript? Yes
? Select additional features: ESLint, Prettier
? Continue with this setup? Yes
```

#### Step 3: Setup Your Project

```bash
cd my-awesome-api
npm install
npm run dev
```

✅ **Done!** Your backend API is ready at `http://localhost:3000`

---

### Option 2: Setup in Current Directory

#### Step 1: Create and Enter Directory

```bash
mkdir my-awesome-api
cd my-awesome-api
```

#### Step 2: Run the CLI

```bash
init-backend create .
```

#### Step 3: Answer the Questions

```
? Choose a framework: Express.js
? Select databases: MongoDB
? Use TypeScript? Yes
? Select additional features: ESLint, Prettier
? Continue with this setup? Yes
```

#### Step 4: Setup Your Project

```bash
npm install
npm run dev
```

✅ **Done!** Your backend API is ready at `http://localhost:3000`

---

## 📚 Common Commands

### Development

```bash
npm run dev          # Start development server with hot reload
npm run lint         # Check code for errors
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Prettier
```

### Production

```bash
npm run build        # Build for production
npm start            # Start production server
npm test             # Run tests
```

### Docker

```bash
docker-compose up    # Start all services
docker-compose down  # Stop all services
```

---

## 🎯 Next Steps

1. **Setup Environment Variables**

   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

2. **Create Your First Route**
   - Create a file in `src/routes/`
   - Add controller in `src/controllers/`
   - Register route in `src/app.ts`

3. **Setup Database**
   - If MongoDB: Configure in `src/config/index.ts`
   - If Prisma: Update `prisma/schema.prisma` and run migration

4. **Add Authentication** (if selected)
   - Use JWT middleware for protected routes
   - Check `src/utils/auth.ts` for examples

5. **Deploy**
   - Push Docker image to registry
   - Use docker-compose in production
   - Configure environment variables

---

## 🎨 Project Structure

```
src/
├── index.ts             # Entry point
├── app.ts               # Express app
├── config/index.ts      # Configuration
├── routes/              # API routes
├── controllers/         # Route handlers
├── models/              # Database models
├── middleware/          # Custom middleware
└── utils/               # Helper functions

tests/                   # Test files
prisma/schema.prisma    # Database schema (if Prisma)
.env                    # Environment variables
```

---

## 💡 Tips

1. **Use TypeScript** - Better development experience
2. **Keep routes organized** - One route file per feature
3. **Use environment variables** - Never hardcode secrets
4. **Write tests** - Keep test coverage high
5. **Follow linting rules** - Maintain code quality
6. **Use Docker** - Consistent dev and production environments
7. **Commit frequently** - Git hooks ensure code quality

---

## 🆘 Troubleshooting

### Port Already in Use

```bash
# Change in .env
PORT=3001
```

### MongoDB Connection Error

```bash
# Make sure MongoDB is running
mongod

# Or use Docker
docker run -d -p 27017:27017 mongo
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### TypeScript Errors

```bash
# Rebuild TypeScript
npm run build
```

---

## 📖 More Information

- [README.md](README.md) - Full documentation
- [FEATURES.md](FEATURES.md) - Complete feature list
- [EXAMPLES.md](EXAMPLES.md) - More usage examples
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical details

---

**Happy coding! 🎉**

For issues or questions, check the documentation or create an issue on GitHub.
