import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Filter,
  Search,
  Calendar,
  User,
  Clock,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  X,
  Loader2,
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
import {
  SSIAP_2_ADD_INCIDENTS_ROUTE,
  SSIAP_2_EDIT_INCIDENTS_ROUTE,
} from "../../../routes";
import { Link } from "react-router-dom";

const IncidentsDetailsSsii = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        const response = await SsiApi.getIncidents();
        // For SSIAP-2, we only show incidents from their site
        const siteIncidents = response.data.filter(
          (incident) => incident.site_id === user?.site_id
        );
        setIncidents(siteIncidents);
      } catch (err) {
        setError("Failed to load incidents");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const formatDate = (dateString) => {
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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "text-red-600 bg-red-50 border-red-100";
      case "Medium":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "Low":
        return "text-blue-600 bg-blue-50 border-blue-100";
      default:
        return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "text-green-600 bg-green-50 border-green-100";
      case "In Progress":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "Pending":
        return "text-blue-600 bg-blue-50 border-blue-100";
      default:
        return "text-gray-600 bg-gray-50 border-gray-100";
    }
  };

  // SSIAP-2 can modify all incidents from their site
  const canModifyIncident = (incident) => {
    return incident.site_id === user?.site_id;
  };

  const handleDeleteConfirm = (id) => {
    setDeleteConfirm({ show: true, id });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, id: null });
  };

  const handleDeleteIncident = async () => {
    if (!deleteConfirm.id) return;

    setIsDeleting(true);
    try {
      await SsiApi.deleteIncident(deleteConfirm.id);
      setIncidents(
        incidents.filter((incident) => incident.id !== deleteConfirm.id)
      );

      setDeleteSuccess("Incident deleted successfully");
      setTimeout(() => setDeleteSuccess(null), 3000);
    } catch (err) {
      setDeleteError(
        err.response?.data?.message || "Failed to delete incident"
      );
      setTimeout(() => setDeleteError(null), 5000);
    } finally {
      setIsDeleting(false);
      setDeleteConfirm({ show: false, id: null });
    }
  };

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch = incident.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || incident.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
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
              SITE INCIDENTS
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" />
            <p className="text-gray-600 text-sm mt-3">
              Manage all incidents at your site
            </p>
          </div>
        </div>

        <div className="flex justify-end mx-6 mt-4">
          <Link
            to={SSIAP_2_ADD_INCIDENTS_ROUTE}
            className="items-center bg-sky-900 text-white hover:bg-sky-950 transition-colors duration-150 py-2.5 px-4 text-[16px] rounded-4xl cursor-pointer border-0 outline-0 inline-flex justify-center align-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Report An Incident
          </Link>
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
              <Input
                className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-10 focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative group">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-10 focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-100 rounded-lg bg-gray-50"
                >
                  <div className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 rounded-full bg-gray-200" />
                    <div>
                      <Skeleton className="h-5 w-36 mb-2" />
                      <Skeleton className="h-4 w-64 mb-2" />
                      <div className="flex gap-2 mt-2">
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                      <Skeleton className="h-3 w-24 mt-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          ) : filteredIncidents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No incidents found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {incident.incident_type}
                        </h3>
                        <p className="text-sm text-gray-700 mt-1">
                          {incident.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border ${getSeverityColor(
                              incident.severity
                            )}`}
                          >
                            {incident.severity}
                          </span>
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border ${getStatusColor(
                              incident.status
                            )}`}
                          >
                            {incident.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(incident.created_at)}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          Reported by: {incident.reporter?.name || "Unknown"}
                        </p>
                      </div>
                    </div>
                    {canModifyIncident(incident) && (
                      <div className="flex">
                        <Link
                          to={SSIAP_2_EDIT_INCIDENTS_ROUTE.replace(
                            ":id",
                            incident.id
                          )}
                          className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                          onClick={() => handleDeleteConfirm(incident.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
                Are you sure you want to delete this incident? This action
                cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-4xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteIncident}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-4xl transition-colors flex items-center cursor-pointer"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentsDetailsSsii;