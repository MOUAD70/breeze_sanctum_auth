import {
  CheckCircle2,
  Clock,
  User,
  Shield,
  XCircle,
  Search,
  Filter,
  Download,
} from "lucide-react";

const SIIIAttendance = () => {
  return (
    <div className="min-h-screen bg-white px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          SSIAP Attendance System
        </h1>
        <p className="text-gray-500">
          Monitor and manage security personnel attendance
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-4xl text-gray-700 hover:bg-gray-50 cursor-pointer">
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-sky-800 text-white hover:bg-sky-900 cursor-pointer rounded-4xl font-semibold">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-700">
            Attendance for: <span className="font-semibold">May 15, 2023</span>
          </h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-4xl text-gray-700 hover:bg-gray-50 cursor-pointer">
              Previous
            </button>
            <button className="px-3 py-1 bg-sky-800 text-white rounded-4xl hover:bg-sky-900 cursor-pointer">
              Today
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-4xl text-gray-700 hover:bg-gray-50 cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
          <p className="text-sm text-sky-800">Total Employees</p>
          <p className="text-2xl font-bold text-sky-800">42</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">Present Today</p>
          <p className="text-2xl font-bold text-green-600">38</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">Late Arrivals</p>
          <p className="text-2xl font-bold text-amber-800">3</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-sm text-red-800">Absent</p>
          <p className="text-2xl font-bold text-red-800">4</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Shift
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-in
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                {
                  id: "SSIAP-001",
                  name: "Jean Dupont",
                  role: "SSIAP1",
                  shift: "08:00 - 20:00",
                  checkIn: "07:55",
                  checkOut: "19:58",
                  status: "Present",
                },
                {
                  id: "SSIAP-002",
                  name: "Marie Lambert",
                  role: "SSIAP2",
                  shift: "08:00 - 20:00",
                  checkIn: "08:15",
                  checkOut: "20:02",
                  status: "Late",
                },
                {
                  id: "SSIAP-003",
                  name: "Pierre Moreau",
                  role: "SSIAP1",
                  shift: "20:00 - 08:00",
                  checkIn: "19:45",
                  checkOut: "07:55",
                  status: "Present",
                },
                {
                  id: "SSIAP-004",
                  name: "Sophie Bernard",
                  role: "SSIAP3",
                  shift: "08:00 - 20:00",
                  checkIn: null,
                  checkOut: null,
                  status: "Absent",
                },
                {
                  id: "SSIAP-005",
                  name: "Thomas Petit",
                  role: "SSIAP1",
                  shift: "20:00 - 08:00",
                  checkIn: "20:05",
                  checkOut: null,
                  status: "On-duty",
                },
              ].map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-sky-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-sky-900" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-900">
                        {employee.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.shift}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.checkIn || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.checkOut || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        employee.status === "Present"
                          ? "bg-green-100 text-green-800"
                          : employee.status === "Late"
                          ? "bg-amber-100 text-amber-800"
                          : employee.status === "Absent"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {employee.status === "Present" ? (
                        <CheckCircle2 className="h-3 w-3 inline mr-1 mt-1" />
                      ) : employee.status === "Absent" ? (
                        <XCircle className="h-3 w-3 inline mr-1 mt-1" />
                      ) : (
                        <Clock className="h-3 w-3 inline mr-1 mt-1" />
                      )}
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">5</span> of{" "}
          <span className="font-medium">42</span> employees
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 bg-gray-100 rounded-md text-gray-700">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SIIIAttendance;
