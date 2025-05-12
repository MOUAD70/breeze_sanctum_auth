import { useEffect, useState } from "react";
import {
  User,
  Shield,
  Mail,
  Phone,
  BadgeCheck,
  MoreVertical,
  UserPlus,
} from "lucide-react";
import SsiApi from "../../services/api/SsiApi";
import { Link } from "react-router-dom";
import { SSIAP_2_ADD_EMPLOYEE_ROUTE } from "../../routes";

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

  const getCertificationText = (level) => {
    return `SSIAP${level}`;
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Employees
              </p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">
                {pagination.total}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-sky-50">
              <User className="h-5 w-5 text-sky-600" />
            </div>
          </div>
          <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                SSIAP1 Certified
              </p>
              <p className="text-2xl font-semibold text-gray-800 mt-1">
                {pagination.ssiap1Count}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-500 rounded-full"
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
      </div>

      <div className="flex justify-end mb-4">
        <Link
          to={SSIAP_2_ADD_EMPLOYEE_ROUTE}
          className="items-center bg-sky-900 text-white hover:bg-sky-950 transition-colors duration-150 py-2.5 px-4 text-[16px] rounded-4xl cursor-pointer  border-0 outline-0 inline-flex justify-center align-center"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Add Employee
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    <button
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="More options"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{firstItem}</span> to{" "}
          <span className="font-medium">{lastItem}</span> of{" "}
          <span className="font-medium">{pagination.total}</span> employees
        </div>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 border rounded-md text-sm ${
              pagination.currentPage === 1
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            } transition-colors`}
            onClick={handlePrevious}
            disabled={pagination.currentPage === 1 || isChangingPage}
          >
            {isChangingPage ? "..." : "Previous"}
          </button>

          <button className="px-3 py-1 border border-gray-300 bg-gray-100 rounded-md text-sm text-gray-700">
            Page {pagination.currentPage} of {pagination.lastPage}
          </button>

          <button
            className={`px-3 py-1 border rounded-md text-sm ${
              pagination.currentPage === pagination.lastPage
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            } transition-colors`}
            onClick={handleNext}
            disabled={
              pagination.currentPage === pagination.lastPage || isChangingPage
            }
          >
            {isChangingPage ? "..." : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeesListII;
