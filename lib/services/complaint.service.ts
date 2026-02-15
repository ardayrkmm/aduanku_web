import mongoose, { FilterQuery } from "mongoose";
import connectToDatabase from "@/lib/db";
import { Complaint, Category, IComplaint } from "@/models/index";

export interface ComplaintListItem {
  _id: string;
  ticketNumber: string;
  reporterName?: string;
  category: string;
  status: string;
  priorityLevel?: string;
  createdAt: string;
}

export interface ComplaintsListResult {
  data: ComplaintListItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function getComplaintsList(params: {
  page: number;
  limit: number;
  status?: string;
  category?: string;
  search?: string;
}): Promise<ComplaintsListResult> {
  await connectToDatabase();
  const { page, limit, status, category, search } = params;
  const skip = (page - 1) * limit;

  const baseFilter: FilterQuery<IComplaint> = {
    $or: [
      { deletedAt: null },
      { deletedAt: { $exists: false } },
    ],
  };
  if (status) baseFilter.status = status;
  if (category && mongoose.Types.ObjectId.isValid(category)) baseFilter.category = new mongoose.Types.ObjectId(category);
  if (search) baseFilter.ticketNumber = { $regex: search, $options: "i" };

  const pipeline = [
    { $match: baseFilter },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
    {
      $match: {
        $or: [
          { "category.deletedAt": null },
          { "category.deletedAt": { $exists: false } },
        ],
      },
    },
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $project: {
        _id: 1,
        ticketNumber: 1,
        reporterName: 1,
        category: "$category.name",
        status: 1,
        priorityLevel: 1,
        createdAt: 1,
      },
    },
  ];

  const [data, total] = await Promise.all([
    Complaint.aggregate(pipeline),
    Complaint.countDocuments(baseFilter),
  ]);

  return {
    data: data.map((item) => ({
      ...item,
      _id: item._id.toString(),
      createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
    })),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getAllCategories(): Promise<{ _id: string; name: string }[]> {
  await connectToDatabase();
  const categories = await Category.find({ deletedAt: null }, { _id: 1, name: 1 }).lean();
  return categories.map((cat) => ({ _id: cat._id.toString(), name: cat.name }));
}
