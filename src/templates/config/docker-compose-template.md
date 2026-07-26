# Docker Compose Template

```yaml
version: "3.8"

services:
  app:
    build: .
    container_name: backend-app
    ports:
      - "3000:3000"
    env_file:
      - .env
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    container_name: backend-mongo
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```
