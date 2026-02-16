import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRw extends Document {
  number: string;
  village: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RwSchema = new Schema<IRw>(
  {
    number: {
      type: String,
      trim: true,
    },
    village: {
      type: Schema.Types.ObjectId,
      ref: "Village",
      required: [true, "Village reference is required"],
    },
  },
  {
    timestamps: true,
  },
);

// Prevent hot-reload errors in Next.js
const Rw: Model<IRw> =
  (mongoose.models.Rw as Model<IRw>) || mongoose.model<IRw>("Rw", RwSchema);

export default Rw;
