// Mock Data for Reports & Recommendations Page

export interface TrendDataPoint {
  month: string;
  infrastruktur: number;
  pelayanan_publik: number;
  kebersihan: number;
}

export interface RecommendationItem {
  id: number;
  type: "warning" | "success" | "info";
  title: string;
  description: string;
  action: string;
}

export const TREND_DATA: TrendDataPoint[] = [
  {
    month: "Jan",
    infrastruktur: 65,
    pelayanan_publik: 58,
    kebersihan: 72,
  },
  {
    month: "Feb",
    infrastruktur: 72,
    pelayanan_publik: 65,
    kebersihan: 78,
  },
  {
    month: "Mar",
    infrastruktur: 68,
    pelayanan_publik: 72,
    kebersihan: 82,
  },
  {
    month: "Apr",
    infrastruktur: 78,
    pelayanan_publik: 80,
    kebersihan: 85,
  },
  {
    month: "May",
    infrastruktur: 85,
    pelayanan_publik: 78,
    kebersihan: 88,
  },
  {
    month: "Jun",
    infrastruktur: 82,
    pelayanan_publik: 85,
    kebersihan: 90,
  },
  {
    month: "Jul",
    infrastruktur: 88,
    pelayanan_publik: 88,
    kebersihan: 92,
  },
  {
    month: "Aug",
    infrastruktur: 92,
    pelayanan_publik: 90,
    kebersihan: 94,
  },
  {
    month: "Sep",
    infrastruktur: 89,
    pelayanan_publik: 92,
    kebersihan: 96,
  },
  {
    month: "Oct",
    infrastruktur: 95,
    pelayanan_publik: 94,
    kebersihan: 97,
  },
  {
    month: "Nov",
    infrastruktur: 91,
    pelayanan_publik: 96,
    kebersihan: 95,
  },
  {
    month: "Dec",
    infrastruktur: 97,
    pelayanan_publik: 98,
    kebersihan: 99,
  },
];

export const RECOMMENDATIONS_DATA: RecommendationItem[] = [
  {
    id: 1,
    type: "warning",
    title: "Perbaikan Infrastruktur Jalan",
    description:
      "Beberapa ruas jalan di kawasan pusat masih mengalami kerusakan signifikan dan memerlukan perbaikan mendesak.",
    action: "Lakukan survei lengkap dan buat rencana anggaran untuk Q1 2024",
  },
  {
    id: 2,
    type: "success",
    title: "Peningkatan Layanan Publik",
    description:
      "Pelayanan publik meningkat 25% dari bulan sebelumnya. Pertahankan momentum ini dengan program pelatihan berkelanjutan.",
    action: "Tingkatkan investasi SDM untuk hasil optimal",
  },
  {
    id: 3,
    type: "info",
    title: "Program Kebersihan Lingkungan",
    description:
      "Implementasi program kebersihan lingkungan menunjukkan hasil positif. Direkomendasikan untuk diperluas ke zona lain.",
    action: "Skalabilitas program ke 5 zona geografis tambahan",
  },
  {
    id: 4,
    type: "warning",
    title: "Optimalisasi Respons Layanan",
    description:
      "Waktu respons layanan publik masih di bawah target standar. Perlu sistem monitoring real-time yang lebih baik.",
    action: "Implementasikan portal monitoring 24/7 dengan AI",
  },
  {
    id: 5,
    type: "success",
    title: "Kebersihan Kota Mencapai Target",
    description:
      "Target kebersihan kota telah tercapai. Standar kualitas lingkungan meningkat signifikan bulan ini.",
    action: "Pertahankan momentum dan audit berkala setiap 2 minggu",
  },
  {
    id: 6,
    type: "info",
    title: "Inovasi Teknologi Pelayanan",
    description:
      "Perlu adopsi teknologi baru untuk meningkatkan efisiensi operasional pelayanan publik di era digital.",
    action: "Pelajari solusi teknologi terdepan dari kota lain",
  },
];
