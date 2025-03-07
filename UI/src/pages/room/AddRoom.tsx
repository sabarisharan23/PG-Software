import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstence";
import { toast } from "sonner";

// Schema for Room form validation
const formSchema = z.object({
  roomNumber: z.coerce.number().min(1, "Room Number is required."),
  roomName: z.string().min(2, "Room Name is required."),
  roomType: z.enum(["SINGLE", "DOUBLE", "TRIPLE", "QUADRUPLE", "STANDARD", "PREMIUM"]),
  floor: z.coerce.number().min(0, "Floor number must be non-negative."),
  blockName: z.string().min(1, "Block Name is required."),
  rentPrice: z.coerce.number().min(0, "Rent Price must be non-negative."),
  depositPrice: z.coerce.number().min(0, "Deposit Price must be non-negative."),
  roomSize: z.coerce.number().min(1, "Room Size must be at least 1."),
  availableStatus: z.boolean(),
  attachedBathrooms: z.boolean(),
  balconyStatus: z.boolean(),
  cctvStatus: z.boolean(),
  pgId: z.coerce.number().min(1, "PG ID is required."),
});

type FormData = z.infer<typeof formSchema>;

export default function AddRoom() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roomNumber: 0,
      roomName: "",
      roomType: "SINGLE",
      floor: 0,
      blockName: "",
      rentPrice: 0,
      depositPrice: 0,
      roomSize: 0,
      availableStatus: false,
      attachedBathrooms: false,
      balconyStatus: false,
      cctvStatus: false,
      pgId: 0,
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      const fetchRoom = async () => {
        try {
          const response = await axiosInstance.get(`/room/getRoom/${id}`);
          const roomData = response.data;

          Object.keys(roomData).forEach((key) => {
            setValue(key as keyof FormData, roomData[key]);
          });
        } catch (error) {
          console.error("Error fetching room:", error);
          toast.error("Failed to fetch room details.");
        }
      };

      fetchRoom();
    }
  }, [isEditMode, id, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log("Submitting form...", data);

      if (isEditMode && id) {
        await axiosInstance.put(`/room/updateRoom/${id}`, data);
        toast.success("Room updated successfully.");
      } else {
        await axiosInstance.post(`/room/createRoom`, data);
        toast.success("Room created successfully.");
        reset();
      }

      navigate("/room-list");
    } catch (error: any) {
      console.error("Error submitting form:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to submit room details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {isEditMode ? "Edit Room" : "Add Room"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-6">
              {[
                { name: "roomNumber", label: "Room Number", type: "number" },
                { name: "roomName", label: "Room Name", type: "text" },
                { name: "floor", label: "Floor", type: "number" },
                { name: "blockName", label: "Block Name", type: "text" },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="text-sm font-semibold text-gray-700">{label} *</label>
                  <Controller
                    name={name as keyof FormData}
                    control={control}
                    render={({ field }) => (
                      <input {...field} type={type} className="w-full border border-gray-300 rounded-lg p-2" />
                    )}
                  />
                  {errors[name as keyof FormData] && <p className="text-red-500 text-sm">{errors[name as keyof FormData]?.message}</p>}
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-6">
              {[
                { name: "rentPrice", label: "Rent Price", type: "number" },
                { name: "depositPrice", label: "Deposit Price", type: "number" },
                { name: "roomSize", label: "Room Size", type: "number" },
                { name: "pgId", label: "PG ID", type: "number" },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="text-sm font-semibold text-gray-700">{label} *</label>
                  <Controller
                    name={name as keyof FormData}
                    control={control}
                    render={({ field }) => (
                      <input {...field} type={type} className="w-full border border-gray-300 rounded-lg p-2" />
                    )}
                  />
                  {errors[name as keyof FormData] && <p className="text-red-500 text-sm">{errors[name as keyof FormData]?.message}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Room Type Dropdown */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Room Type *</label>
            <Controller
              name="roomType"
              control={control}
              render={({ field }) => (
                <select {...field} className="w-full border border-gray-300 rounded-lg p-2">
                  {["SINGLE", "DOUBLE", "TRIPLE", "QUADRUPLE", "STANDARD", "PREMIUM"].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Boolean Checkboxes (Fixed Type Issues) */}
          <div className="flex flex-wrap gap-6">
            {[
              { name: "availableStatus", label: "Available" },
              { name: "attachedBathrooms", label: "Attached Bathrooms" },
              { name: "balconyStatus", label: "Balcony" },
              { name: "cctvStatus", label: "CCTV Installed" },
            ].map(({ name, label }) => (
              <div key={name} className="flex items-center">
                <Controller
                  name={name as keyof FormData}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="checkbox"
                      className="w-5 h-5 mr-2"
                      checked={!!field.value} // ✅ Fixed boolean issue
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
                <label className="text-sm font-semibold text-gray-700">{label}</label>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="px-6">
              {loading ? "Submitting..." : isEditMode ? "Update Room" : "Add Room"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
