// Mock Data for Analytics & Priorities Page

export interface ComplaintItem {
  id: number;
  title: string;
  location: string;
  severity: "Kritis" | "Tinggi";
  time: string;
  category: string;
}

export interface CategoryDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface AreaIssue {
  area: string;
  totalIssues: number;
}

export interface HeatmapCell {
  x: number;
  y: number;
  intensity: number;
}

export const PRIORITY_COMPLAINTS: ComplaintItem[] = [
  {
    id: 1,
    title: "Banjir di Kelurahan Cibubur",
    location: "Jl. Raya Cibubur",
    severity: "Kritis",
    time: "2 jam yang lalu",
    category: "Bencana Alam",
  },
  {
    id: 2,
    title: "Jalan Berlubang Parah",
    location: "Jl. Medan Merdeka",
    severity: "Kritis",
    time: "4 jam yang lalu",
    category: "Infrastruktur",
  },
  {
    id: 3,
    title: "Sampah Menumpuk di TPS",
    location: "TPS Kelapa Gading",
    severity: "Tinggi",
    time: "6 jam yang lalu",
    category: "Kebersihan",
  },
  {
    id: 4,
    title: "Lampu Jalan Mati",
    location: "Jl. Gatot Subroto",
    severity: "Tinggi",
    time: "8 jam yang lalu",
    category: "Infrastruktur",
  },
  {
    id: 5,
    title: "Pohon Tumbang Blocking Jalan",
    location: "Jl. Sudirman",
    severity: "Kritis",
    time: "10 jam yang lalu",
    category: "Darurat",
  },
];

export const CATEGORY_DATA: CategoryDataPoint[] = [
  { name: "Infrastruktur", value: 35, color: "#4f46e5" },
  { name: "Kebersihan", value: 28, color: "#10b981" },
  { name: "Keamanan", value: 18, color: "#f59e0b" },
  { name: "Kesehatan", value: 12, color: "#ef4444" },
  { name: "Lainnya", value: 7, color: "#8b5cf6" },
];

export const AREA_ISSUES: AreaIssue[] = [
  { area: "Cibubur", totalIssues: 156 },
  { area: "Kelapa Gading", totalIssues: 142 },
  { area: "Kemang", totalIssues: 128 },
  { area: "Senayan", totalIssues: 115 },
  { area: "Tebet", totalIssues: 108 },
];

export const HEATMAP_GRID: HeatmapCell[] = Array.from(
  { length: 100 },
  (_, index) => ({
    x: index % 10,
    y: Math.floor(index / 10),
    intensity: Math.floor(Math.random() * 100) + 1,
  }),
);
