"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allUploads = [
    {
      id: 1,
      fileName: "customer_data.csv",
      uploadDate: "2025-12-01 10:30 AM",
      status: "Completed",
      rows: "15,420",
      size: "2.4 MB"
    },
    {
      id: 2,
      fileName: "sales_report.xlsx",
      uploadDate: "2025-12-01 09:15 AM",
      status: "Completed",
      rows: "8,750",
      size: "1.8 MB"
    },
    {
      id: 3,
      fileName: "inventory.csv",
      uploadDate: "2025-11-30 04:45 PM",
      status: "Failed",
      rows: "12,000",
      size: "3.2 MB"
    },
    {
      id: 4,
      fileName: "employee_records.csv",
      uploadDate: "2025-11-30 02:20 PM",
      status: "Processing",
      rows: "3,240",
      size: "0.8 MB"
    },
    {
      id: 5,
      fileName: "product_catalog.xlsx",
      uploadDate: "2025-11-30 11:00 AM",
      status: "Completed",
      rows: "24,680",
      size: "5.1 MB"
    },
    {
      id: 6,
      fileName: "transaction_log.csv",
      uploadDate: "2025-11-29 03:15 PM",
      status: "Completed",
      rows: "45,120",
      size: "8.9 MB"
    },
    {
      id: 7,
      fileName: "supplier_data.xlsx",
      uploadDate: "2025-11-29 01:20 PM",
      status: "Failed",
      rows: "2,340",
      size: "0.6 MB"
    },
    {
      id: 8,
      fileName: "order_history.csv",
      uploadDate: "2025-11-28 05:30 PM",
      status: "Completed",
      rows: "32,450",
      size: "6.2 MB"
    },
    {
      id: 9,
      fileName: "inventory_update.xlsx",
      uploadDate: "2025-11-28 10:45 AM",
      status: "Completed",
      rows: "18,920",
      size: "3.7 MB"
    },
    {
      id: 10,
      fileName: "customer_feedback.csv",
      uploadDate: "2025-11-27 02:10 PM",
      status: "Completed",
      rows: "5,630",
      size: "1.2 MB"
    },
    {
      id: 11,
      fileName: "monthly_report.xlsx",
      uploadDate: "2025-11-27 09:00 AM",
      status: "Failed",
      rows: "11,240",
      size: "2.8 MB"
    },
    {
      id: 12,
      fileName: "user_analytics.csv",
      uploadDate: "2025-11-26 04:25 PM",
      status: "Completed",
      rows: "28,910",
      size: "5.4 MB"
    },
    {
      id: 13,
      fileName: "shipping_data.xlsx",
      uploadDate: "2025-11-26 11:15 AM",
      status: "Completed",
      rows: "9,450",
      size: "1.9 MB"
    },
    {
      id: 14,
      fileName: "payment_records.csv",
      uploadDate: "2025-11-25 03:40 PM",
      status: "Completed",
      rows: "19,780",
      size: "4.1 MB"
    },
    {
      id: 15,
      fileName: "vendor_list.xlsx",
      uploadDate: "2025-11-25 10:30 AM",
      status: "Processing",
      rows: "3,120",
      size: "0.7 MB"
    }
  ];

  const filteredUploads = allUploads.filter((upload) => {
    const matchesSearch = upload.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || upload.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUploads.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUploads = filteredUploads.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload History</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage all your previous uploads
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setStatusFilter("all");
                setCurrentPage(1);
              }}
            >
              All
            </Button>
            <Button
              variant={statusFilter === "Completed" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setStatusFilter("Completed");
                setCurrentPage(1);
              }}
            >
              Completed
            </Button>
            <Button
              variant={statusFilter === "Failed" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setStatusFilter("Failed");
                setCurrentPage(1);
              }}
            >
              Failed
            </Button>
            <Button
              variant={statusFilter === "Processing" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setStatusFilter("Processing");
                setCurrentPage(1);
              }}
            >
              Processing
            </Button>
          </div>
        </div>

        <DataTable
          data={paginatedUploads}
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
            { key: "rows", header: "Rows" },
            { key: "size", header: "Size" },
            {
              key: "actions",
              header: "Actions",
              render: (item) => (
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon-sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  {item.status === "Failed" && (
                    <Button variant="ghost" size="icon-sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )
            }
          ]}
          emptyMessage="No uploads found matching your criteria"
        />

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUploads.length)} of{" "}
              {filteredUploads.length} results
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon-sm"
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}