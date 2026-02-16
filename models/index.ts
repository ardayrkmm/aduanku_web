/**
 * Centralized Model Exports
 *
 * This file re-exports all Mongoose models and their interfaces
 * from individual model files. Individual models are stored in
 * separate files for better organization and modularity.
 */

// Import interfaces and models
export { default as District, type IDistrict } from "./District";
export { default as Village, type IVillage } from "./Village";
export { default as Rw, type IRw } from "./Rw";
export { default as Rt, type IRt } from "./Rt";
export { default as Category, type ICategory } from "./Category";
export { default as AdminUser, type IAdminUser } from "./AdminUser";
export { default as Complaint, type IComplaint } from "./Complaint";
export {
  default as ComplaintStatusLog,
  type IComplaintStatusLog,
} from "./ComplaintStatusLog";
export {
  default as ComplaintAttachment,
  type IComplaintAttachment,
} from "./ComplaintAttachment";

// Export types for common enumerations
export type ComplaintStatus =
  | "DITERIMA"
  | "VERIFIKASI"
  | "DITERUSKAN"
  | "DIPROSES"
  | "SELESAI"
  | "DITOLAK";

export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
