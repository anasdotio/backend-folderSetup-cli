# Auth Controller Template

```javascript
import asyncHandler from "../utils/async-catch.js";
import apiResponse from "../utils/api-response.js";
import { registerUser, loginUser } from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerUser(req.body);

  return res.status(201).json(
    apiResponse({
      statusCode: 201,
      data: result,
      message: "User registered successfully",
    }),
  );
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUser(req.body);

  return res.status(200).json(
    apiResponse({
      statusCode: 200,
      data: result,
      message: "Login successful",
    }),
  );
});

export default { register, login };
```
