import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Building,
  Search,
  MapPin,
  Clock,
  AlertCircle,
  X,
  Home,
  Store,
  Building2,
  Hospital,
  Edit,
  Trash2,
  Loader2,
  MapPinPlus,
} from "lucide-react";
import SsiApi from "../../../services/api/SsiApi";
import { useUserContext } from "../../../context/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SitesAnalytics from "../../partials/SitesAnalytics";
import {
  SSIAP_2_ADD_SITE_ROUTE,
  SSIAP_2_EDIT_SITE_ROUTE,
} from "../../../routes";

const SitesDetailsSsii = () => {
  const { user } = useUserContext();
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true);
        const response = await SsiApi.getSites();
        // Show all sites for SSIAP-2, not just the ones they manage
        setSites(response.data);
      } catch (err) {
        setError("Failed to load sites");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getSiteTypeIcon = (type) => {
    switch (type) {
      case "Hospital":
        return <Hospital className="h-5 w-5 text-blue-600" />;
      case "Mall":
        return <Store className="h-5 w-5 text-amber-600" />;
      case "Office":
        return <Building2 className="h-5 w-5 text-green-600" />;
      default:
        return <Home className="h-5 w-5 text-purple-600" />;
    }
  };

  const getSiteTypeColor = (type) => {
    switch (type) {
      case "Hospital":
        return "text-blue-600 bg-blue-50 border-blue-100";
      case "Mall":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "Office":
        return "text-green-600 bg-green-50 border-green-100";
      default:
        return "text-purple-600 bg-purple-50 border-purple-100";
    }
  };

  const handleDeleteConfirm = (id) => {
    setDeleteConfirm({ show: true, id });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, id: null });
  };

  const handleDeleteSite = async () => {
    try {
      setIsDeleting(true);
      await SsiApi.deleteSite(deleteConfirm.id);
      setSites(sites.filter((site) => site.id !== deleteConfirm.id));
      setDeleteSuccess("Site deleted successfully");
      setDeleteConfirm({ show: false, id: null });
    } catch (err) {
      setError("Failed to delete site");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredSites = sites.filter((site) => {
    // Apply search filter
    const matchesSearch =
      site.site_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.address.toLowerCase().includes(searchTerm.toLowerCase());

    // Apply type filter
    const matchesType =
      filterType === "all" ||
      site.site_type.toLowerCase() === filterType.toLowerCase();

    return matchesSearch && matchesType;
  });

  // Identify if a site is the user's assigned site
  const isUserSite = (siteId) => {
    return user?.site_id === siteId;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-gray-700 tracking-tight">
              YOUR ASSIGNED SITE
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" />
            <p className="text-gray-600 text-sm mt-3">
              The security site you are assigned to
            </p>
          </div>
        </div>

        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            {loading ? (
              <div className="space-y-4">
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex items-start">
                    <div className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 rounded-full bg-gray-200" />
                    <div>
                      <Skeleton className="h-5 w-36 mb-2" />
                      <Skeleton className="h-4 w-64 mb-2" />
                      <Skeleton className="h-3 w-24 mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            ) : user?.site_id ? (
              <div className="space-y-4">
                {sites
                  .filter((site) => site.id === user.site_id)
                  .map((site) => (
                    <div
                      key={site.id}
                      className="p-4 border-2 border-blue-200 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <Building className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {site.site_name}
                            </h3>
                            <p className="text-sm text-gray-700 mt-1 flex items-center">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
                              {site.address}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span
                                className={`text-xs px-2.5 py-1 rounded-full border ${getSiteTypeColor(
                                  site.site_type
                                )}`}
                              >
                                {site.site_type}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Link
                            to={SSIAP_2_EDIT_SITE_ROUTE.replace(":id", site.id)}
                            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                            onClick={() => handleDeleteConfirm(site.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Building className="h-12 w-12 text-blue-200 mx-auto mb-3" />
                <p className="text-gray-500">
                  You are not assigned to any site yet
                </p>
              </div>
            )}
          </div>

          <div className="md:w-1/2">
            <SitesAnalytics />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-sky-50 to-white p-6 border-b border-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-700 tracking-tight">
              ALL SITES
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
            <p className="text-gray-600 text-sm mt-3">
              View and manage all security sites in the system
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 mx-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search sites..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hospital">Hospital</SelectItem>
                <SelectItem value="mall">Mall</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Link
            to={SSIAP_2_ADD_SITE_ROUTE}
            className="items-center bg-sky-900 text-white hover:bg-sky-950 transition-colors duration-150 py-2.5 px-4 text-[16px] rounded-4xl cursor-pointer border-0 outline-0 inline-flex justify-center align-center"
          >
            <MapPinPlus className="h-4 w-4 mr-2" />
            Add Site
          </Link>
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
          ) : filteredSites.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No sites found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSites.map((site) => (
                <div
                  key={site.id}
                  className={`p-4 border ${
                    isUserSite(site.id)
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-100"
                  } rounded-lg hover:bg-gray-50 transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="mt-0.5 mr-3 flex-shrink-0">
                        {getSiteTypeIcon(site.site_type)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">
                            {site.site_name}
                          </h3>
                          {isUserSite(site.id) && (
                            <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                              Your Site
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mt-1 flex items-center">
                          <MapPin className="h-3.5 w-3.5 mr-1 text-gray-500" />
                          {site.address}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full border ${getSiteTypeColor(
                              site.site_type
                            )}`}
                          >
                            {site.site_type}
                          </span>
                        </div>
                        {site.created_at && (
                          <p className="text-xs text-gray-500 mt-2 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Added on {formatDate(site.created_at)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Link
                        to={SSIAP_2_EDIT_SITE_ROUTE.replace(":id", site.id)}
                        className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                        onClick={() => handleDeleteConfirm(site.id)}
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
                Are you sure you want to delete this site? This action cannot be
                undone.
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
                onClick={handleDeleteSite}
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

export default SitesDetailsSsii;