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
import { SSIAP_1_DASHBOARD_ROUTE } from "../../routes";
import { useUserContext } from "../../context/UserContext";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

const SILogin = () => {
  const { login, setAuthenticated } = useUserContext();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "mouad@example.com",
      password: "password123",
    },
  });

  const onSubmit = async (values) => {
    await login(values.email, values.password)
      .then((value) => {
        if (value.status === 200) {
          setAuthenticated(true);
          navigate(SSIAP_1_DASHBOARD_ROUTE);
        }
      })
      .catch(({ response }) => {
        form.setError("email", {
          message: response.data.errors.email.join(),
        });
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-md border border-gray-100 mt-4"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">LOG IN</h2>
          <p className="text-gray-500">
            Enter your credentials to access the system.
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    className="border-gray-200 h-11 text-gray-700 rounded-md pl-10"
                    placeholder="user@example.com"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 font-medium">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    className="border-gray-200 h-11 text-gray-700 rounded-md pl-10"
                    placeholder="••••••••"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-600" />
            </FormItem>
          )}
        />

        <div className="pt-2">
          <Button
            type="submit"
            className="relative group overflow-hidden w-full h-11 bg-gradient-to-r from-sky-800 to-sky-700 hover:bg-sky-800 text-white font-medium rounded-md transition-all"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-gradient-to-r from-sky-950 to-sky-900 rounded-lg group-hover:translate-x-0"></span>
            <span className="relative flex items-center justify-center gap-2 w-full text-white transition-colors duration-200">
              {form.formState.isSubmitting ? (
                <>
                  Logging In...
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                </>
              ) : (
                "Log In"
              )}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SILogin;
