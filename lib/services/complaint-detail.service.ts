import mongoose, { PipelineStage } from "mongoose";
import connectToDatabase from "@/lib/db";
import { Complaint } from "@/models/index";

export interface ComplaintDetailResult {
  _id: string;
  ticketNumber: string;
  reporterName?: string;
  reporterPhone?: string;
  category?: string;
  location?: {
    district?: string;
    village?: string;
    rw?: number;
    rt?: number;
  };
  title?: string;
  description?: string;
  status: string;
  priorityLevel?: string;
  priorityScore: number;
  latitude?: number;
  longitude?: number;
  address?: string;
  responseMinutes?: number | null;
  resolvedAt?: Date | null;
  createdAt: Date;
  statusLogs: {
    status: string;
    changedAt: Date;
  }[];
  attachments: {
    fileUrl: string;
    fileType?: string;
  }[];
}

export async function getComplaintDetail(
  id: string
): Promise<ComplaintDetailResult | null> {
  await connectToDatabase();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  const objectId = new mongoose.Types.ObjectId(id);

  const pipeline: PipelineStage[] = [
    {
      $match: {
        _id: objectId,
        $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
      },
    },

    // Category
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },

    // RT
    {
      $lookup: {
        from: "rts",
        localField: "rt",
        foreignField: "_id",
        as: "rt",
      },
    },
    { $unwind: { path: "$rt", preserveNullAndEmptyArrays: true } },

    // RW
    {
      $lookup: {
        from: "rws",
        localField: "rt.rw",
        foreignField: "_id",
        as: "rw",
      },
    },
    { $unwind: { path: "$rw", preserveNullAndEmptyArrays: true } },

    // Village
    {
      $lookup: {
        from: "villages",
        localField: "rw.village",
        foreignField: "_id",
        as: "village",
      },
    },
    { $unwind: { path: "$village", preserveNullAndEmptyArrays: true } },

    // District
    {
      $lookup: {
        from: "districts",
        localField: "village.district",
        foreignField: "_id",
        as: "district",
      },
    },
    { $unwind: { path: "$district", preserveNullAndEmptyArrays: true } },

    // Status Logs
    {
      $lookup: {
        from: "complaintstatuslogs",
        localField: "_id",
        foreignField: "complaint",
        as: "statusLogs",
      },
    },

    // Attachments
    {
      $lookup: {
        from: "complaintattachments",
        localField: "_id",
        foreignField: "complaint",
        as: "attachments",
      },
    },

    // Sort statusLogs ascending
    {
      $set: {
        statusLogs: {
          $sortArray: {
            input: "$statusLogs",
            sortBy: { changedAt: 1 },
          },
        },
      },
    },

    // Calculate responseMinutes if missing
    {
      $addFields: {
        responseMinutes: {
          $cond: [
            { $and: ["$resolvedAt", "$createdAt"] },
            {
              $divide: [
                { $subtract: ["$resolvedAt", "$createdAt"] },
                60000,
              ],
            },
            "$responseMinutes",
          ],
        },
      },
    },

    {
      $project: {
        _id: 1,
        ticketNumber: 1,
        reporterName: 1,
        reporterPhone: 1,
        title: 1,
        description: 1,
        status: 1,
        priorityLevel: 1,
        priorityScore: 1,
        latitude: 1,
        longitude: 1,
        address: 1,
        responseMinutes: 1,
        resolvedAt: 1,
        createdAt: 1,

        category: "$category.name",

        location: {
          district: "$district.name",
          village: "$village.name",
          rw: "$rw.number",
          rt: "$rt.number",
        },

        statusLogs: {
          status: 1,
          changedAt: 1,
        },

        attachments: {
          fileUrl: 1,
          fileType: 1,
        },
      },
    },
  ];

  const result = await Complaint.aggregate(pipeline);

  if (!result[0]) return null;

  const detail = result[0];

  return {
    ...detail,
    _id: detail._id.toString(),
  };
}
