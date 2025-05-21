import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  Shield,
  User,
  AlertTriangle,
  Calendar,
  CheckCheck,
  Activity,
  TrendingUp,
  Users,
  PieChart as PieChartIcon,
} from "lucide-react";
import SsiApi from "../../services/api/SsiApi";
import { useUserContext } from "../../context/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { SSIAP_2_INCIDENTS_ROUTE, SSIAP_2_MARK_ATTENDANCE_ROUTE } from "../../routes";
import { LineChart } from "../ui/charts/LineChart";
import { BarChart } from "../ui/charts/BarChart";
import { AreaChart } from "../ui/charts/AreaChart";
import { RadarChart } from "../ui/charts/RadarChart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";

const SIIDashboard = () => {
  const { user } = useUserContext();
  const [siteInfo, setSiteInfo] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [siteLoading, setSiteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [siteError, setSiteError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState(null);

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

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setChartLoading(true);
        const response = await SsiApi.getChartData();
        setChartData(response.data);
        setChartError(null);
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
        setChartError("Failed to load dashboard data. Please try again later.");
      } finally {
        setChartLoading(false);
      }
    };

    fetchChartData();
  }, []);

  // Keep existing helper functions
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-700 tracking-tight">
                SSIAP DASHBOARD
              </h2>
              <div className="mt-2 h-1 w-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
              <p className="text-gray-600 text-sm mt-3">
                Welcome back,{" "}
                <span className="font-medium">{user?.name || "User"}</span>
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">{user?.role || "SSIAP 2"}</p>
                <p className="text-sm text-muted-foreground">
                  ID: {user?.id || "12345"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {chartError && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{chartError}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-4">
            <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Total Incidents
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </CardHeader>
              <CardContent>
                {chartLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-gray-800 group-hover:text-primary/90 transition-colors duration-300">
                      {chartData?.summary?.incidents || 78}
                    </div>
                    <p className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">
                      +{chartData?.summary?.incidentsChange || 8}% from last month
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Profile Card */}
            <Card className="md:col-span-2 bg-gradient-to-br from-sky-50 to-white group hover:shadow-md transition-all duration-300 hover:border-primary/20 hover:from-sky-100 hover:to-white">
              <CardContent className="pt-6">
                {loading ? (
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-16 w-16 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-4 w-32" />
                      <div className="flex space-x-2 mt-1">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary/90 transition-colors duration-300">
                        {user?.name?.toUpperCase() || "Security Supervisor"}
                      </h3>
                      <p className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">
                        {siteInfo?.site_name || "Site Supervisor"}
                      </p>
                      <div className="flex items-center mt-1">
                        <Badge
                          variant="outline"
                          className="mr-2 bg-green-50 text-green-700 border-green-200 group-hover:bg-green-100 transition-colors duration-300"
                        >
                          <CheckCheck className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 group-hover:bg-blue-100 transition-colors duration-300"
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          {getCurrentShift()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="group hover:shadow-md transition-all duration-300 hover:border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">
                  Team Members
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </CardHeader>
              <CardContent>
                {chartLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-gray-800 group-hover:text-primary/90 transition-colors duration-300">
                      {chartData?.summary?.teamMembers || 12}
                    </div>
                    <p className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">
                      {chartData?.summary?.teamMembersOnDuty || 8} currently on duty
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            {/* Incidents Line Chart */}
            {chartLoading ? (
              <Skeleton className="h-[400px] w-full rounded-xl" />
            ) : (
              <Card className="overflow-hidden border-border shadow-sm text-center">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-gray-800">
                      Site Incidents
                    </CardTitle>
                    <CardDescription>
                      Monthly incident reports for your site
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/10">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +8%
                  </Badge>
                </CardHeader>
                <CardContent>
                  <LineChart
                    data={chartData?.lineChart?.data || []}
                    lines={chartData?.lineChart?.lines || []}
                  />
                </CardContent>
              </Card>
            )}

            {/* Users Bar Chart */}
            {chartLoading ? (
              <Skeleton className="h-[400px] w-full rounded-xl" />
            ) : (
              <Card className="overflow-hidden border-border shadow-sm text-center">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className={"text-gray-800"}>
                      Team Composition
                    </CardTitle>
                    <CardDescription>
                      Distribution of team by certification level
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/10">
                    <Users className="mr-1 h-3 w-3" />
                    12 Total
                  </Badge>
                </CardHeader>
                <CardContent>
                  <BarChart
                    data={chartData?.barChart?.data || []}
                    xKey={chartData?.barChart?.xKey || "name"}
                    yKey={chartData?.barChart?.yKey || "value"}
                    color="rgb(7, 89, 133)"
                  />
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <Card className="overflow-hidden border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className={"text-gray-800"}>
                    Your Upcoming Shifts
                  </CardTitle>
                  <CardDescription>
                    Next scheduled assignments
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/10">
                  <Calendar className="mr-1 h-3 w-3" />
                  Schedule
                </Badge>
              </CardHeader>
              <CardContent>
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
                        className="flex items-center p-3 border border-sky-100 rounded-lg hover:bg-sky-50 transition-colors group"
                      >
                        <div className="mr-4 bg-gradient-to-bl from-sky-200 to-sky-100 p-2 rounded-full group-hover:from-sky-300 group-hover:to-sky-200 transition-colors">
                          <Calendar className="h-5 w-5 text-sky-700" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 group-hover:text-primary/90 transition-colors">
                            {formatShiftTime(assignment.shift_start)} -{" "}
                            {formatTimeOnly(assignment.shift_end)}
                          </h3>
                          <p className="text-sm text-gray-600 group-hover:text-primary/70 transition-colors">
                            Site: {assignment.site_name || "Not specified"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className={"text-gray-800"}>
                    Recent Incidents
                  </CardTitle>
                  <CardDescription>
                    Latest security events at your site
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/10">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Alerts
                </Badge>
              </CardHeader>
              <CardContent>
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
                    <div className="p-4 border border-amber-100 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors group">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0 group-hover:text-amber-700 transition-colors" />
                        <div>
                          <h3 className="font-medium text-amber-900 group-hover:text-amber-950 transition-colors">
                            Fire Alarm Test
                          </h3>
                          <p className="text-sm text-amber-800 mt-1 group-hover:text-amber-900 transition-colors">
                            Scheduled test of fire alarm system at 14:00 today
                          </p>
                          <p className="text-xs text-amber-700 mt-2 group-hover:text-amber-800 transition-colors">
                            Posted 2 hours ago
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-sky-100 rounded-lg bg-sky-50 hover:bg-sky-100 transition-colors group">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-sky-600 mt-0.5 mr-3 flex-shrink-0 group-hover:text-sky-700 transition-colors" />
                        <div>
                          <h3 className="font-medium text-sky-900 group-hover:text-sky-950 transition-colors">
                            Maintenance Notice
                          </h3>
                          <p className="text-sm text-sky-800 mt-1 group-hover:text-sky-900 transition-colors">
                            Elevator maintenance scheduled for tomorrow from 10:00 to
                            12:00
                          </p>
                          <p className="text-xs text-sky-700 mt-2 group-hover:text-sky-800 transition-colors">
                            Posted yesterday
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {chartLoading ? (
            <Skeleton className="h-[400px] w-full rounded-xl mt-6" />
          ) : (
            <Card className="overflow-hidden border-border shadow-sm mt-6 text-center">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className={"text-gray-800"}>
                    Attendance Trends
                  </CardTitle>
                  <CardDescription>
                    Monthly attendance patterns for your site
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/10">
                  <Calendar className="mr-1 h-3 w-3" />
                  Monthly
                </Badge>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={chartData?.areaChart?.data || []}
                  areaKey={chartData?.areaChart?.areaKey || "value"}
                  secondAreaKey={
                    chartData?.areaChart?.secondAreaKey || "secondValue"
                  }
                  showSecondArea={true}
                  name="Attendance"
                  secondName="Expected"
                  color="var(--primary)"
                  secondColor="var(--muted-foreground)"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SIIDashboard;