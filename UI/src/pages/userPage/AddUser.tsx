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
  FormDescription,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

// Define the validation schema using Zod
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
      .min(6, { message: "Password must be at least 6 characters." }),
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

// Infer the form data type from the schema
type FormData = z.infer<typeof formSchema>;

export default function AddUser() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      role: "ADMIN", // Default role
      roomId: undefined,
    },
  });

  const role = form.watch("role");

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold p-6 ">Add User</h2>
      </div>
      <div className="flex justify-center items-center p-6 bg-gray-100">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-10 shadow-lg rounded-lg w-full flex flex-col "
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
                        <Input
                          placeholder="Enter your first name"
                          className="w-full"
                          {...field}
                          
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
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
                        <Input
                          placeholder="Enter your last name"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <div className="text-black">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="text-black">
                        <FormLabel className="text-black">Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your username"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>
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
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
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
                            SUPER ADMIN
                          </SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="USER">User</SelectItem>
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
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <Button type="submit" variant={"default"}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
