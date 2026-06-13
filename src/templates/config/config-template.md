# Config File Template

```javascript
export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  {{MONGODB_CONFIG}}
  {{JWT_CONFIG}}
};

export default config;
```
