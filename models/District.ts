import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDistrict extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const DistrictSchema = new Schema<IDistrict>(
  {
    name: {
      type: String,
      required: [true, "District name is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent hot-reload errors in Next.js
const District: Model<IDistrict> =
  (mongoose.models.District as Model<IDistrict>) ||
  mongoose.model<IDistrict>("District", DistrictSchema);

export default District;
