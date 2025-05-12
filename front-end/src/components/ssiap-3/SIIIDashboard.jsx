import { CheckCircle2, Shield, User, XCircle } from "lucide-react";

const SIIIDashboard = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-2 space-y-6">
      <div className="bg-gradient-to-t from-sky-900 to-sky-800 text-white p-6 rounded-xl">
        <h1 className="text-2xl font-semibold">
          Welcome to the SSIAP Dashboard
        </h1>
        <p className="text-sky-100 mt-2">Lorem ipsum dolor sit amet.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-sky-900">Total Employees</h3>
          <p className="mt-2 text-3xl font-bold text-sky-900">45</p>
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-sky-900">Present today</h3>
          <p className="mt-2 text-3xl font-bold text-sky-900">25</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-sm font-medium text-red-900">
            Incidents Reports
          </h3>
          <p className="mt-2 text-3xl font-bold text-red-900">2</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-sky-900/50">
              <th className="text-left text-sm font-medium text-sky-900 p-4 pl-6">
                Employee
              </th>
              <th className="text-left text-sm font-medium text-sky-900 p-4">
                Role
              </th>
              <th className="text-left text-sm font-medium text-sky-900 p-4 pr-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-100">
            <tr className="hover:bg-sky-50/50 transition-colors">
              <td className="p-4 pl-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 bg-sky-100 p-2 rounded-full">
                    <User className="h-4 w-4 text-sky-900" />
                  </div>
                  <div>
                    <p className="font-medium text-sky-900">John Doe</p>
                    <p className="text-xs text-sky-900/50">ID: EMP-001</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-sky-900" />
                  <span className="text-sky-900">SSIAP1</span>
                </div>
              </td>
              <td className="p-4 pr-6">
                <div className="flex items-center space-x-2 text-green-800">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-normal">Present</span>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-sky-50/50 transition-colors">
              <td className="p-4 pl-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 bg-sky-100 p-2 rounded-full">
                    <User className="h-4 w-4 text-sky-900" />
                  </div>
                  <div>
                    <p className="font-medium text-sky-900">Jane Smith</p>
                    <p className="text-xs text-sky-900/50">ID: EMP-002</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-sky-900" />
                  <span className="text-sky-900">SSIAP2</span>
                </div>
              </td>
              <td className="p-4 pr-6">
                <div className="flex items-center space-x-2 text-green-800">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-normal">Present</span>
                </div>
              </td>
            </tr>

            <tr className="hover:bg-sky-50/50 transition-colors">
              <td className="p-4 pl-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 bg-sky-100 p-2 rounded-full">
                    <User className="h-4 w-4 text-sky-900" />
                  </div>
                  <div>
                    <p className="font-medium text-sky-900">Mike Johnson</p>
                    <p className="text-xs text-sky-900/50">ID: EMP-003</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-sky-900 " />
                  <span className="text-sky-900">SSIAP1</span>
                </div>
              </td>
              <td className="p-4 pr-6">
                <div className="flex items-center space-x-2 text-red-800">
                  <XCircle className="h-4 w-4" />
                  <span className="font-normal">Absent</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-red-200">
          <h2 className="text-lg font-semibold text-red-900">
            Recent Incidents
          </h2>
        </div>
        <div className="p-6">
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="flex h-2 w-2 mt-2 mr-2 rounded-full bg-red-500" />
              <div>
                <p className="text-sm font-medium">
                  Fire alarm triggered at Site A
                </p>
                <p className="text-sm text-red-900/50">08:45 AM</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex h-2 w-2 mt-2 mr-2 rounded-full bg-amber-500" />
              <div>
                <p className="text-sm font-medium">
                  Medical assistance required at Site B
                </p>
                <p className="text-sm text-red-900/50">10:15 AM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SIIIDashboard;
