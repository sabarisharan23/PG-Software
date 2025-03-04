import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstence";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

// Define validation schema using Zod
const formSchema = z
  .object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .optional(),
    role: z.enum(["SUPER_ADMIN", "ADMIN", "TENANT"], {
      required_error: "Role is required.",
    }),
    roomId: z.number().optional(),
  })
  .refine(
    (data) => {
      if (data.role === "TENANT" && data.roomId === undefined) {
        return false;
      }
      return true;
    },
    {
      message: "Room ID is required for TENANT role.",
      path: ["roomId"],
    }
  );

type FormData = z.infer<typeof formSchema>;

export default function AddUser() {
  const { id } = useParams(); // Get user ID from URL params
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      role: "ADMIN",
      roomId: undefined,
    },
  });

  const { setValue } = form;
  const role = form.watch("role");

  useEffect(() => {
    if (isEditMode && id) {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get(`/user/getUser/${id}`);
          const userData = response.data;

          // Populate form with fetched data
          setValue("firstname", userData.firstname || "");
          setValue("lastname", userData.lastname || "");
          setValue("username", userData.username || "");
          setValue("email", userData.email || "");
          setValue("role", userData.role || "ADMIN");
          setValue("roomId", userData.roomId || undefined);
        } catch (error) {
          console.error("Error fetching user:", error);
          toast.error("Failed to fetch user details.");
        }
      };

      fetchUser();
    }
  }, [isEditMode, id, setValue]);

  const onSubmit = async (data: FormData) => {
    if (!id) {
      toast.error("User ID is missing!");
      return;
    }
    console.log("Submitting updated user:", { id, ...data });
  
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/user/updateUser/${id}`, { id, ...data });
      console.log("User updated:", response.data);
      toast.success("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user!");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold p-6">
          {isEditMode ? "Edit User" : "Add User"}
        </h2>
      </div>
      <div className="flex justify-center items-center p-6 bg-gray-100">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white p-10 shadow-lg rounded-lg w-full flex flex-col"
          >
            {/* Form Fields Wrapper */}
            <div className="flex gap-10">
              {/* Left Column */}
              <div className="flex flex-col gap-10 w-1/2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-10 w-1/2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {!isEditMode && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SUPER_ADMIN">
                            Super Admin
                          </SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="TENANT">Tenant</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Room ID Field (conditionally rendered) */}
            {role === "TENANT" && (
              <div className="mt-6">
                <FormField
                  control={form.control}
                  name="roomId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room ID</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Room ID"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting..." : isEditMode ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}