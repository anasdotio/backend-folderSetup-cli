# Global Error Handler Middleware Template

```javascript
import ApiError from "../utils/api-error.js";

export const globalErrorHandler = (err, req, res, next) => {
  let error = err;

  // Convert non-ApiError to ApiError
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message);
  }

  const response = {
    statusCode: error.statusCode,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  res.status(error.statusCode).json(response);
};

export default globalErrorHandler;
```
