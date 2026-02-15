import mongoose, { Schema, Document, Model } from "mongoose";
import connectToDatabase from "../lib/db";

// Ensure DB connection when models are imported
connectToDatabase().catch((e) => {
  // connection errors should surface during server start
  console.error("MongoDB connection error:", e);
});

// ---------- Interfaces ----------
export interface IAdmin extends Document {
  username: string;
  password: string;
  createdAt: Date;
}

export interface IDistrict extends Document {
  name: string;
  createdAt: Date;
  deletedAt?: Date | null;
}

export interface IVillage extends Document {
  name: string;
  district: mongoose.Types.ObjectId;
  createdAt: Date;
  deletedAt?: Date | null;
}

export interface IRW extends Document {
  number: number;
  village: mongoose.Types.ObjectId;
  createdAt: Date;
  deletedAt?: Date | null;
}

export interface IRT extends Document {
  number: number;
  rw: mongoose.Types.ObjectId;
  createdAt: Date;
  deletedAt?: Date | null;
}

export interface ICategory extends Document {
  name: string;
  parent?: mongoose.Types.ObjectId | null;
  weight: number;
  createdAt: Date;
  deletedAt?: Date | null;
}

export type ComplaintStatus =
  | "DITERIMA"
  | "VERIFIKASI"
  | "DITERUSKAN"
  | "DIPROSES"
  | "SELESAI"
  | "DITOLAK";

export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface IComplaint extends Document {
  ticketNumber: string;
  reporterName?: string;
  reporterPhone?: string;
  category?: mongoose.Types.ObjectId;
  rt?: mongoose.Types.ObjectId;
  title?: string;
  description?: string;
  status: ComplaintStatus;
  priorityScore: number;
  priorityLevel?: PriorityLevel;
  latitude?: number;
  longitude?: number;
  address?: string;
  responseMinutes?: number;
  resolvedAt?: Date | null;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface IComplaintStatusLog extends Document {
  complaint: mongoose.Types.ObjectId;
  status: ComplaintStatus;
  changedAt: Date;
}

export interface IComplaintAttachment extends Document {
  complaint: mongoose.Types.ObjectId;
  fileUrl: string;
  fileType?: string;
  createdAt: Date;
}

// ---------- Schemas & Models ----------
const AdminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const DistrictSchema = new Schema<IDistrict>({
  name: { type: String, required: true },
  deletedAt: { type: Date, default: null },
}, { timestamps: { createdAt: true, updatedAt: false } });

const VillageSchema = new Schema<IVillage>({
  name: { type: String, required: true },
  district: { type: Schema.Types.ObjectId, ref: "District", required: true },
  deletedAt: { type: Date, default: null },
}, { timestamps: { createdAt: true, updatedAt: false } });

const RWSchema = new Schema<IRW>({
  number: { type: Number, required: true },
  village: { type: Schema.Types.ObjectId, ref: "Village", required: true },
  deletedAt: { type: Date, default: null },
}, { timestamps: { createdAt: true, updatedAt: false } });

const RTSchema = new Schema<IRT>({
  number: { type: Number, required: true },
  rw: { type: Schema.Types.ObjectId, ref: "RW", required: true },
  deletedAt: { type: Date, default: null },
}, { timestamps: { createdAt: true, updatedAt: false } });

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Category", default: null },
  weight: { type: Number, default: 1 },
  deletedAt: { type: Date, default: null },
}, { timestamps: { createdAt: true, updatedAt: false } });

const ComplaintSchema = new Schema<IComplaint>({
  ticketNumber: { type: String, required: true, unique: true },
  reporterName: { type: String },
  reporterPhone: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  rt: { type: Schema.Types.ObjectId, ref: "RT" },
  title: { type: String },
  description: { type: String },
  status: {
    type: String,
    enum: ["DITERIMA", "VERIFIKASI", "DITERUSKAN", "DIPROSES", "SELESAI", "DITOLAK"],
    default: "DITERIMA",
  },
  priorityScore: { type: Number, default: 0 },
  priorityLevel: { type: String, enum: ["LOW", "MEDIUM", "HIGH", "URGENT"], default: "LOW" },
  latitude: { type: Number },
  longitude: { type: Number },
  address: { type: String },
  responseMinutes: { type: Number },
  resolvedAt: { type: Date, default: null },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

const ComplaintStatusLogSchema = new Schema<IComplaintStatusLog>({
  complaint: { type: Schema.Types.ObjectId, ref: "Complaint", required: true },
  status: { type: String, required: true },
  changedAt: { type: Date, default: Date.now },
});

const ComplaintAttachmentSchema = new Schema<IComplaintAttachment>({
  complaint: { type: Schema.Types.ObjectId, ref: "Complaint", required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false } });

// Export models using mongoose.models guard to avoid OverwriteModelError
export const Admin: Model<IAdmin> = (mongoose.models.Admin as Model<IAdmin>) || mongoose.model<IAdmin>("Admin", AdminSchema);
export const District: Model<IDistrict> = (mongoose.models.District as Model<IDistrict>) || mongoose.model<IDistrict>("District", DistrictSchema);
export const Village: Model<IVillage> = (mongoose.models.Village as Model<IVillage>) || mongoose.model<IVillage>("Village", VillageSchema);
export const RW: Model<IRW> = (mongoose.models.RW as Model<IRW>) || mongoose.model<IRW>("RW", RWSchema);
export const RT: Model<IRT> = (mongoose.models.RT as Model<IRT>) || mongoose.model<IRT>("RT", RTSchema);
export const Category: Model<ICategory> = (mongoose.models.Category as Model<ICategory>) || mongoose.model<ICategory>("Category", CategorySchema);
export const Complaint: Model<IComplaint> = (mongoose.models.Complaint as Model<IComplaint>) || mongoose.model<IComplaint>("Complaint", ComplaintSchema);
export const ComplaintStatusLog: Model<IComplaintStatusLog> = (mongoose.models.ComplaintStatusLog as Model<IComplaintStatusLog>) || mongoose.model<IComplaintStatusLog>("ComplaintStatusLog", ComplaintStatusLogSchema);
export const ComplaintAttachment: Model<IComplaintAttachment> = (mongoose.models.ComplaintAttachment as Model<IComplaintAttachment>) || mongoose.model<IComplaintAttachment>("ComplaintAttachment", ComplaintAttachmentSchema);

export default {
  Admin,
  District,
  Village,
  RW,
  RT,
  Category,
  Complaint,
  ComplaintStatusLog,
  ComplaintAttachment,
};
