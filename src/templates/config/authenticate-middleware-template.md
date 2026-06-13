# Authenticate Middleware Template

```javascript
import jwt from "jsonwebtoken";
import ApiError from "../utils/api-error.js";
import asyncHandler from "../utils/async-catch.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // You can fetch user from database here
    req.user = decodedToken;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export default authenticate;
```
