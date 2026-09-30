# User DAO Template

```javascript
import User from "../models/user.model.js";

export const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

export const getUserByEmailWithPassword = async (email) => {
  return User.findOne({ email }).select("+password");
};

export const createUser = async (userData) => {
  return User.create(userData);
};

export const getUserById = async (id) => {
  return User.findById(id);
};
```
