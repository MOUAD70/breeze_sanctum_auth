("use client");

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useNavigate } from "react-router-dom";
import { Loader2, User, Lock } from "lucide-react";
import {
  LOGIN_ROUTE,
  SSIAP_1_DASHBOARD_ROUTE,
  SSIAP_2_DASHBOARD_ROUTE,
  SSIAP_3_DASHBOARD_ROUTE,
} from "../../routes";
import { useUserContext } from "../../context/UserContext";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

const UserLogin = () => {
  const { login, setAuthenticated, setUser, setToken } = useUserContext();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "mouad@example.com",
      password: "password123",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await login(values.email, values.password);
      console.log("Login response:", response);

      if (response?.data?.user) {
        const { user } = response.data;
        setUser(user);
        setToken(response.data.token);
        setAuthenticated(true, user.ssiap_level);

        switch (user.ssiap_level) {
          case 1:
            navigate(SSIAP_1_DASHBOARD_ROUTE);
            break;
          case 2:
            navigate(SSIAP_2_DASHBOARD_ROUTE);
            break;
          case 3:
            navigate(SSIAP_3_DASHBOARD_ROUTE);
            break;
          default:
            navigate(LOGIN_ROUTE);
        }
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Login error:", error);
      form.setError("email", {
        message:
          error.response?.data?.errors?.email?.join() ||
          error.message ||
          "Login failed",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-sm mx-auto p-8 white rounded-2xl border border-gray-100 shadow-2xl"
      >
        <div className="text-center space-y-3 bg-gradient-to-t from-sky-100 to-white px-4 py-3 rounded-2xl">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-600 tracking-tight">
              WELCOME BACK
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-yellow-200 to-yellow-400 mx-auto rounded-full" />
          </div>
          <p className="text-gray-600 text-sm">
            Your{" "}
            <span className="text-gray-800 font-medium px-2 py-1 rounded-4xl bg-gradient-to-r from-yellow-200 to-yellow-400">
              VIGILANT
            </span>{" "}
            partner.
          </p>
        </div>

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
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                  <Input
                    className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-10 focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
                    placeholder="user@example.com"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium text-sm">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                  <Input
                    type="password"
                    className="bg-white border-gray-300 h-11 text-gray-900 rounded-lg pl-10 focus:border-gray-600 focus:ring-1 focus:ring-gray-200 hover:border-gray-400 transition-colors"
                    placeholder="••••••••"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="ghost"
          className="text-white w-full h-11 border hover:bg-sky-950 hover:border-sky-950 bg-sky-900 border-sky-900 hover:text-white font-medium rounded-4xl transition-colors duration-200"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
              <span className="text-sm">Authenticating...</span>
            </>
          ) : (
            <span className="text-sm tracking-wide">LOG IN</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UserLogin;
