"use client";

import { useState } from "react";
import { Upload, FileCheck, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationResults, setValidationResults] = useState<{
    totalRows: number;
    validRows: number;
    errors: Array<{ row: number; message: string }>;
  } | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setUploadStatus("idle");
    setUploadProgress(0);
    simulateValidation(file);
  };

  const simulateValidation = (file: File) => {
    const mockResults = {
      totalRows: Math.floor(Math.random() * 10000) + 1000,
      validRows: 0,
      errors: [] as Array<{ row: number; message: string }>
    };
    mockResults.validRows = mockResults.totalRows - Math.floor(Math.random() * 50);

    if (mockResults.validRows < mockResults.totalRows) {
      for (let i = 0; i < mockResults.totalRows - mockResults.validRows; i++) {
        mockResults.errors.push({
          row: Math.floor(Math.random() * mockResults.totalRows) + 1,
          message: "Invalid email format"
        });
      }
    }

    setValidationResults(mockResults);
  };

  const handleUpload = () => {
    setUploadStatus("uploading");
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("success");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleReset = () => {
    setUploadedFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    setValidationResults(null);
  };

  return (
    <div className="w-full p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Data</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Upload your CSV or Excel files for processing
        </p>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed p-12 transition-all duration-300 ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
        }`}
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            isDragging
              ? "bg-blue-100 dark:bg-blue-900/30"
              : "bg-gray-100 dark:bg-gray-700"
          }`}>
            <Upload className={`w-8 h-8 ${
              isDragging
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400"
            }`} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Drop your files here
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              or click to browse from your computer
            </p>
          </div>

          <input
            type="file"
            id="file-upload"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileInput}
            className="hidden"
          />
          <label htmlFor="file-upload">
            <Button variant="outline" size="lg" asChild>
              <span className="cursor-pointer">
                Select File
              </span>
            </Button>
          </label>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Supported formats: CSV, XLSX, XLS (Max 50MB)
          </p>
        </div>
      </div>

      {uploadedFile && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {uploadedFile.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              <XCircle className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>

          {validationResults && (
            <div className="space-y-4">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Validation Results
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Rows</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {validationResults.totalRows.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Valid Rows</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {validationResults.validRows.toLocaleString()}
                    </p>
                  </div>
                </div>

                {validationResults.errors.length > 0 && (
                  <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                          {validationResults.errors.length} validation {validationResults.errors.length === 1 ? 'error' : 'errors'} found
                        </p>
                        <ul className="mt-2 space-y-1">
                          {validationResults.errors.slice(0, 3).map((error, index) => (
                            <li key={index} className="text-sm text-yellow-700 dark:text-yellow-300">
                              Row {error.row}: {error.message}
                            </li>
                          ))}
                          {validationResults.errors.length > 3 && (
                            <li className="text-sm text-yellow-700 dark:text-yellow-300">
                              ...and {validationResults.errors.length - 3} more
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {uploadStatus === "uploading" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Uploading...</span>
                <span className="text-gray-900 dark:text-white font-medium">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {uploadStatus === "success" && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <p className="text-sm font-medium text-green-800 dark:text-green-400">
                  Upload completed successfully!
                </p>
              </div>
            </div>
          )}

          {uploadStatus !== "success" && (
            <div className="flex gap-3">
              <Button
                onClick={handleUpload}
                disabled={uploadStatus === "uploading"}
                size="lg"
                className="flex-1"
              >
                {uploadStatus === "uploading" ? "Uploading..." : "Start Upload"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}