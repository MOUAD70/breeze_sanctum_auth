import { User, Shield, Clock, RefreshCw, CheckCircle2, XCircle, Search, Filter, Plus, MoreVertical } from "lucide-react";

const Replacement = () => {
  return (
    <div className="min-h-screen bg-white px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">SSIAP Replacement Management</h1>
        <p className="text-gray-500">Manage and track personnel replacements</p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search replacements..."
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
            New Replacement
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
          <p className="text-sm text-sky-800">Pending Replacements</p>
          <p className="text-2xl font-bold text-sky-800">5</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-800">Approved Replacements</p>
          <p className="text-2xl font-bold text-purple-800">12</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">In Progress</p>
          <p className="text-2xl font-bold text-amber-800">3</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">Completed</p>
          <p className="text-2xl font-bold text-green-800">24</p>
        </div>
      </div>

      {/* Date Filter */}
      <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-700">Showing replacements for: <span className="font-semibold">Next 7 days</span></h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded-4xl text-gray-700 hover:bg-gray-50 cursor-pointer">
              Previous
            </button>
            <button className="px-3 py-1 bg-sky-800 text-white rounded-4xl hover:bg-sky-900 cursor-pointer">
              Current
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-4xl text-gray-700 hover:bg-gray-50 cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Replacements Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Staff</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Replacement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { 
                  id: 'REP-001',
                  original: { name: 'Jean Dupont', id: 'SSIAP-001', role: 'SSIAP1' },
                  replacement: { name: 'Marie Lambert', id: 'SSIAP-002', role: 'SSIAP2' },
                  date: '2023-05-20',
                  shift: '08:00 - 20:00',
                  reason: 'Medical leave',
                  status: 'Approved',
                  requested: '2023-05-15'
                },
                { 
                  id: 'REP-002',
                  original: { name: 'Pierre Moreau', id: 'SSIAP-003', role: 'SSIAP1' },
                  replacement: { name: 'Thomas Petit', id: 'SSIAP-005', role: 'SSIAP1' },
                  date: '2023-05-21',
                  shift: '20:00 - 08:00',
                  reason: 'Training',
                  status: 'Pending',
                  requested: '2023-05-18'
                },
                { 
                  id: 'REP-003',
                  original: { name: 'Sophie Bernard', id: 'SSIAP-004', role: 'SSIAP3' },
                  replacement: null,
                  date: '2023-05-22',
                  shift: '08:00 - 20:00',
                  reason: 'Vacation',
                  status: 'Needs Replacement',
                  requested: '2023-05-10'
                },
                { 
                  id: 'REP-004',
                  original: { name: 'Thomas Petit', id: 'SSIAP-005', role: 'SSIAP1' },
                  replacement: { name: 'Jean Dupont', id: 'SSIAP-001', role: 'SSIAP1' },
                  date: '2023-05-19',
                  shift: '20:00 - 08:00',
                  reason: 'Personal',
                  status: 'Completed',
                  requested: '2023-05-12'
                },
              ].map((replacement) => (
                <tr key={replacement.id} className="hover:bg-gray-50">
                  {/* Original Staff */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-sky-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-sky-900" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{replacement.original.name}</div>
                        <div className="text-sm text-gray-500">{replacement.original.id}</div>
                        <div className="text-xs text-gray-400 mt-1 flex items-center">
                          <Shield className="h-3 w-3 mr-1" />
                          {replacement.original.role}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Replacement Staff */}
                  <td className="px-6 py-4">
                    {replacement.replacement ? (
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-green-900" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{replacement.replacement.name}</div>
                          <div className="text-sm text-gray-500">{replacement.replacement.id}</div>
                          <div className="text-xs text-gray-400 mt-1 flex items-center">
                            <Shield className="h-3 w-3 mr-1" />
                            {replacement.replacement.role}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500 italic">Not assigned</div>
                    )}
                  </td>

                  {/* Shift Details */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <div className="font-medium">{replacement.date}</div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        {replacement.shift}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {replacement.reason}
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      replacement.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      replacement.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      replacement.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {replacement.status === 'Approved' ? (
                        <CheckCircle2 className="h-3 w-3 inline mr-1 mt-1" />
                      ) : replacement.status === 'Pending' ? (
                        <RefreshCw className="h-3 w-3 inline mr-1 mt-1" />
                      ) : replacement.status === 'Needs Replacement' ? (
                        <XCircle className="h-3 w-3 inline mr-1 mt-1" />
                      ) : null}
                      {replacement.status}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      Requested: {replacement.requested}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {replacement.status === 'Pending' && (
                        <button className="text-xs bg-sky-800 text-white px-3 py-1 rounded-4xl hover:bg-sky-900">
                          Approve
                        </button>
                      )}
                      {replacement.status === 'Needs Replacement' && (
                        <button className="text-xs bg-purple-800 text-white px-3 py-1 rounded-4xl hover:bg-purple-900">
                          Assign
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of <span className="font-medium">16</span> replacements
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

export default Replacement;