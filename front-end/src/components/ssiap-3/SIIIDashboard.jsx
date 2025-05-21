import React, { useState, useEffect } from "react";
import { LineChart } from "../ui/charts/LineChart";
import { BarChart } from "../ui/charts/BarChart";
import { AreaChart } from "../ui/charts/AreaChart";
import { PieChart } from "../ui/charts/PieChart";
import { RadarChart } from "../ui/charts/RadarChart";
import SsiApi from "../../services/api/SsiApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import {
  AlertCircle,
  TrendingUp,
  Users,
  Calendar,
  PieChart as PieChartIcon,
  Activity,
  Shield,
  User,
  AlertTriangle,
  CheckCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";
import { useUserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

const SIIIDashboard = () => {
  const { user } = useUserContext();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [siteInfo, setSiteInfo] = useState(null);
  const [siteLoading, setSiteLoading] = useState(false);
  const [siteError, setSiteError] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const response = await SsiApi.getChartData();
        setChartData(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-sky-50 to-white p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-700 tracking-tight">
                SSIAP DASHBOARD
              </h2>
              <div className="mt-2 ml-18 h-1 w-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
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
                <p className="font-medium">{user?.role || "SSIAP 3"}</p>
                <p className="text-sm text-muted-foreground">
                  ID: {user?.id || "12345"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
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
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-gray-800 group-hover:text-primary/90 transition-colors duration-300">
                      {chartData?.summary?.incidents || 142}
                    </div>
                    <p className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">
                      +{chartData?.summary?.incidentsChange || 12}% from last
                      month
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
                        {user?.name?.toUpperCase() || "Security Manager"}
                      </h3>
                      <p className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">
                        {siteInfo?.name || "Headquarters"}
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
                          {siteInfo?.shifts || "8"} hrs today
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
                  Active Sites
                </CardTitle>
                <PieChartIcon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold text-gray-800 group-hover:text-primary/90 transition-colors duration-300">
                      {chartData?.summary?.sites || 24}
                    </div>
                    <p className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">
                      +{chartData?.summary?.sitesChange || 3}% from last month
                    </p>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            {/* Incidents Line Chart */}
            {loading ? (
              <Skeleton className="h-[400px] w-full rounded-xl" />
            ) : (
              <Card className="overflow-hidden border-border shadow-sm text-center">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-gray-800">
                      Incidents by Month
                    </CardTitle>
                    <CardDescription>
                      Monthly incident reports across all sites
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/10">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    +12%
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
            {loading ? (
              <Skeleton className="h-[400px] w-full rounded-xl" />
            ) : (
              <Card className="overflow-hidden border-border shadow-sm text-center">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className={"text-gray-800"}>
                      Users by SSIAP Level
                    </CardTitle>
                    <CardDescription>
                      Distribution of personnel by certification level
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/10">
                    <Users className="mr-1 h-3 w-3" />
                    87 Total
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

          <div className="grid gap-6 md:grid-cols-3 mt-6">
            {/* Profile Activity Card */}
            {loading ? (
              <Skeleton className="h-[400px] w-full rounded-xl" />
            ) : (
              <Card className="overflow-hidden border-border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className={"text-gray-800 text-center"}>
                      Recent Activity
                    </CardTitle>
                    <CardDescription className={"text-center"}>
                      Your latest security operations
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/10">
                    <Activity className="mr-1 h-3 w-3" />
                    Today
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Completed site inspection
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Approved new personnel
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Yesterday
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Incident report filed
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 days ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sites Pie Chart */}
            {loading ? (
              <Skeleton className="h-[400px] w-full rounded-xl md:col-span-2" />
            ) : (
              <Card className="overflow-hidden border-border shadow-sm md:col-span-2 text-center">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className={"text-gray-800"}>
                      Sites by Type
                    </CardTitle>
                    <CardDescription>
                      Distribution of security sites by category
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-primary/10">
                    <PieChartIcon className="mr-1 h-3 w-3" />
                    24 Sites
                  </Badge>
                </CardHeader>
                <CardContent>
                  <PieChart
                    data={chartData?.pieChart?.data || []}
                    colors={chartData?.pieChart?.colors || {}}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {loading ? (
            <Skeleton className="h-[400px] w-full rounded-xl mt-6" />
          ) : (
            <Card className="overflow-hidden border-border shadow-sm mt-6 text-center">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className={"text-gray-800"}>
                    Attendance Trends
                  </CardTitle>
                  <CardDescription>
                    Monthly attendance patterns across all sites
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

export default SIIIDashboard;
