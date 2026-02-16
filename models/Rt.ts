import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRt extends Document {
  number: string;
  rw: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RtSchema = new Schema<IRt>(
  {
    number: {
      type: String,
      trim: true,
    },
    rw: {
      type: Schema.Types.ObjectId,
      ref: "Rw",
      required: [true, "Rw reference is required"],
    },
  },
  {
    timestamps: true,
  },
);

// Prevent hot-reload errors in Next.js
const Rt: Model<IRt> =
  (mongoose.models.Rt as Model<IRt>) || mongoose.model<IRt>("Rt", RtSchema);

export default Rt;
