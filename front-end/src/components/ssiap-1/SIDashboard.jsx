import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  Shield,
  User,
  AlertTriangle,
  Calendar,
  Loader2,
} from "lucide-react";
import SsiApi from "../../services/api/SsiApi";
import { useUserContext } from "../../context/UserContext";
import { Skeleton } from "@/components/ui/skeleton";

const SIDashboard = () => {
  const { user } = useUserContext();
  const [siteInfo, setSiteInfo] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [siteLoading, setSiteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [siteError, setSiteError] = useState(null);

  useEffect(() => {
    const fetchSiteInfo = async () => {
      if (!user?.id) return;
      try {
        setSiteLoading(true);
        const response = await SsiApi.getUserSite(user.id);
        setSiteInfo(response.data);
      } catch (err) {
        setSiteError("Failed to load site information");
        console.error(err);
      } finally {
        setSiteLoading(false);
      }
    };

    fetchSiteInfo();
  }, [user]);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        const response = await SsiApi.getCurrentUserAssignments();
        setAssignments(response.data);
      } catch (err) {
        setError("Failed to load your assignments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [user]);

  const formatShiftTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatTimeOnly = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const getCurrentShift = () => {
    if (!assignments || assignments.length === 0) return "No shift scheduled";

    const now = new Date();
    const currentShift = assignments.find(
      (assignment) =>
        new Date(assignment.shift_start) <= now &&
        new Date(assignment.shift_end) >= now
    );

    if (currentShift) {
      return `${formatTimeOnly(currentShift.shift_start)} - ${formatTimeOnly(
        currentShift.shift_end
      )}`;
    } else {
      return "On duty";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-sky-50 to-white p-6 border-b border-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-700 tracking-tight">
              SSIAP DASHBOARD
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
            <p className="text-gray-600 text-sm mt-3">
              Welcome to your{" "}
              <span className="text-gray-800 font-medium px-2 py-1 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400">
                DASHBOARD
              </span>{" "}
              .
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-white">
              <h2 className="text-lg font-semibold text-sky-900">
                Your Information
              </h2>
            </div>
            <div className="p-5">
              {loading ? (
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-sky-50 flex items-center justify-center">
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                  <div>
                    <Skeleton className="h-7 w-40" />
                    <div className="flex items-center mt-1">
                      <Skeleton className="h-4 w-24 mr-2" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-4 w-20 mt-1" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-bl from-sky-200 to-sky-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-sky-700" />
                  </div>
                  <div>
                    {!user?.name ? (
                      <Skeleton className="h-7 w-40" />
                    ) : (
                      <h3 className="text-xl font-medium text-gray-900">
                        {user.name}
                      </h3>
                    )}
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <Shield className="h-4 w-4 mr-1 text-sky-600" />
                      <span>
                        SSIAP
                        {user?.ssiap_level || (
                          <Skeleton className="h-4 w-4 inline-block mx-1" />
                        )}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        ID:{" "}
                        {user?.id || (
                          <Skeleton className="h-4 w-16 inline-block" />
                        )}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      {loading ? (
                        <Skeleton className="h-4 w-20" />
                      ) : assignments.length > 0 ? (
                        <div className="flex items-center text-green-600 text-sm bg-green-100 px-1 py-0.5 rounded-4xl">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          <span>Active</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-amber-600 bg-amber-100 px-1 py-0.5 rounded-4xl text-sm">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          <span>No assignments</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-white">
                <h2 className="text-lg font-semibold text-sky-900">
                  Today's Shift
                </h2>
              </div>
              <div className="p-5">
                {siteLoading ? (
                  <>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center">
                        <Skeleton className="h-5 w-5 rounded-full" />
                      </div>
                      <div>
                        <Skeleton className="h-6 w-36" />
                        <Skeleton className="h-5 w-32 mt-1" />
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-sky-50 rounded-lg">
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-bl from-sky-200 to-sky-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-sky-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {getCurrentShift()}
                        </h3>
                        <div className="text-sm text-gray-600 h-5 flex items-center">
                          Site: {siteInfo?.site_name || "Not assigned"}
                        </div>
                      </div>
                    </div>
                    {siteInfo && (
                      <div className="mt-4 p-3 bg-sky-50 rounded-lg">
                        <p className="text-sm text-sky-900">
                          <span className="font-medium">Site Type:</span>{" "}
                          {siteInfo.site_type}
                        </p>
                        <p className="text-sm text-sky-900 mt-1">
                          <span className="font-medium">Address:</span>{" "}
                          {siteInfo.address}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-white">
                <h2 className="text-lg font-semibold text-sky-900">
                  Quick Actions
                </h2>
              </div>
              <div className="p-5 space-y-3">
                <button className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-800 rounded-lg transition-colors flex items-center justify-center cursor-pointer">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span>Report Incident</span>
                </button>
                <button className="w-full py-3 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-lg transition-colors flex items-center justify-center cursor-pointer">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>View Schedule</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-white">
              <h2 className="text-lg font-semibold text-sky-900">
                Your Upcoming Shifts
              </h2>
            </div>
            <div className="p-5">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center p-3 border border-sky-100 rounded-lg"
                    >
                      <div className="mr-4 bg-sky-50 p-2 rounded-full flex items-center justify-center">
                        <Skeleton className="h-5 w-5 rounded-full" />
                      </div>
                      <div>
                        <Skeleton className="h-6 w-48 mb-1" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : assignments.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-500">No upcoming shifts scheduled</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-center p-3 border border-sky-100 rounded-lg hover:bg-sky-50 transition-colors"
                    >
                      <div className="mr-4 bg-gradient-to-bl from-sky-200 to-sky-100 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-sky-700" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {formatShiftTime(assignment.shift_start)} -{" "}
                          {formatTimeOnly(assignment.shift_end)}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Site: {assignment.site_name || "Not specified"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-sky-50 to-white">
          <h2 className="text-lg font-semibold text-sky-900">
            Recent Incidents at Your Site
          </h2>
        </div>
        <div className="p-5">
          {siteLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-100 rounded-lg bg-gray-50"
                >
                  <div className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 rounded-full bg-gray-200" />
                    <div>
                      <Skeleton className="h-5 w-36 mb-2" />
                      <Skeleton className="h-4 w-64 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 border border-amber-100 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-amber-900">
                      Fire Alarm Test
                    </h3>
                    <p className="text-sm text-amber-800 mt-1">
                      Scheduled test of fire alarm system at 14:00 today
                    </p>
                    <p className="text-xs text-amber-700 mt-2">
                      Posted 2 hours ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-sky-100 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-sky-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-sky-900">
                      Maintenance Notice
                    </h3>
                    <p className="text-sm text-sky-800 mt-1">
                      Elevator maintenance scheduled for tomorrow from 10:00 to
                      12:00
                    </p>
                    <p className="text-xs text-sky-700 mt-2">
                      Posted yesterday
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SIDashboard;
