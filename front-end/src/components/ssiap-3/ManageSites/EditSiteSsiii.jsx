import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AlertTriangle,
  ArrowLeft,
  Building,
  MapPin,
  Loader2,
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
import { SSIAP_3_SITES_ROUTE } from "../../../routes";
import { Skeleton } from "@/components/ui/skeleton";

const EditSiteSsiii = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    site_name: "",
    site_type: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    const fetchSite = async () => {
      try {
        setLoading(true);
        console.log("Fetching site with ID:", id);
        // Change getSite to getOneSite to match the method in SsiApi.js
        const response = await SsiApi.getOneSite(id);
        console.log("Site data received:", response.data);

        if (!response.data) {
          throw new Error("No site data received");
        }

        const site = response.data;

        setFormData({
          site_name: site.site_name || "",
          site_type: site.site_type || "",
          address: site.address || "",
          description: site.description || "",
        });
      } catch (err) {
        console.error("Error fetching site:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load site details. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSite();
    } else {
      setError("No site ID provided");
      setLoading(false);
    }
  }, [id]);

  // Let's check if we have the SsiApi methods properly implemented
  useEffect(() => {
    console.log("Available SsiApi methods:", Object.keys(SsiApi));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      console.log("Submitting form data:", formData);
      const response = await SsiApi.updateSite(id, formData);
      console.log("Site updated successfully:", response.data);
      setSuccess(true);

      // Redirect after short delay to show success message
      setTimeout(() => {
        navigate(SSIAP_3_SITES_ROUTE);
      }, 1500);
    } catch (err) {
      console.error("Error updating site:", err);
      setError(
        err.response?.data?.message ||
          (err.response?.data?.errors
            ? Object.values(err.response.data.errors).flat()[0]
            : "Failed to update site. Please try again.")
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Let's check if we have the SsiApi.getSite method properly implemented
  useEffect(() => {
    console.log("Available SsiApi methods:", Object.keys(SsiApi));
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
            <div className="flex flex-col items-center justify-center">
              <Skeleton className="h-8 w-48 mb-2" />
              <div className="mt-2 h-1 w-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
              <Skeleton className="h-4 w-64 mt-3" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-11 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !formData.site_name) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
        <div className="mt-6">
          <Link
            to={SSIAP_3_SITES_ROUTE}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Sites
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Link
        to={SSIAP_3_SITES_ROUTE}
        className="fixed bottom-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full shadow-md transition-colors duration-200 z-10"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-700 tracking-tight">
              EDIT SITE
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
            <p className="text-gray-600 text-sm mt-3">
              Update site information for security monitoring.
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
              Site updated successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                <Building className="h-4 w-4 inline mx-1 mb-1" />
                Site Name
              </label>
              <Input
                name="site_name"
                value={formData.site_name}
                onChange={handleChange}
                required
                placeholder="Enter site name"
                className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Site Type
              </label>
              <Select
                value={formData.site_type}
                onValueChange={(value) =>
                  handleSelectChange("site_type", value)
                }
                required
              >
                <SelectTrigger className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors">
                  <SelectValue placeholder="Select site type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hospital">Hospital</SelectItem>
                  <SelectItem value="Mall">Mall</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                <MapPin className="h-4 w-4 inline mx-1 mb-1" />
                Address
              </label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter full address"
                rows={3}
                className="bg-white border-gray-300 text-gray-900 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description (Optional)
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter site description"
                rows={3}
                className="bg-white border-gray-300 text-gray-900 rounded-lg focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
              />
            </div>
          </form>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
          <Link
            to={SSIAP_3_SITES_ROUTE}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-4xl transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sites</span>
          </Link>

          <Button
            onClick={handleSubmit}
            disabled={submitting || success}
            className="text-white h-11 px-8 border hover:bg-sky-950 hover:border-sky-950 bg-sky-900 border-sky-900 hover:text-white font-medium rounded-4xl transition-colors duration-200 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                <span className="text-sm">Updating...</span>
              </>
            ) : (
              <span className="text-sm tracking-wide">UPDATE SITE</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditSiteSsiii;
