# Config File Template

```javascript
export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "*",
  apiPrefix: process.env.API_PREFIX || "/api/v1",
  {{MONGODB_CONFIG}}
  {{DATABASE_URL_CONFIG}}
  {{JWT_CONFIG}}
};

export default config;
```
