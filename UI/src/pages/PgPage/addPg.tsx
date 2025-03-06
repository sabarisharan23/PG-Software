import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstence";
import { toast } from "sonner";

// Schema for PG form validation
const formSchema = z.object({
  pgName: z
    .string()
    .min(2, { message: "PG Name must be at least 2 characters." }),
  location: z.string().min(2, { message: "Location is required." }),
  ownedById: z.number().min(1, { message: "Owner ID is required." }),
});

type FormData = z.infer<typeof formSchema>;

export default function AddPg() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
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
      pgName: "",
      location: "",
      ownedById: undefined,
    },
  });

  useEffect(() => {
    if (isEditMode && id) {
      const fetchPG = async () => {
        try {
          const response = await axiosInstance.get(`/pg/getPG/${id}`);
          const pgData = response.data;

          setValue("pgName", pgData.pgName);
          setValue("location", pgData.location);
          setValue("ownedById", pgData.ownedById);
        } catch (error) {
          console.error("Error fetching PG:", error);
          toast.error("Failed to fetch PG details.");
        }
      };

      fetchPG();
    }
  }, [isEditMode, id, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      console.log("Submitting form...", data);
  
      const payload = {
        ...data,
        ownedById: Number(data.ownedById), // Ensure ownedById is a number
      };
  
      if (isEditMode && id) {
        console.log("Updating PG with ID:", id);
        await axiosInstance.put(`/pg/updatePG/${id}`, payload);
        toast.success("PG updated successfully.");
      } else {
        
        console.log("Creating new PG...", payload);
        await axiosInstance.post(`/pg/createPG`, payload);
        toast.success("PG created successfully.");
        reset();
      }
  
      navigate("/pg-list");
    } catch (error: any) {
      console.error("Error submitting form:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to submit PG details.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {isEditMode ? "Edit PG" : "Add PG"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  PG Name <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="pgName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter PG Name"
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  )}
                />
                {errors.pgName && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.pgName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Location <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter Location"
                      className="w-full border border-gray-300 rounded-lg p-2"
                    />
                  )}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Owner ID <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="ownedById"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="Enter Owner ID"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || undefined)
                      }
                    />
                  )}
                />

                {errors.ownedById && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.ownedById.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="px-6">
              {loading ? "Submitting..." : isEditMode ? "Update PG" : "Add PG"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
