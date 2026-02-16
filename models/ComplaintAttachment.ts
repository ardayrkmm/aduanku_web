import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComplaintAttachment extends Document {
  complaint: mongoose.Types.ObjectId;
  fileUrl: string;
  fileType?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ComplaintAttachmentSchema = new Schema<IComplaintAttachment>(
  {
    complaint: {
      type: Schema.Types.ObjectId,
      ref: "Complaint",
      required: [true, "Complaint reference is required"],
    },
    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
    },
    fileType: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent hot-reload errors in Next.js
const ComplaintAttachment: Model<IComplaintAttachment> =
  (mongoose.models.ComplaintAttachment as Model<IComplaintAttachment>) ||
  mongoose.model<IComplaintAttachment>(
    "ComplaintAttachment",
    ComplaintAttachmentSchema,
  );

export default ComplaintAttachment;
