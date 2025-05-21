import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Filter,
  Search,
  User,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  X,
  Loader2,
  Building,
  Clock,
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
import { format } from "date-fns";

const VacationsII = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [vacationRequests, setVacationRequests] = useState([]);
  const [sites, setSites] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSite, setFilterSite] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [vacationResponse, sitesResponse, employeesResponse] =
          await Promise.all([
            SsiApi.getVacationRequests(),
            SsiApi.getSites(),
            SsiApi.getAllUsers(),
          ]);

        setVacationRequests(vacationResponse.data);
        setSites(sitesResponse.data);

        // Handle different response formats for employees
        if (Array.isArray(employeesResponse.data)) {
          setEmployees(employeesResponse.data);
        } else if (
          employeesResponse.data &&
          Array.isArray(employeesResponse.data.data)
        ) {
          // If response.data.data is an array (paginated response)
          setEmployees(employeesResponse.data.data);
        } else {
          console.error(
            "Unexpected employees response format:",
            employeesResponse
          );
          setEmployees([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load vacation requests. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteConfirm({ show: true, id });
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await SsiApi.deleteVacationRequest(deleteConfirm.id);
      setVacationRequests(
        vacationRequests.filter((request) => request.id !== deleteConfirm.id)
      );
      setDeleteConfirm({ show: false, id: null });
      setDeleteSuccess("Vacation request deleted successfully");
      setIsDeleting(false);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setDeleteSuccess(null);
      }, 3000);
    } catch (err) {
      console.error("Error deleting vacation request:", err);
      setDeleteError("Failed to delete vacation request. Please try again.");
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, id: null });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await SsiApi.updateVacationRequest(id, {
        status: newStatus,
      });
      setVacationRequests(
        vacationRequests.map((request) =>
          request.id === id ? response.data : request
        )
      );
    } catch (err) {
      console.error("Error updating vacation request status:", err);
      setError("Failed to update status. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (e) {
      return dateString;
    }
  };

  const getEmployeeName = (employeeId) => {
    if (!Array.isArray(employees)) {
      console.error("employees is not an array:", employees);
      return "Unknown";
    }

    const employee = employees.find((emp) => emp.id === employeeId);
    return employee ? employee.name : "Unknown";
  };

  const getSiteName = (siteId) => {
    if (!Array.isArray(sites)) {
      console.error("sites is not an array:", sites);
      return "Unknown";
    }

    const site = sites.find((site) => site.id === siteId);
    // Check for site_name property (from database) instead of name
    return site ? site.site_name : "Unknown";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-700 bg-green-50 border-green-200";
      case "Denied":
        return "text-red-700 bg-red-50 border-red-200";
      case "Pending":
      default:
        return "text-amber-700 bg-amber-50 border-amber-200";
    }
  };

  const filteredVacationRequests = vacationRequests.filter((request) => {
    const employeeName = getEmployeeName(request.employee_id).toLowerCase();
    const searchMatch =
      searchTerm === "" || employeeName.includes(searchTerm.toLowerCase());

    const siteMatch =
      filterSite === "all" ||
      (request.employee && request.employee.site_id === parseInt(filterSite));

    const statusMatch =
      filterStatus === "all" || request.status === filterStatus;

    return searchMatch && siteMatch && statusMatch;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {deleteConfirm.show && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4 animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this vacation request? This
                action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-4xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-4xl transition-colors flex items-center cursor-pointer"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{deleteSuccess}</span>
          </div>
          <button
            onClick={() => setDeleteSuccess(null)}
            className="text-green-800 hover:text-green-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {deleteError && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{deleteError}</span>
          </div>
          <button
            onClick={() => setDeleteError(null)}
            className="text-red-800 hover:text-red-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-gray-700 tracking-tight">
              VACATION REQUESTS
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" />
            <p className="text-gray-600 text-sm mt-3">
              Manage vacation requests across all sites
            </p>
          </div>
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by employee name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-full md:w-40">
                <Select value={filterSite} onValueChange={setFilterSite}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="truncate">
                        {filterSite === "all"
                          ? "All Sites"
                          : getSiteName(parseInt(filterSite))}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sites</SelectItem>
                    {Array.isArray(sites) &&
                      sites.map((site) => (
                        <SelectItem key={site.id} value={site.id.toString()}>
                          {site.site_name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-40">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center">
                      <Filter className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="truncate">
                        {filterStatus === "all" ? "All Statuses" : filterStatus}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Denied">Denied</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setFilterSite("all");
                  setFilterStatus("all");
                }}
                variant="outline"
                className="px-3"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
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
          ) : error ? (
            <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          ) : filteredVacationRequests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No vacation requests found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVacationRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {getEmployeeName(request.employee_id)}
                        </h3>
                        <p className="text-sm text-gray-700 mt-1">
                          {formatDate(request.start_date)} -{" "}
                          {formatDate(request.end_date)}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(
                              request.status
                            )}`}
                          >
                            {request.status}
                          </span>
                        </div>

                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          Assigned to:{" "}
                          {request.assigned_to
                            ? getEmployeeName(request.assigned_to)
                            : "Unassigned"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <Building className="h-3 w-3 mr-1" />
                          Site:{" "}
                          {request.employee?.site_id
                            ? getSiteName(request.employee.site_id)
                            : "Unknown"}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {request.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(request.id, "Approved")
                            }
                            className="p-1.5 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                            title="Approve"
                          >
                            <span className="text-xs font-medium">Approve</span>
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(request.id, "Denied")
                            }
                            className="p-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                            title="Deny"
                          >
                            <span className="text-xs font-medium">Deny</span>
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteClick(request.id)}
                        className="p-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
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

export default VacationsII;
