import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVillage extends Document {
  name: string;
  district: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const VillageSchema = new Schema<IVillage>(
  {
    name: {
      type: String,
      required: [true, "Village name is required"],
      trim: true,
    },
    district: {
      type: Schema.Types.ObjectId,
      ref: "District",
      required: [true, "District reference is required"],
    },
  },
  {
    timestamps: true,
  },
);

// Prevent hot-reload errors in Next.js
const Village: Model<IVillage> =
  (mongoose.models.Village as Model<IVillage>) ||
  mongoose.model<IVillage>("Village", VillageSchema);

export default Village;
