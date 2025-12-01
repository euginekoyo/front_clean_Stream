import { Charts } from "./components/charts";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/ui/data-table";
import { Upload, FileCheck, TrendingUp, Activity } from "lucide-react";

export default function Page() {
  const recentActivity = [
    {
      id: 1,
      fileName: "customer_data.csv",
      uploadDate: "2025-12-01 10:30 AM",
      status: "Completed",
      rows: "15,420"
    },
    {
      id: 2,
      fileName: "sales_report.xlsx",
      uploadDate: "2025-12-01 09:15 AM",
      status: "Completed",
      rows: "8,750"
    },
    {
      id: 3,
      fileName: "inventory.csv",
      uploadDate: "2025-11-30 04:45 PM",
      status: "Failed",
      rows: "12,000"
    },
    {
      id: 4,
      fileName: "employee_records.csv",
      uploadDate: "2025-11-30 02:20 PM",
      status: "Processing",
      rows: "3,240"
    },
    {
      id: 5,
      fileName: "product_catalog.xlsx",
      uploadDate: "2025-11-30 11:00 AM",
      status: "Completed",
      rows: "24,680"
    }
  ];

  return (
    <div className="w-full p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor your data uploads and system performance
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Uploads"
          value="1,248"
          change="+12.5% from last month"
          changeType="positive"
          icon={Upload}
          iconColor="from-blue-500 to-blue-600"
        />
        <StatsCard
          title="Successful"
          value="1,180"
          change="94.5% success rate"
          changeType="positive"
          icon={FileCheck}
          iconColor="from-green-500 to-green-600"
        />
        <StatsCard
          title="Rows Processed"
          value="2.4M"
          change="+8.2% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="from-purple-500 to-purple-600"
        />
        <StatsCard
          title="Active Jobs"
          value="3"
          change="2 pending review"
          changeType="neutral"
          icon={Activity}
          iconColor="from-orange-500 to-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Upload Trends
          </h2>
          <Charts />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Processing Volume
          </h2>
          <Charts />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h2>
        <DataTable
          data={recentActivity}
          columns={[
            { key: "fileName", header: "File Name" },
            { key: "uploadDate", header: "Upload Date" },
            {
              key: "status",
              header: "Status",
              render: (item) => (
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    item.status === "Completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : item.status === "Failed"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {item.status}
                </span>
              )
            },
            { key: "rows", header: "Rows" }
          ]}
        />
      </div>
    </div>
  );
}
