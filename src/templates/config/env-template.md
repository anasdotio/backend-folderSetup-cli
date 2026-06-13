# Environment Variables Template

Create a `.env` file in your project root:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
LOG_LEVEL=info

# Database Configuration
## MongoDB
MONGODB_URI=mongodb://localhost:27017/mydb
MONGODB_USER=
MONGODB_PASSWORD=

## PostgreSQL / MySQL
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
# Or for MySQL:
# DATABASE_URL=mysql://user:password@localhost:3306/mydb

## Redis
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRATION=7d
BCRYPT_ROUNDS=10

# API Configuration
API_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000

# Email (if using nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# AWS (if using AWS services)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# Third-party APIs
STRIPE_SECRET_KEY=sk_test_...
GITHUB_TOKEN=ghp_...

# Debug
DEBUG=app:*
```

## .env.example

Commit this file to version control (without actual secrets):

```env
PORT=3000
NODE_ENV=development
LOG_LEVEL=info

MONGODB_URI=mongodb://localhost:27017/mydb
MONGODB_USER=
MONGODB_PASSWORD=

DATABASE_URL=postgresql://user:password@localhost:5432/mydb

REDIS_URL=redis://localhost:6379

JWT_SECRET=change_this_in_production
JWT_EXPIRATION=7d
BCRYPT_ROUNDS=10

API_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000

DEBUG=app:*
```

## Usage in Code

```javascript
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const dbUrl = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
```

## Security Tips

1. **Never commit `.env` file** - Add it to `.gitignore`
2. **Use `.env.example`** - Provide a template with placeholder values
3. **Validate required vars** - Check all required env vars are set on startup
4. **Use different values** - Never use the same secret in development and production
5. **Rotate secrets** - Change JWT secrets and API keys periodically
