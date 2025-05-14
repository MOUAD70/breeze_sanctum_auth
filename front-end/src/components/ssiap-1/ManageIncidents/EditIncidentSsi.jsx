import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, AlertTriangle, MapPin } from "lucide-react";
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
import { SSIAP_1_INCIDENTS_ROUTE } from "../../../routes";
import { Skeleton } from "@/components/ui/skeleton";

const EditIncidentSsi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [sites, setSites] = useState([]);
  const [loadingSites, setLoadingSites] = useState(false);
  const [formData, setFormData] = useState({
    site_id: "",
    incident_type: "",
    severity: "",
    description: "",
    status: "",
    location: "",
  });

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await SsiApi.getOneIncident(id);
        const incident = response.data;

        // Check if user can edit this incident
        if (user.ssiap_level === 1 && incident.reported_by !== user.id) {
          setError("You can only edit incidents you reported");
          return;
        }

        if (user.ssiap_level < 3 && incident.site_id !== user.site_id) {
          setError("You cannot edit incidents from other sites");
          return;
        }

        setFormData({
          site_id: incident.site_id,
          incident_type: incident.incident_type,
          severity: incident.severity,
          description: incident.description,
          status: incident.status,
          location: incident.location || "",
        });
      } catch (err) {
        setError("Failed to load incident");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

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

    fetchIncident();
    fetchSites();
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await SsiApi.updateIncident(id, formData);
      navigate(SSIAP_1_INCIDENTS_ROUTE);
    } catch (err) {
      setError("Failed to update incident");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
            <div className="flex flex-col items-center justify-center">
              <Skeleton className="h-8 w-48 mb-2" />
              <div className="mt-2 h-1 w-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
              <Skeleton className="h-4 w-64 mt-3" />
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
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

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
        <div className="mt-6">
          <Link
            to={SSIAP_1_INCIDENTS_ROUTE}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Incidents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Link
        to={SSIAP_1_INCIDENTS_ROUTE}
        className="fixed bottom-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full shadow-md transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-700 tracking-tight">
              EDIT INCIDENT
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
            <p className="text-gray-600 text-sm mt-3">
              Update incident details and status.
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

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Incident Type
              </label>
              <Input
                name="incident_type"
                value={formData.incident_type}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                <MapPin className="h-4 w-4 inline mr-1" />
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
                rows={5}
                className="bg-white border-gray-300 text-gray-900 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
              />
            </div>
          </form>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
          <Link
            to={SSIAP_1_INCIDENTS_ROUTE}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-4xl transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Incidents</span>
          </Link>

          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="text-white h-11 px-8 border hover:bg-sky-950 hover:border-sky-950 bg-sky-900 border-sky-900 hover:text-white font-medium rounded-4xl transition-colors duration-200 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                <span className="text-sm">Updating...</span>
              </>
            ) : (
              <span className="text-sm tracking-wide">UPDATE INCIDENT</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditIncidentSsi;
