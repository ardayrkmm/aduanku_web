import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComplaint extends Document {
  ticketNumber: string;
  reporterName?: string;
  reporterPhone?: string;
  category?: mongoose.Types.ObjectId;
  rt?: mongoose.Types.ObjectId;
  title?: string;
  description?: string;
  status?: string;
  priorityScore?: number;
  priorityLevel?: string;
  location?: {
    latitude?: number;
    longitude?: number;
  };
  address?: string;
  responseMinutes?: number;
  resolvedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ComplaintSchema = new Schema<IComplaint>(
  {
    ticketNumber: {
      type: String,
      required: [true, "Ticket number is required"],
      unique: true,
      index: true,
    },
    reporterName: {
      type: String,
      trim: true,
    },
    reporterPhone: {
      type: String,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },
    rt: {
      type: Schema.Types.ObjectId,
      ref: "Rt",
      index: true,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: "DITERIMA",
      index: true,
    },
    priorityScore: {
      type: Number,
      default: 0,
      index: true,
    },
    priorityLevel: {
      type: String,
      default: "LOW",
    },
    location: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    address: {
      type: String,
      trim: true,
    },
    responseMinutes: {
      type: Number,
    },
    resolvedAt: {
      type: Date,
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// Add compound index for analytics queries
ComplaintSchema.index({ status: 1, priorityScore: -1 });
ComplaintSchema.index({ category: 1, createdAt: -1 });
ComplaintSchema.index({ rt: 1, createdAt: -1 });
ComplaintSchema.index({ "location.latitude": 1, "location.longitude": 1 });

// Additional indexes for report queries
ComplaintSchema.index({ createdAt: -1 }); // For trend queries
ComplaintSchema.index({ status: 1, resolvedAt: 1 }); // For resolution analysis
ComplaintSchema.index({
  priorityLevel: 1,
  status: 1,
  createdAt: -1,
}); // For priority analysis
ComplaintSchema.index({
  category: 1,
  status: 1,
  createdAt: -1,
}); // For category trend analysis
ComplaintSchema.index({ responseMinutes: 1, createdAt: -1 }); // For SLA analysis

// Prevent hot-reload errors in Next.js
const Complaint: Model<IComplaint> =
  (mongoose.models.Complaint as Model<IComplaint>) ||
  mongoose.model<IComplaint>("Complaint", ComplaintSchema);

export default Complaint;
