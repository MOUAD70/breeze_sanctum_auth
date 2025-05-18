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
  Building,
  Users,
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
  SSIAP_2_ADD_ASSIGNMENT_ROUTE,
  SSIAP_2_EDIT_ASSIGNMENT_ROUTE,
} from "../../../routes";
import { Link } from "react-router-dom";

const ShiftDetailsSsii = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [assignments, setAssignments] = useState([]);
  const [sites, setSites] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSite, setFilterSite] = useState("all");
  const [filterTeam, setFilterTeam] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });
  const [deleteSuccess, setDeleteSuccess] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await SsiApi.getAllAssignments();
        setAssignments(response.data);
      } catch (err) {
        setError("Failed to load shift assignments");
        console.error(err);
      } finally {
        setLoading(false);
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

    const fetchTeams = async () => {
      try {
        const response = await SsiApi.getTeams();
        setTeams(response.data);
      } catch (err) {
        console.error("Failed to load teams", err);
      }
    };

    fetchAssignments();
    fetchSites();
    fetchTeams();
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

  const getSiteName = (siteId) => {
    const site = sites.find((site) => site.id === siteId);
    return site ? site.site_name : "Unknown Site";
  };

  const getTeamName = (teamId) => {
    const team = teams.find((team) => team.id === teamId);
    return team ? team.team_name : "Unknown Team";
  };

  const handleDeleteConfirm = (id) => {
    setDeleteConfirm({ show: true, id });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, id: null });
  };

  const handleDelete = async () => {
    try {
      await SsiApi.deleteAssignment(deleteConfirm.id);
      setAssignments(assignments.filter((a) => a.id !== deleteConfirm.id));
      setDeleteSuccess("Shift assignment deleted successfully");
      setDeleteConfirm({ show: false, id: null });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setDeleteSuccess(null);
      }, 3000);
    } catch (err) {
      setError("Failed to delete shift assignment");
      console.error(err);
      setDeleteConfirm({ show: false, id: null });
    }
  };

  const filteredAssignments = assignments.filter((assignment) => {
    // Filter by search term (employee name or team name)
    const matchesSearch =
      assignment.employee?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      assignment.team?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by site
    const matchesSite =
      filterSite === "all" ||
      assignment.employee?.site_id === parseInt(filterSite);

    // Filter by team
    const matchesTeam =
      filterTeam === "all" || assignment.team_id === parseInt(filterTeam);

    return matchesSearch && matchesSite && matchesTeam;
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

      {deleteConfirm.show && (
        <div className="fixed -inset-8 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4 animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this shift assignment? This
                action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-4xl transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-4xl transition-colors duration-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-gray-700 tracking-tight">
              ALL SHIFT ASSIGNMENTS
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" />
            <p className="text-gray-600 text-sm mt-3">
              Manage all shift assignments across all sites
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by employee or team..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filterSite} onValueChange={setFilterSite}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Filter by site" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sites</SelectItem>
                  {sites.map((site) => (
                    <SelectItem key={site.id} value={site.id.toString()}>
                      {site.site_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterTeam} onValueChange={setFilterTeam}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <SelectValue placeholder="Filter by team" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id.toString()}>
                      {team.team_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <Link to={SSIAP_2_ADD_ASSIGNMENT_ROUTE}>
              <button className="items-center bg-sky-900 text-white hover:bg-sky-950 transition-colors duration-150 py-2.5 px-4 text-[16px] rounded-4xl cursor-pointer border-0 outline-0 inline-flex justify-center align-center">
                <Plus className="h-4 w-4 mr-2" />
                Add New Assignment
              </button>
            </Link>
          </div>

          {/* Replace the existing assignments display with this new grid layout */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="p-4 border border-gray-100 rounded-lg">
                  <Skeleton className="h-5 w-36 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex gap-2 mb-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-32" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              <AlertTriangle className="h-5 w-5 inline mr-2" />
              {error}
            </div>
          ) : filteredAssignments.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Shift Assignments Found
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {searchTerm || filterSite !== "all" || filterTeam !== "all"
                  ? "Try adjusting your filters"
                  : "Start by adding a new shift assignment"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="p-4 border border-gray-100 hover:border-blue-200 rounded-lg transition-colors duration-200 bg-white hover:bg-blue-50 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="font-medium text-gray-900 truncate max-w-[150px]">
                        {assignment.employee?.name || "Unknown Employee"}
                      </h3>
                    </div>
                    <div className="flex space-x-1">
                      <Link
                        to={SSIAP_2_EDIT_ASSIGNMENT_ROUTE.replace(
                          ":id",
                          assignment.id
                        )}
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteConfirm(assignment.id)}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Shift timing - more prominent but refined */}
                  <div className="mb-3 p-2.5 bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 rounded-md">
                    <div className="flex items-center text-blue-700 mb-1.5">
                      <Calendar className="h-4 w-4 mr-1.5 text-blue-500" />
                      <span className="font-sm">
                        {new Date(assignment.shift_start).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1.5 text-blue-500" />
                        <span className="text-blue-800 font-medium">
                          {new Date(assignment.shift_start).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center px-2">
                        <div className="h-0.5 w-4 bg-blue-300 rounded-full"></div>
                        <div className="h-2 w-2 bg-blue-400 rounded-full mx-1"></div>
                        <div className="h-0.5 w-4 bg-blue-300 rounded-full"></div>
                      </div>
                      <div>
                        <span className="text-blue-800 font-medium">
                          {new Date(assignment.shift_end).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-2">
                    <Building className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                    <span className="text-sm text-gray-600 truncate">
                      {getSiteName(assignment.employee?.site_id)}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Users className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                    <span className="text-sm text-gray-600 truncate">
                      {getTeamName(assignment.team_id)}
                    </span>
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

export default ShiftDetailsSsii;
