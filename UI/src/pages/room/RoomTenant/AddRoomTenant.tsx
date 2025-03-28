import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axiosInstance from "../../../AxiosInstence";
import { Button } from "../../../components/ui/button";
import { Pg } from "../../Pg/PgList";

// Define types
interface User {
  id: number;
  username: string;
}

interface Room {
  id: number;
  roomName: string;
}

interface RoomTenant {
  pGId: number;
  userId: number;
  roomId: number;
}

// Form schema
const formSchema = z.object({
  pGId: z.string().min(1, "Please select a PG."),
  userId: z.string().min(1, "Please select a User."),
  roomId: z.string().min(1, "Please select a Room."),
});

type FormData = z.infer<typeof formSchema>;

export default function AddRoomTenant() {
  const navigate = useNavigate();
  const { userId, roomId } = useParams<{ userId: string; roomId: string }>();
  const isEditMode = Boolean(userId && roomId);
  const [loading, setLoading] = useState(false);
  const [pgList, setPgList] = useState<Pg[]>([]);
  const [userList, setUserList] = useState<User[]>([]);
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [selectedPgName, setSelectedPgName] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [selectedRoomName, setSelectedRoomName] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pGId: "",
      userId: "",
      roomId: "",
    },
  });

  // Fetch PGs, Users, and Rooms
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pgRes, userRes, roomRes] = await Promise.all([
          axiosInstance.get<Pg[]>("/PG/getPG"),
          axiosInstance.get<User[]>("/user/getUser"),
          axiosInstance.get<Room[]>("/room/getRoom"),
        ]);

        setPgList(pgRes.data);
        setUserList(userRes.data);
        setRoomList(roomRes.data);
      } catch (error) {
        toast.error("Failed to load data.");
      }
    };

    fetchData();
  }, []);

  // Fetch existing RoomTenant details in edit mode
  useEffect(() => {
    if (
      isEditMode &&
      userId &&
      roomId &&
      pgList.length &&
      userList.length &&
      roomList.length
    ) {
      const fetchRoomTenant = async () => {
        try {
          const { data } = await axiosInstance.get<RoomTenant>(
            `/roomTenant/getRoomTenant/${userId}/${roomId}`
          );

          setValue("pGId", String(data.pGId));
          setValue("userId", String(data.userId));
          setValue("roomId", String(data.roomId));

          // Find and set the names for dropdowns
          const pg = pgList.find((pg) => pg.id === Number(data.pGId));
          const user = userList.find((user) => user.id === Number(data.userId));
          const room = roomList.find((room) => room.id === Number(data.roomId));

          setSelectedPgName(pg ? pg.pgName : "Unknown PG");
          setSelectedUserName(user ? user.username : "Unknown User");
          setSelectedRoomName(room ? room.roomName : "Unknown Room");
        } catch {
          toast.error("Failed to fetch room tenant details.");
        }
      };

      fetchRoomTenant();
    }
  }, [isEditMode, userId, roomId, pgList, userList, roomList, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      if (isEditMode) {
        await axiosInstance.put(
          `roomTenant/updateRoomTenant/${userId}/${roomId}`,
          {
            pGId: Number(data.pGId),
            userId: Number(data.userId),
            roomId: Number(data.roomId),
          }
        );
        toast.success("Room Tenant updated successfully.");
      } else {
        await axiosInstance.post("roomTenant/createRoomTenant", {
          pGId: Number(data.pGId),
          userId: Number(data.userId),
          roomId: Number(data.roomId),
        });
        toast.success("Room Tenant added successfully.");
      }

      navigate("/room-tenants");
    } catch {
      toast.error("Failed to submit Room Tenant details.");
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
          {/* PG Dropdown */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Select PG <span className="text-red-500">*</span>
            </label>
            <Controller
              name="pGId"
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
            {errors.pGId && (
              <p className="text-red-500 text-sm mt-2">{errors.pGId.message}</p>
            )}
          </div>

          {/* User Dropdown */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Select User <span className="text-red-500">*</span>
            </label>
            <Controller
              name="userId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">
                    {isEditMode ? selectedUserName : "Select a User"}
                  </option>
                  {userList.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.userId && (
              <p className="text-red-500 text-sm mt-2">
                {errors.userId.message}
              </p>
            )}
          </div>

          {/* Room Dropdown */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Select Room <span className="text-red-500">*</span>
            </label>
            <Controller
              name="roomId"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  <option value="">
                    {isEditMode ? selectedRoomName : "Select a Room"}
                  </option>
                  {roomList.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.roomName}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.roomId && (
              <p className="text-red-500 text-sm mt-2">
                {errors.roomId.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={loading} className="px-6">
              {loading
                ? "Submitting..."
                : isEditMode
                ? "Update Room Tenant"
                : "Add Room Tenant"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
