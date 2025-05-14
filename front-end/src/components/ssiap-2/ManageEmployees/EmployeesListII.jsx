import { useEffect, useState } from "react";
import {
  User,
  Shield,
  Mail,
  Phone,
  BadgeCheck,
  MoreVertical,
  UserPlus,
  Trash2,
  Pencil,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import SsiApi from "../../../services/api/SsiApi";
import { Link } from "react-router-dom";
import {
  SSIAP_2_ADD_EMPLOYEE_ROUTE,
  SSIAP_2_EDIT_EMPLOYEE_ROUTE,
} from "../../../routes";
import { useUserContext } from "../../../context/UserContext";
import { Skeleton } from "@/components/ui/skeleton";

const EmployeesListII = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChangingPage, setIsChangingPage] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    total: 0,
    perPage: 10,
    lastPage: 1,
    ssiap1Count: 0,
    ssiap2Count: 0,
  });
  const { user: currentUser } = useUserContext();
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });
  const [deleteError, setDeleteError] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setIsChangingPage(true);
        const response = await SsiApi.getAllUsers({
          page: pagination.currentPage,
          per_page: pagination.perPage,
        });

        setEmployees(response.data.data);
        setPagination({
          currentPage: response.data.current_page,
          total: response.data.total,
          perPage: response.data.per_page,
          lastPage: response.data.last_page,
          ssiap1Count: response.data.ssiap1_count,
          ssiap2Count: response.data.ssiap2_count,
        });
      } catch (err) {
        setError(err.message || "Failed to fetch employees");
      } finally {
        setLoading(false);
        setIsChangingPage(false);
      }
    };

    fetchEmployees();
  }, [pagination.currentPage]);

  const handleDeleteConfirm = (id) => {
    setDeleteConfirm({ show: true, id });
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, id: null });
  };

  const handleDeleteEmployee = async () => {
    if (!deleteConfirm.id) return;

    setIsDeleting(true);
    try {
      await SsiApi.deleteUser(deleteConfirm.id);
      setEmployees(employees.filter((emp) => emp.id !== deleteConfirm.id));
      setPagination((prev) => ({
        ...prev,
        total: prev.total - 1,
        ssiap1Count:
          employees.find((emp) => emp.id === deleteConfirm.id)?.ssiap_level ===
          1
            ? prev.ssiap1Count - 1
            : prev.ssiap1Count,
      }));

      setDeleteSuccess("Employee deleted successfully");
      setTimeout(() => setDeleteSuccess(null), 3000);
    } catch (err) {
      setDeleteError(
        err.response?.data?.message || "Failed to delete employee"
      );
      setTimeout(() => setDeleteError(null), 5000);
    } finally {
      setIsDeleting(false);
      setDeleteConfirm({ show: false, id: null });
    }
  };

  const getCertificationColor = (level) => {
    switch (level) {
      case 1:
        return "text-sky-600";
      case 2:
        return "text-blue-600";
      case 3:
        return "text-emerald-600";
      default:
        return "text-gray-600";
    }
  };

  const getCertificationText = (level) => `SSIAP${level}`;

  const handlePrevious = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const handleNext = () => {
    if (pagination.currentPage < pagination.lastPage) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  if (loading && !isChangingPage) {
    return <div className="min-h-screen bg-white px-6">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-white px-6">Error: {error}</div>;
  }

  const firstItem = (pagination.currentPage - 1) * pagination.perPage + 1;
  const lastItem = Math.min(
    pagination.currentPage * pagination.perPage,
    pagination.total
  );

  return (
    <div className="min-h-screen bg-white px-6 py-6">
      {deleteSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <BadgeCheck className="h-5 w-5 mr-2" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {loading ? (
          <>
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-16 mt-2" />
                  </div>
                  <Skeleton className="h-11 w-11 rounded-lg" />
                </div>
                <Skeleton className="mt-4 h-1 w-full rounded-full" />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Employees
                  </p>
                  <p className="text-2xl font-semibold text-gray-800 mt-1 group-hover:text-sky-700 transition-colors">
                    {pagination.total}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-sky-50 group-hover:bg-sky-100 transition-colors">
                  <User className="h-5 w-5 text-sky-600" />
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    SSIAP1 Certified
                  </p>
                  <p className="text-2xl font-semibold text-gray-800 mt-1 group-hover:text-purple-700 transition-colors">
                    {pagination.ssiap1Count}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      pagination.total > 0
                        ? Math.min(
                            100,
                            (pagination.ssiap1Count / pagination.total) * 100
                          )
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-end mb-4">
        <Link
          to={SSIAP_2_ADD_EMPLOYEE_ROUTE}
          className="items-center bg-sky-900 text-white hover:bg-sky-950 transition-colors duration-150 py-2.5 px-4 text-[16px] rounded-4xl cursor-pointer border-0 outline-0 inline-flex justify-center align-center"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Employee
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-sky-100 to-sky-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Certification
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-sky-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-sky-900" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name?.toUpperCase()}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {employee.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {employee.email || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {employee.phone_number || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Shield
                        className={`h-4 w-4 mr-2 ${getCertificationColor(
                          employee.ssiap_level
                        )}`}
                      />
                      <span className="text-sm text-gray-900">
                        {getCertificationText(employee.ssiap_level)}
                      </span>
                      {employee.ssiap_level > 0 && (
                        <BadgeCheck className="h-4 w-4 ml-2 text-green-500" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Member since{" "}
                      {new Date(employee.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end">
                      {currentUser &&
                        currentUser.ssiap_level === 2 &&
                        employee.ssiap_level === 1 && (
                          <>
                            <Link
                              to={SSIAP_2_EDIT_EMPLOYEE_ROUTE.replace(
                                ":id",
                                employee.id
                              )}
                              className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                              title="Edit employee"
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>

                            <button
                              onClick={() => handleDeleteConfirm(employee.id)}
                              className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                              title="Delete employee"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      {(!currentUser ||
                        currentUser.ssiap_level !== 2 ||
                        employee.ssiap_level !== 1) && (
                        <button
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          aria-label="More options"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {employees.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <div>
          Showing {employees.length > 0 ? firstItem : 0} to {lastItem} of{" "}
          {pagination.total} employees
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            disabled={pagination.currentPage === 1}
            className={`px-3 py-1 rounded cursor-pointer ${
              pagination.currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>
          <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded cursor-pointer">
            {pagination.currentPage}
          </span>
          <button
            onClick={handleNext}
            disabled={pagination.currentPage === pagination.lastPage}
            className={`px-3 py-1 rounded cursor-pointer ${
              pagination.currentPage === pagination.lastPage
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Next
          </button>
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
                Are you sure you want to delete this employee? This action
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
                onClick={handleDeleteEmployee}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-4xl transition-colors flex items-center cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesListII;
