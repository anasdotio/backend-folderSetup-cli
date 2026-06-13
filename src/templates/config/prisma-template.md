# Prisma Setup Template

## schema.prisma

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id    Int     @id @default(autoincrement())
  title String
  content String?
  author User    @relation(fields: [authorId], references: [id])
  authorId Int
}
```

## Usage

```bash
# Install Prisma
npm install @prisma/client prisma

# Initialize
npx prisma init

# Create migration
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio
npx prisma studio
```

## Connection in your app

```javascript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Usage
const users = await prisma.user.findMany();
const newUser = await prisma.user.create({
  data: {
    email: "user@example.com",
    name: "John Doe",
  },
});
```
