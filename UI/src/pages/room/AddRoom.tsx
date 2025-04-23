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
  roomType: z.enum([
    "SINGLE",
    "DOUBLE",
    "TRIPLE",
    "QUADRUPLE",
    "STANDARD",
    "PREMIUM",
  ]),
  floor: z.coerce.number().min(0),
  blockName: z.string().min(1),
  rentPrice: z.coerce.number().min(0),
  depositPrice: z.coerce.number().min(0),
  roomSize: z.coerce.number().min(1),
  availableStatus: z.boolean(),
  attachedBathrooms: z.boolean(),
  balconyStatus: z.boolean(),
  cctvStatus: z.boolean(),
  airConditioned: z.boolean(),
  wifi: z.boolean(),
  refrigerator: z.boolean(),
  housekeeping: z.boolean(),
  powerBackup: z.boolean(),
  bedding: z.boolean(),
  lift: z.boolean(),
  drinkingWater: z.boolean(),
  highSpeedWifi: z.boolean(),
  hotWaterSupply: z.boolean(),
  professionalHousekeeping: z.boolean(),
  laundryFacilities: z.boolean(),
  biometricEntry: z.boolean(),
  hotMealsIncluded: z.boolean(),
  security24x7: z.boolean(),
  diningArea: z.boolean(),
  foodMenu: z
    .object({
      breakfast: z.array(z.string()).optional(),
      lunch: z.array(z.string()).optional(),
      dinner: z.array(z.string()).optional(),
    })
    .nullable(),
  pgId: z.coerce.number().min(1),
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
      airConditioned: false,
      wifi: false,
      refrigerator: false,
      housekeeping: false,
      powerBackup: false,
      bedding: false,
      lift: false,
      drinkingWater: false,
      highSpeedWifi: false,
      hotWaterSupply: false,
      professionalHousekeeping: false,
      laundryFacilities: false,
      biometricEntry: false,
      hotMealsIncluded: false,
      security24x7: false,
      diningArea: false,
      foodMenu: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
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
      toast.error(
        error.response?.data?.message || "Failed to submit room details."
      );
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
                  <label className="text-sm font-semibold text-gray-700">
                    {label} *
                  </label>
                  <Controller
                    name={name as keyof FormData}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type={type}
                        className="w-full border border-gray-300 rounded-lg p-2"
                      />
                    )}
                  />
                  {errors[name as keyof FormData] && (
                    <p className="text-red-500 text-sm">
                      {errors[name as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-6">
              {[
                { name: "rentPrice", label: "Rent Price", type: "number" },
                {
                  name: "depositPrice",
                  label: "Deposit Price",
                  type: "number",
                },
                { name: "roomSize", label: "Room Size", type: "number" },
                { name: "pgId", label: "PG ID", type: "number" },
              ].map(({ name, label, type }) => (
                <div key={name}>
                  <label className="text-sm font-semibold text-gray-700">
                    {label} *
                  </label>
                  <Controller
                    name={name as keyof FormData}
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type={type}
                        className="w-full border border-gray-300 rounded-lg p-2"
                      />
                    )}
                  />
                  {errors[name as keyof FormData] && (
                    <p className="text-red-500 text-sm">
                      {errors[name as keyof FormData]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Room Type Dropdown */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Room Type *
            </label>
            <Controller
              name="roomType"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  {[
                    "SINGLE",
                    "DOUBLE",
                    "TRIPLE",
                    "QUADRUPLE",
                    "STANDARD",
                    "PREMIUM",
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Boolean Checkboxes (Fixed Type Issues) */}
          <div className="grid grid-cols-2 gap-4">
            {[
              "airConditioned",
              "wifi",
              "refrigerator",
              "housekeeping",
              "powerBackup",
              "bedding",
              "lift",
              "cctvStatus",
              "availableStatus",
              "attachedBathrooms",
              "balconyStatus",
              "drinkingWater",
              "highSpeedWifi",
              "hotWaterSupply",
              "professionalHousekeeping",
              "laundryFacilities",
              "biometricEntry",
              "hotMealsIncluded",
              "security24x7",
              "diningArea",
            ].map((name) => (
              <div key={name} className="flex items-center">
                <Controller
                  name={name as keyof FormData}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="checkbox"
                      className="w-5 h-5 mr-2"
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
                <label className="text-sm font-semibold text-gray-700 capitalize">
                  {name.replace(/([A-Z])/g, " $1")}
                </label>
              </div>
            ))}
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Food Menu (comma-separated)
            </label>
            {["breakfast", "lunch", "dinner"].map((meal) => (
              <div key={meal} className="mb-2">
                <label className="text-sm text-gray-600 capitalize">
                  {meal}
                </label>
                <Controller
                  name={`foodMenu.${meal}` as const}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value.split(",").map((item) => item.trim())
                        )
                      }
                    />
                  )}
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="px-6">
              {loading
                ? "Submitting..."
                : isEditMode
                ? "Update Room"
                : "Add Room"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
