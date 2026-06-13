# MongoDB Connection Template

```javascript
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/mydb";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(mongodbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✓ MongoDB connected successfully");
  } catch (error) {
    console.error("✗ MongoDB connection error:", error);
    process.exit(1);
  }
};

// Example User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
```
