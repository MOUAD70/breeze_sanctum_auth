import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Shield,
  AlertCircle,
  X,
  Loader2,
} from 'lucide-react';
import SsiApi from '../../../services/api/SsiApi';
import { useUserContext } from '../../../context/UserContext';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SSIAP_2_DASHBOARD_ROUTE } from '../../../routes';

const AttendanceDetailsSsii = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');

  useEffect(() => {
    fetchAttendance();
    fetchAssignments();
  }, [user]);

  const fetchAttendance = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    try {
      // Get attendance for the current user on the current date
      const response = await SsiApi.getAttendance({ date: currentDate });
      
      let attendanceData = null;
      if (response && response.data) {
        // Find the user's attendance record for the current date
        const userAttendance = Array.isArray(response.data) 
          ? response.data.find(a => a.employee_id === user.id)
          : null;
        
        if (userAttendance) {
          attendanceData = userAttendance;
          setAttendanceStatus(userAttendance.status);
          setSelectedAssignmentId(userAttendance.shift_id);
        }
      }
      
      setAttendance(attendanceData);
    } catch (err) {
      console.error('Failed to load attendance:', err);
      setError('Failed to load your attendance record. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    if (!user?.id) return;
    
    try {
      // Get user's assignments using the correct API method
      const response = await SsiApi.getCurrentUserAssignments();
      if (response && response.data) {
        setAssignments(response.data);
        
        // If no assignment is selected and we have assignments, select the first one
        if (!selectedAssignmentId && response.data.length > 0) {
          setSelectedAssignmentId(response.data[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to load assignments:', err);
      // Don't show error for assignments, just log it
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Use a default assignment ID if none is selected
      const shiftId = selectedAssignmentId || (assignments.length > 0 ? assignments[0]?.id : 1);
      
      const attendanceData = {
        employee_id: user.id,
        shift_id: shiftId,
        date: currentDate,
        status: attendanceStatus
      };

      if (attendance) {
        // Update existing attendance
        await SsiApi.updateAttendance(attendance.id, attendanceData);
        setSuccess('Your attendance has been updated successfully!');
      } else {
        // Create new attendance
        await SsiApi.createAttendance(attendanceData);
        setSuccess('Your attendance has been recorded successfully!');
      }

      // Show success message briefly before redirecting
      setTimeout(() => {
        navigate(SSIAP_2_DASHBOARD_ROUTE);
      }, 1500);
    } catch (err) {
      console.error('Error submitting attendance:', err);
      setError(err.response?.data?.message || 'Failed to submit attendance. Please try again.');
      setSubmitting(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800';
      case 'Absent':
        return 'bg-red-100 text-red-800';
      case 'Vacation':
        return 'bg-blue-100 text-blue-800';
      case 'Sick Leave':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case 'Absent':
        return <XCircle className="h-4 w-4 mr-1" />;
      case 'Vacation':
        return <Calendar className="h-4 w-4 mr-1" />;
      case 'Sick Leave':
        return <Shield className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const formattedCurrentDate = format(new Date(), 'MMMM d, yyyy');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-gray-100">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-gray-700 tracking-tight">
              MY ATTENDANCE
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full" />
            <p className="text-gray-600 text-sm mt-3">
              Record and manage your daily attendance
            </p>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-3 bg-red-100 text-red-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-800 hover:text-red-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {success && (
            <div className="mb-6 p-3 bg-green-100 text-green-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <span>{success}</span>
              </div>
              <button
                onClick={() => setSuccess(null)}
                className="text-green-800 hover:text-green-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <div className="mb-6">
            <div className="mb-4">
              <div className="flex items-center text-sm font-medium text-gray-700">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                Today: {formattedCurrentDate}
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-medium text-gray-900 mb-4">
                  {attendance
                    ? 'Your attendance record for today'
                    : 'Record your attendance for today'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Hidden assignment selection - not visible to user but needed for API */}
                  <input 
                    type="hidden" 
                    name="shift_id" 
                    value={selectedAssignmentId || (assignments.length > 0 ? assignments[0]?.id : 1)} 
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <Select
                      value={attendanceStatus}
                      onValueChange={setAttendanceStatus}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Present">Present</SelectItem>
                        <SelectItem value="Absent">Absent</SelectItem>
                        <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                        <SelectItem value="Vacation">Vacation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="text-white h-11 px-8 border hover:bg-sky-950 hover:border-sky-950 bg-sky-900 border-sky-900 hover:text-white font-medium rounded-4xl transition-colors duration-200 cursor-pointer w-full"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="animate-spin h-4 w-4 mr-2" />
                          <span className="text-sm">
                            {attendance ? 'UPDATING...' : 'SUBMITTING...'}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm tracking-wide">
                          {attendance ? 'UPDATE ATTENDANCE' : 'SUBMIT ATTENDANCE'}
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {attendance && !loading && (
            <div className="mt-8">
              <h3 className="font-medium text-gray-900 mb-4">Current Attendance Record</h3>
              <div className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                      <h3 className="font-medium text-gray-900">
                        {user?.name || 'Current User'}
                      </h3>
                      <div className="flex items-center mt-1 sm:mt-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            attendance.status
                          )}`}
                        >
                          {getStatusIcon(attendance.status)}
                          {attendance.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {user?.email || 'user@example.com'}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {attendance.check_in && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Clock className="h-3 w-3 mr-1" />
                          In: {format(new Date(attendance.check_in), 'HH:mm')}
                        </span>
                      )}
                      {attendance.check_out && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <Clock className="h-3 w-3 mr-1" />
                          Out: {format(new Date(attendance.check_out), 'HH:mm')}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      {format(new Date(attendance.date), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetailsSsii;