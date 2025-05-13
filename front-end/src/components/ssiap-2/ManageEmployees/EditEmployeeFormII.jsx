import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SsiApi from "../../../services/api/SsiApi";
import { useUserContext } from "../../../context/UserContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, User, Mail, Phone, Building, ArrowLeft } from "lucide-react";
import { SSIAP_2_EMPLOYEES_ROUTE } from "../../../routes";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone_number: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
});

const EditEmployeeFormII = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useUserContext();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize form with react-hook-form and zod resolver
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
    },
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        const response = await SsiApi.getOneUser(id);
        const userData = response.data;

        console.log("Fetched user data:", userData); // Debug log

        // Set form values
        form.reset({
          name: userData.name || "",
          email: userData.email || "",
          phone_number: userData.phone_number || "",
        });
      } catch (err) {
        console.error("Error fetching employee:", err);
        setError("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployeeData();
    }
  }, [id, form]);

  const onSubmit = async (data) => {
    if (!currentUser) return;

    if (currentUser.ssiap_level !== 2) {
      form.setError("root", {
        message: "Unauthorized to update users",
      });
      return;
    }

    setSubmitting(true);

    // Make sure we're sending the right data format
    const formData = {
      name: data.name,
      email: data.email,
      phone_number: data.phone_number,
    };

    console.log("Submitting data:", formData); // Debug log

    try {
      const response = await SsiApi.updateUser(id, formData);
      console.log("Update response:", response); // Debug log
      navigate(SSIAP_2_EMPLOYEES_ROUTE);
    } catch (err) {
      console.error("Update error:", err.response?.data || err); // Debug log
      const errorMessage =
        err.response?.data?.message || "Failed to update employee";

      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        Object.keys(errors).forEach((key) => {
          if (form.getValues(key) !== undefined) {
            form.setError(key, { message: errors[key][0] });
          }
        });
      } else {
        form.setError("root", { message: errorMessage });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (!currentUser || currentUser.ssiap_level !== 2) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Access Denied</h2>
        <p>You don't have permission to update users.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md flex items-center justify-center">
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        <span>Loading employee data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700">{error}</p>
        <div className="mt-6">
          <Link
            to={SSIAP_2_EMPLOYEES_ROUTE}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Employees
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-50 to-white p-6 border-b border-gray-100">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-700 tracking-tight">
                EDIT EMPLOYEE
              </h2>
              <div className="mt-2 h-1 w-16 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full" />
              <p className="text-gray-600 text-sm mt-3">
                Edit Your{" "}
                <span className="text-gray-800 font-medium px-2 py-1 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-400">
                  VIGILANT
                </span>{" "}
                team member.
              </p>
            </div>
          </div>

          {/* Form content */}
          <div className="p-6">
            {form.formState.errors.root && (
              <div className="p-4 mb-6 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {form.formState.errors.root.message}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium text-sm">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                        <Input
                          className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-10 focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
                          placeholder="John Doe"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium text-sm">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                        <Input
                          className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-10 focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
                          placeholder="employee@example.com"
                          type="email"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium text-sm">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                        <Input
                          className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-10 focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
                          placeholder="0712345678"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Site field (read-only for SSIAP2) */}
              <FormItem>
                <FormLabel className="text-gray-700 font-medium text-sm">
                  Site
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      value={currentUser.site_id}
                      className="border-gray-300 h-11 text-gray-400 rounded-lg pl-10 bg-gray-100"
                      readOnly
                    />
                  </div>
                </FormControl>
              </FormItem>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
            <Link
              to={SSIAP_2_EMPLOYEES_ROUTE}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-4xl transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Employees</span>
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
                <span className="text-sm tracking-wide">UPDATE EMPLOYEE</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditEmployeeFormII;
