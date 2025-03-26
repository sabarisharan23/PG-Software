import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axiosInstance from "../../../AxiosInstence";
import { Button } from "../../../components/ui/button";
import { Pg } from "../../PgPage/PgList";

// Schema for form validation
const formSchema = z.object({
  pgId: z.string().min(1, { message: "Please select a PG." }),
});

type FormData = z.infer<typeof formSchema>;

export default function AddRoomTenant() {
  const navigate = useNavigate();
  const { userId, roomId } = useParams<{ userId: string; roomId: string }>();
  const isEditMode = Boolean(userId && roomId);
  const [loading, setLoading] = useState(false);
  const [pgList, setPgList] = useState<Pg[]>([]); // Store list of PGs

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pgId: "",
    },
  });

  // Fetch PG list for the dropdown
  useEffect(() => {
    const fetchPGs = async () => {
      try {
        const response = await axiosInstance.get<Pg[]>("PG/getPG");
        setPgList(response.data);
      } catch (error) {
        console.error("Error fetching PGs:", error);
        toast.error("Failed to load PGs.");
      }
    };

    fetchPGs();
  }, []);

  // Fetch room tenant details if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchRoomTenant = async () => {
        try {
          const response = await axiosInstance.get(`/getRoomTenant/${userId}/${roomId}`);
          setValue("pgId", String(response.data.pgId));
        } catch (error) {
          console.error("Error fetching room tenant:", error);
          toast.error("Failed to fetch room tenant details.");
        }
      };

      fetchRoomTenant();
    }
  }, [isEditMode, userId, roomId, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log("Submitting form...", data);

      if (isEditMode) {
        await axiosInstance.put(`/updateRoomTenant/${userId}/${roomId}`, { pgId: Number(data.pgId) });
        toast.success("Room Tenant updated successfully.");
      } else {
        await axiosInstance.post("/createRoomTenant", { pgId: Number(data.pgId) });
        toast.success("Room Tenant added successfully.");
      }

      navigate("/room-tenant-list");
    } catch (error: any) {
      console.error("Error submitting form:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to submit Room Tenant details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {isEditMode ? "Edit Room Tenant" : "Add Room Tenant"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* PG Selection Dropdown */}
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
                  <option value="">Select a PG</option>
                  {pgList.map((pg) => (
                    <option key={pg.id} value={pg.id}>
                      {pg.pgName}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.pgId && <p className="text-red-500 text-sm mt-2">{errors.pgId.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="px-6">
              {loading ? "Submitting..." : isEditMode ? "Update Room Tenant" : "Add Room Tenant"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
