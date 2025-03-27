import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstence";
import { toast } from "sonner";

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
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
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

  const role = watch("role");

  useEffect(() => {
    if (isEditMode && id) {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get(`/user/getUser/${id}`);
          console.log('response ------------------->:', response);
          const userData = response.data;
          console.log('userData ------------------->:', userData);


          setValue("firstname", userData.firstname || "");
          setValue("lastname", userData.lastname || "");
          setValue("username", userData.username);
          setValue("email", userData.email);
          setValue("password", userData.password);
          setValue("role", userData.role);
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
    try {
      setLoading(true);
      console.log("Submitting form...", data);
  
      const numericId = id ? Number(id) : undefined;
      const endpoint = "/user";
      
      // Ensure roomId is a number (or undefined)
      const payload = {
        ...data,
        roomId: data.roomId ? Number(data.roomId) : undefined,
      };
  
      if (isEditMode && numericId !== undefined) {
        console.log("Updating user with ID:", numericId);
        await axiosInstance.put(`${endpoint}/updateUser/${numericId}`, payload);
        toast.success("User updated successfully.");
      } else {
        console.log("Creating new user...", payload);
        if (!payload.password) {
          toast.error("Password is required when creating a new user.");
          return;
        }
        await axiosInstance.post(`${endpoint}/createUser`, payload);
        toast.success("User created successfully.");
        reset();
      }
  
      navigate("/user-list");
    } catch (error:any) {
      console.error("Error submitting form:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Failed to submit user details."
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-6  ">
    <div className="bg-white p-6 rounded-lg shadow-md ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {isEditMode ? "Edit User" : "Add User"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Main form layout using flex */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                First Name
              </label>
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter first name"
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                )}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Username <span className="text-red-500">*</span>
              </label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter username"
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                )}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Email <span className="text-red-500">*</span>
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="email"
                    placeholder="Enter email"
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Last Name
              </label>
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <input
                  {...field}
                  type="text"
                  placeholder="Enter last name"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  />
                )}
                />
            </div>
                {!isEditMode && (
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">
                      Password
                    </label>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter password"
                          className="w-full border border-gray-300 rounded-lg p-2"
                        />
                      )}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                )}

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Role
              </label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option value="SUPER_ADMIN">Super Admin</option>
                    <option value="ADMIN">Admin</option>
                    <option value="TENANT">Tenant</option>
                  </select>
                )}
              />
            </div>

            {role === "TENANT" && (
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Room ID
                </label>
                <Controller
                  name="roomId"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="Enter Room ID"
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  )}
                />
                {errors.roomId && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.roomId.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Submit Button at bottom right */}
        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="px-6">
            {loading
              ? "Submitting..."
              : isEditMode
              ? "Update User"
              : "Add User"}
          </Button>
        </div>
      </form>
    </div>
    </div>
  );
}
