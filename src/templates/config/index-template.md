# Main Entry Point Template

```javascript
import app from "./app";
{
  {
    MONGODB_IMPORT;
  }
}

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    {
      {
        MONGODB_CONNECT;
      }
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      {
        {
          MONGODB_SUCCESS;
        }
      }
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
```
