import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Calendar,
  Clock,
  User,
  Users,
  Building,
} from "lucide-react";
import SsiApi from "../../../services/api/SsiApi";
import { useUserContext } from "../../../context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SSIAP_3_ASSIGNMENTS_ROUTE } from "../../../routes";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const EditShiftSsiii = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [teams, setTeams] = useState([]);
  const [sites, setSites] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: "",
    team_id: "",
    shift_date: "",
    shift_start_time: "",
    shift_end_time: "",
  });

  useEffect(() => {
    const fetchShift = async () => {
      try {
        const response = await SsiApi.getOneAssignment(id);
        const shift = response.data;

        // Convert ISO datetime to date and time parts
        const startDate = new Date(shift.shift_start);
        const endDate = new Date(shift.shift_end);

        setFormData({
          employee_id: shift.employee_id,
          team_id: shift.team_id,
          shift_date: format(startDate, "yyyy-MM-dd"),
          shift_start_time: format(startDate, "HH:mm"),
          shift_end_time: format(endDate, "HH:mm"),
        });
      } catch (err) {
        setError("Failed to load shift assignment");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await SsiApi.getAllUsers();
        // Check if response.data is an array or if it has a data property
        if (Array.isArray(response.data)) {
          setEmployees(response.data);
        } else if (response.data && Array.isArray(response.data.data)) {
          // If response.data.data is an array (paginated response)
          setEmployees(response.data.data);
        } else {
          console.error("Unexpected response format:", response);
          setEmployees([]);
        }
      } catch (err) {
        console.error("Failed to load employees", err);
        setEmployees([]);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await SsiApi.getTeams();
        setTeams(response.data);
      } catch (err) {
        console.error("Failed to load teams", err);
      }
    };

    const fetchSites = async () => {
      try {
        const response = await SsiApi.getSites();
        setSites(response.data);
      } catch (err) {
        console.error("Failed to load sites", err);
      }
    };

    fetchShift();
    fetchEmployees();
    fetchTeams();
    fetchSites();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Combine date and time fields
      const submissionData = {
        employee_id: formData.employee_id,
        team_id: formData.team_id,
        shift_start: `${formData.shift_date}T${formData.shift_start_time}:00`,
        shift_end: `${formData.shift_date}T${formData.shift_end_time}:00`,
      };

      await SsiApi.updateAssignment(id, submissionData);
      navigate(SSIAP_3_ASSIGNMENTS_ROUTE);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update shift assignment"
      );
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
              <div className="mt-2 h-1 w-16 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" />
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

  if (error && !formData.employee_id) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
        <div className="mt-6">
          <Link
            to={SSIAP_3_ASSIGNMENTS_ROUTE}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Shifts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Link
        to={SSIAP_3_ASSIGNMENTS_ROUTE}
        className="fixed bottom-6 left-6 bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-full shadow-md transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-700 tracking-tight">
              EDIT SHIFT ASSIGNMENT
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" />
            <p className="text-gray-600 text-sm mt-3">
              Update shift assignment details.
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User className="h-4 w-4 mr-1.5 text-gray-400" />
                  Employee
                </label>
                <Select
                  value={formData.employee_id}
                  onValueChange={(value) =>
                    handleSelectChange("employee_id", value)
                  }
                  required
                >
                  <SelectTrigger className="h-11 rounded-lg">
                    <SelectValue placeholder="Select Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem
                        key={employee.id}
                        value={employee.id.toString()}
                      >
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Users className="h-4 w-4 mr-1.5 text-gray-400" />
                  Team
                </label>
                <Select
                  value={formData.team_id}
                  onValueChange={(value) =>
                    handleSelectChange("team_id", value)
                  }
                  required
                >
                  <SelectTrigger className="h-11 rounded-lg">
                    <SelectValue placeholder="Select Team" />
                  </SelectTrigger>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team.id} value={team.id.toString()}>
                        {team.team_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                  Shift Date
                </label>
                <Input
                  type="date"
                  name="shift_date"
                  value={formData.shift_date}
                  onChange={handleChange}
                  className="h-11 rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
                    Start Time
                  </label>
                  <Input
                    type="time"
                    name="shift_start_time"
                    value={formData.shift_start_time}
                    onChange={handleChange}
                    className="h-11 rounded-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
                    End Time
                  </label>
                  <Input
                    type="time"
                    name="shift_end_time"
                    value={formData.shift_end_time}
                    onChange={handleChange}
                    className="h-11 rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between">
              <Link
                to={SSIAP_3_ASSIGNMENTS_ROUTE}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-4xl transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Shifts</span>
              </Link>

              <Button
                type="submit"
                disabled={submitting}
                className="text-white h-11 px-8 border hover:bg-sky-950 hover:border-sky-950 bg-sky-900 border-sky-900 hover:text-white font-medium rounded-4xl transition-colors duration-200 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    <span className="text-sm">Updating...</span>
                  </>
                ) : (
                  <span className="text-sm tracking-wide">UPDATE SHIFT</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditShiftSsiii;
