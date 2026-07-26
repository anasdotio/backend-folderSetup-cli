# MongoDB User Model Template

```javascript
import mongoose{{MONGOOSE_TYPES_IMPORT}} from "mongoose";

{{TYPESCRIPT_INTERFACE}}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model{{MODEL_GENERIC}}("User", userSchema);

export default User;
```
