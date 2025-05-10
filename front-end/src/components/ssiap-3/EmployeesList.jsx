import { User, Shield, Mail, Phone, BadgeCheck, MoreVertical, Search, Filter, Plus } from "lucide-react";

const EmployeesList = () => {
  return (
    <div className="min-h-screen bg-white px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">SSIAP Personnel Management</h1>
        <p className="text-gray-500">All registered security personnel</p>
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
            <Plus className="h-4 w-4" />
            Add Employee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
          <p className="text-sm text-sky-800">Total Employees</p>
          <p className="text-2xl font-bold text-sky-800">42</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-800">SSIAP1 Certified</p>
          <p className="text-2xl font-bold text-purple-800">28</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">SSIAP2 Certified</p>
          <p className="text-2xl font-bold text-blue-800">10</p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-800">SSIAP3 Certified</p>
          <p className="text-2xl font-bold text-emerald-800">4</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { 
                  id: 'SSIAP-001', 
                  name: 'Jean Dupont', 
                  email: 'j.dupont@ssiap.fr', 
                  phone: '+33 6 12 34 56 78',
                  certification: 'SSIAP1',
                  status: 'Active',
                  since: '2021-03-15'
                },
                { 
                  id: 'SSIAP-002', 
                  name: 'Marie Lambert', 
                  email: 'm.lambert@ssiap.fr', 
                  phone: '+33 6 98 76 54 32',
                  certification: 'SSIAP2',
                  status: 'Active',
                  since: '2020-11-22'
                },
                { 
                  id: 'SSIAP-003', 
                  name: 'Pierre Moreau', 
                  email: 'p.moreau@ssiap.fr', 
                  phone: '+33 6 45 67 89 01',
                  certification: 'SSIAP1',
                  status: 'On Leave',
                  since: '2022-05-10'
                },
                { 
                  id: 'SSIAP-004', 
                  name: 'Sophie Bernard', 
                  email: 's.bernard@ssiap.fr', 
                  phone: '+33 6 23 45 67 89',
                  certification: 'SSIAP3',
                  status: 'Active',
                  since: '2019-08-17'
                },
                { 
                  id: 'SSIAP-005', 
                  name: 'Thomas Petit', 
                  email: 't.petit@ssiap.fr', 
                  phone: '+33 6 78 90 12 34',
                  certification: 'SSIAP1',
                  status: 'Inactive',
                  since: '2023-01-05'
                },
              ].map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-sky-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-sky-900" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {employee.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {employee.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Shield className={`h-4 w-4 mr-2 ${
                        employee.certification === 'SSIAP1' ? 'text-sky-600' :
                        employee.certification === 'SSIAP2' ? 'text-blue-600' :
                        'text-emerald-600'
                      }`} />
                      <span className="text-sm text-gray-900">{employee.certification}</span>
                      <BadgeCheck className="h-4 w-4 ml-2 text-green-500" />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Since {employee.since}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.status === 'Active' ? 'bg-green-100 text-green-800' :
                      employee.status === 'On Leave' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">42</span> employees
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

export default EmployeesList;