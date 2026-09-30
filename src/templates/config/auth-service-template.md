# Auth Service Template

```javascript
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  getUserByEmail,
  getUserByEmailWithPassword,
} from "../dao/user.dao.js";
import ApiError from "../utils/api-error.js";

const JWT_SECRET = process.env.JWT_SECRET || "change-this-in-production";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRATION || "7d",
    },
  );
};

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await getUserByEmailWithPassword(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};
```
