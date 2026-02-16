import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminUser extends Document {
  email: string;
  passwordHash: string;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password hash is required"],
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent hot-reload errors in Next.js
const AdminUser: Model<IAdminUser> =
  (mongoose.models.AdminUser as Model<IAdminUser>) ||
  mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);

export default AdminUser;
