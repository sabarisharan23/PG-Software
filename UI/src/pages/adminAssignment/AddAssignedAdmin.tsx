import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pg } from "../Pg/PgList";
import axiosInstance from "../../AxiosInstence";
import { Button } from "../../components/ui/button";

// Define types
interface Admin {
  id: number;
  username: string;
  role: string; // Added role
}

interface AdminAssignment {
  adminId: number;
  pgId: number;
}

// Form schema
const formSchema = z.object({
  adminId: z.string().min(1, "Please select an Admin."),
  pgId: z.string().min(1, "Please select a PG."),
});

type FormData = z.infer<typeof formSchema>;

export default function AddAssignedAdmin() {
  const navigate = useNavigate();
  const { adminId, pgId } = useParams<{ adminId: string; pgId: string }>();
  const isEditMode = Boolean(adminId && pgId);

  const [loading, setLoading] = useState(false);
  const [pgList, setPgList] = useState<Pg[]>([]);
  const [adminList, setAdminList] = useState<Admin[]>([]);
  const [selectedPgName, setSelectedPgName] = useState("");
  const [selectedAdminName, setSelectedAdminName] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adminId: "",
      pgId: "",
    },
  });

  // Fetch PGs & Admins
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pgRes, adminRes] = await Promise.all([
          axiosInstance.get<Pg[]>("/PG/getPG"),
          axiosInstance.get<Admin[]>("user/getUser"),
        ]);

        // Filter only admin role users
        const admins = adminRes.data.filter((user) => user.role === "ADMIN");
        setPgList(pgRes.data);
        setAdminList(admins);
      } catch (error) {
        toast.error("Failed to load data.");
      }
    };
    fetchData();
  }, []);

  // Fetch existing assignment in edit mode
  useEffect(() => {
    if (isEditMode && adminId && pgId && pgList.length && adminList.length) {
      const fetchAssignment = async () => {
        try {
          const { data } = await axiosInstance.get<AdminAssignment>(
            `/adminAssignment/getAdminAssignment/${adminId}/${pgId}`
          );

          setValue("adminId", String(data.adminId));
          setValue("pgId", String(data.pgId));

          const pg = pgList.find((pg) => pg.id === Number(data.pgId));
          const admin = adminList.find(
            (admin) => admin.id === Number(data.adminId)
          );

          setSelectedPgName(pg ? pg.pgName : "Unknown PG");
          setSelectedAdminName(admin ? admin.username : "Unknown Admin");
        } catch {
          toast.error("Failed to fetch assignment details.");
        }
      };

      fetchAssignment();
    }
  }, [isEditMode, adminId, pgId, pgList, adminList, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      if (isEditMode) {
        await axiosInstance.put(
          `/adminAssignment/updateAdminAssignment/${adminId}/${pgId}`,
          {
            adminId: Number(data.adminId),
            pgId: Number(data.pgId),
          }
        );
        toast.success("Admin Assignment updated successfully.");
      } else {
        await axiosInstance.post("/adminAssignment/createAdminAssignment", {
          adminId: Number(data.adminId),
          pgId: Number(data.pgId),
        });
        toast.success("Admin Assigned successfully.");
      }

      navigate("/assigned-admin");
    } catch {
      toast.error("Failed to submit assignment details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {isEditMode ? "Edit Admin Assignment" : "Add Admin Assignment"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Admin Dropdown */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Select Admin <span className="text-red-500">*</span>
            </label>
            <Controller
              name="adminId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">
                    {isEditMode ? selectedAdminName : "Select an Admin"}
                  </option>
                  {adminList.map((admin) => (
                    <option key={admin.id} value={admin.id}>
                      {admin.username}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.adminId && (
              <p className="text-red-500 text-sm mt-2">
                {errors.adminId.message}
              </p>
            )}
          </div>

          {/* PG Dropdown */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Select PG <span className="text-red-500">*</span>
            </label>
            <Controller
              name="pgId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">
                    {isEditMode ? selectedPgName : "Select a PG"}
                  </option>
                  {pgList.map((pg) => (
                    <option key={pg.id} value={pg.id}>
                      {pg.pgName}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.pgId && (
              <p className="text-red-500 text-sm mt-2">{errors.pgId.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="px-6">
              {loading
                ? "Submitting..."
                : isEditMode
                ? "Update Assignment"
                : "Add Assignment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
