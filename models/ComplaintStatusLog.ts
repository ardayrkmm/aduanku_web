import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComplaintStatusLog extends Document {
  complaint: mongoose.Types.ObjectId;
  status: string;
  changedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ComplaintStatusLogSchema = new Schema<IComplaintStatusLog>(
  {
    complaint: {
      type: Schema.Types.ObjectId,
      ref: "Complaint",
      required: [true, "Complaint reference is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent hot-reload errors in Next.js
const ComplaintStatusLog: Model<IComplaintStatusLog> =
  (mongoose.models.ComplaintStatusLog as Model<IComplaintStatusLog>) ||
  mongoose.model<IComplaintStatusLog>(
    "ComplaintStatusLog",
    ComplaintStatusLogSchema,
  );

export default ComplaintStatusLog;
