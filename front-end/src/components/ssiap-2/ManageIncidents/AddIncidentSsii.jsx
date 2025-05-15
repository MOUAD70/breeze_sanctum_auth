import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Clock,
  Loader2,
  MapPin,
} from "lucide-react";
import SsiApi from "../../../services/api/SsiApi";
import { useUserContext } from "../../../context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SSIAP_2_INCIDENTS_ROUTE } from "../../../routes";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const AddIncidentSsii = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [sites, setSites] = useState([]);
  const [loadingSites, setLoadingSites] = useState(false);
  const [formData, setFormData] = useState({
    site_id: user?.site_id || "",
    incident_type: "",
    severity: "",
    description: "",
    status: "Pending",
    location: "",
    incident_date: format(new Date(), "yyyy-MM-dd"),
    incident_time: format(new Date(), "HH:mm"),
    reported_by: user?.id || "",
  });

  useEffect(() => {
    // Set user-related fields when user context is available
    if (user) {
      setFormData((prev) => ({
        ...prev,
        site_id: user.site_id,
        reported_by: user.id,
      }));
    }

    // Fetch sites for location dropdown
    const fetchSites = async () => {
      setLoadingSites(true);
      try {
        const response = await SsiApi.getSites();
        setSites(response.data);
      } catch (err) {
        console.error("Failed to load sites", err);
      } finally {
        setLoadingSites(false);
      }
    };

    fetchSites();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Combine date and time fields
      const submissionData = {
        ...formData,
        incident_datetime: `${formData.incident_date}T${formData.incident_time}:00`,
      };

      // Remove separate date and time fields
      delete submissionData.incident_date;
      delete submissionData.incident_time;

      await SsiApi.createIncident(submissionData);
      setSuccess(true);

      // Redirect after short delay to show success message
      setTimeout(() => {
        navigate(SSIAP_2_INCIDENTS_ROUTE);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create incident");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
            <div className="flex flex-col items-center justify-center">
              <Skeleton className="h-8 w-48 mb-2" />
              <div className="mt-2 h-1 w-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
              <Skeleton className="h-4 w-64 mt-3" />
            </div>
          </div>

          {/* Skeleton for potential form error message */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
            <Skeleton className="h-5 w-full max-w-md" />
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <div className="relative group">
                    <Skeleton className="h-11 w-full rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
            <Skeleton className="h-10 w-40 rounded-4xl" />
            <Skeleton className="h-10 w-40 rounded-4xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Link
        to={SSIAP_2_INCIDENTS_ROUTE}
        className="fixed bottom-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full shadow-md transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-700 tracking-tight">
              REPORT NEW INCIDENT
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
            <p className="text-gray-600 text-sm mt-3">
              Create a new incident report for your site.
            </p>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              <AlertTriangle className="h-4 w-4 inline mr-2" />
              {error}
            </div>
          )}

          {success && (
            <div className="p-4 mb-6 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              Incident reported successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Incident Type
              </label>
              <Input
                name="incident_type"
                value={formData.incident_type}
                onChange={handleChange}
                required
                placeholder="E.g., Fire Alarm, Security Breach, etc."
                className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  <Calendar className="h-4 w-4 inline mx-1 mb-1" />
                  Incident Date
                </label>
                <Input
                  type="date"
                  name="incident_date"
                  value={formData.incident_date}
                  onChange={handleChange}
                  required
                  className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  <Clock className="h-4 w-4 inline mx-1 mb-1" />
                  Incident Time
                </label>
                <Input
                  type="time"
                  name="incident_time"
                  value={formData.incident_time}
                  onChange={handleChange}
                  required
                  className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                <MapPin className="h-4 w-4 inline mx-1 mb-1" />
                Location
              </label>
              {loadingSites ? (
                <div className="bg-white border-gray-300 h-11 text-gray-500 rounded-lg flex items-center px-3">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Loading locations...
                </div>
              ) : (
                <Select
                  value={formData.location}
                  onValueChange={(value) =>
                    handleSelectChange("location", value)
                  }
                  required
                >
                  <SelectTrigger className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {sites.map((site) => (
                      <SelectItem key={site.id} value={site.site_name}>
                        {site.site_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Severity
                </label>
                <Select
                  value={formData.severity}
                  onValueChange={(value) =>
                    handleSelectChange("severity", value)
                  }
                  required
                >
                  <SelectTrigger className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors">
                    <SelectValue placeholder="Select severity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange("status", value)}
                  required
                >
                  <SelectTrigger className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Provide detailed information about the incident"
                rows={5}
                className="bg-white border-gray-300 text-gray-900 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
              />
            </div>
            <input type="hidden" name="site_id" value={formData.site_id} />
            <input
              type="hidden"
              name="reported_by"
              value={formData.reported_by}
            />
          </form>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
          <Link
            to={SSIAP_2_INCIDENTS_ROUTE}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-4xl transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Incidents</span>
          </Link>

          <Button
            onClick={handleSubmit}
            disabled={loading || success}
            className="text-white h-11 px-8 border hover:bg-sky-950 hover:border-sky-950 bg-sky-900 border-sky-900 hover:text-white font-medium rounded-4xl transition-colors duration-200 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                <span className="text-sm">Submitting...</span>
              </>
            ) : (
              <span className="text-sm tracking-wide">SUBMIT INCIDENT</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddIncidentSsii;
