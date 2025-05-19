import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  User,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Calendar,
  Filter,
  RefreshCw,
  AlertCircle,
  X,
  Loader2,
  Building,
} from "lucide-react";
import SsiApi from "../../../services/api/SsiApi";
import { useUserContext } from "../../../context/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SIIAttendance = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const { user } = useUserContext();
  const [loadingSites, setLoadingSites] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    vacation: 0,
    sickLeave: 0,
  });

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  const fetchAttendance = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      console.log("Fetching attendance for date:", selectedDate);
      const response = await SsiApi.getAttendance({ date: selectedDate });
      console.log("Attendance API response:", response);

      let data = [];
      if (response && response.data) {
        if (Array.isArray(response.data)) {
          data = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          data = response.data.data;
        }
      }

      // Note: The backend should already filter records based on the user's SSIAP level
      // SSIAP-2 users should only see attendance for employees at their site
      // This is handled in the AttendanceController.php

      setAttendances(data);

      // Calculate stats
      const total = data.length;
      const present = data.filter((a) => a.status === "Present").length;
      const absent = data.filter((a) => a.status === "Absent").length;
      const vacation = data.filter((a) => a.status === "Vacation").length;
      const sickLeave = data.filter((a) => a.status === "Sick Leave").length;

      setStats({ total, present, absent, vacation, sickLeave });
    } catch (err) {
      console.error("Attendance fetch error:", err);
      setError("Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800";
      case "Late":
        return "bg-yellow-100 text-yellow-800";
      case "Absent":
        return "bg-red-100 text-red-800";
      case "Vacation":
        return "bg-blue-100 text-blue-800";
      case "Sick Leave":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case "Late":
        return <Clock className="h-4 w-4 mr-1" />;
      case "Absent":
        return <XCircle className="h-4 w-4 mr-1" />;
      case "Vacation":
        return <Calendar className="h-4 w-4 mr-1" />;
      case "Sick Leave":
        return <Shield className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  // Filter attendances based on search term and status filter
  const filteredAttendances = attendances.filter((attendance) => {
    const matchesSearch =
      searchTerm === "" ||
      (attendance.employee &&
        attendance.employee.name &&
        attendance.employee.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (attendance.employee &&
        attendance.employee.email &&
        attendance.employee.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || attendance.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading && !filteredAttendances.length) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold text-gray-700 tracking-tight">
                SITE ATTENDANCE MANAGEMENT
              </h2>
              <div className="mt-2 h-1 w-16 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" />
              <p className="text-gray-600 text-sm mt-3">
                Monitor and manage attendance records for employees at your site
              </p>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-start">
                    <Skeleton className="h-5 w-5 mr-3" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-48 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <div className="flex gap-2 mb-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-gray-700 tracking-tight">
              SITE ATTENDANCE MANAGEMENT
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" />
            <p className="text-gray-600 text-sm mt-3">
              Monitor and manage attendance records for employees at your site
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Employees
                  </p>
                  <p className="text-2xl font-semibold text-gray-800 mt-1 group-hover:text-blue-700 transition-colors">
                    {stats.total}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Present Today
                  </p>
                  <p className="text-2xl font-semibold text-gray-800 mt-1 group-hover:text-green-700 transition-colors">
                    {stats.present}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 group-hover:bg-green-100 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      stats.total > 0
                        ? Math.min(100, (stats.present / stats.total) * 100)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Absent Today
                  </p>
                  <p className="text-2xl font-semibold text-gray-800 mt-1 group-hover:text-red-700 transition-colors">
                    {stats.absent}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      stats.total > 0
                        ? Math.min(100, (stats.absent / stats.total) * 100)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Vacation</p>
                  <p className="text-2xl font-semibold text-gray-800 mt-1 group-hover:text-blue-700 transition-colors">
                    {stats.vacation}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      stats.total > 0
                        ? Math.min(100, (stats.vacation / stats.total) * 100)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Sick Leave
                  </p>
                  <p className="text-2xl font-semibold text-gray-800 mt-1 group-hover:text-purple-700 transition-colors">
                    {stats.sickLeave}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      stats.total > 0
                        ? Math.min(100, (stats.sickLeave / stats.total) * 100)
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search employees..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                  <SelectItem value="Vacation">Vacation</SelectItem>
                  <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-[180px]"
              />

              <Button
                variant="outline"
                size="icon"
                onClick={fetchAttendance}
                disabled={loading}
                className="h-10 w-10"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-800 hover:text-red-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-start">
                    <Skeleton className="h-5 w-5 mr-3" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-48 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <div className="flex gap-2 mb-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAttendances.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No attendance records found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                There are no attendance records for the selected date or
                filters. Try changing your search criteria or select a different
                date.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAttendances.map((attendance) => (
                <div
                  key={attendance.id}
                  className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="p-2 bg-blue-100 rounded-full mr-3">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h3 className="font-medium text-gray-900">
                          {attendance.employee?.name || "Unknown Employee"}
                        </h3>
                        <div className="flex items-center mt-1 sm:mt-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              attendance.status
                            )}`}
                          >
                            {getStatusIcon(attendance.status)}
                            {attendance.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {attendance.employee?.email || "No email available"}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {attendance.check_in_time && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Clock className="h-3 w-3 mr-1" />
                            In:{" "}
                            {format(
                              new Date(attendance.check_in_time),
                              "HH:mm"
                            )}
                          </span>
                        )}
                        {attendance.check_out_time && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            <Clock className="h-3 w-3 mr-1" />
                            Out:{" "}
                            {format(
                              new Date(attendance.check_out_time),
                              "HH:mm"
                            )}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        <Calendar className="h-3 w-3 inline mr-1" />
                        {format(new Date(attendance.date), "MMMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SIIAttendance;
