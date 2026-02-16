import { notFound } from "next/navigation";
import { getComplaintDetail } from "@/lib/services/complaint-detail.service";
import ComplaintDetailCard from "@/components/dashboard/ComplaintDetailCard";
import ResponseSummary from "@/components/dashboard/ResponseSummary";
import StatusTimeline from "@/components/dashboard/StatusTimeline";
import ChatLog from "@/components/dashboard/ChatLog";

interface PageProps {
  params: { id: string };
}

export default async function ComplaintDetailPage({ params }: PageProps) {
  const detail = await getComplaintDetail(params.id);
  if (!detail) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <ComplaintDetailCard detail={detail} />
      <ResponseSummary
        createdAt={detail.createdAt}
        resolvedAt={detail.resolvedAt}
        responseMinutes={detail.responseMinutes}
        status={detail.status}
      />
      <StatusTimeline statusLogs={detail.statusLogs} currentStatus={detail.status} />
      <ChatLog complaintId={detail._id} />
    </div>
  );
}
