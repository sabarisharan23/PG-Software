import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import TableContainer, { Column } from "../../modules/table/Table";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstence";
import { CiEdit, CiEraser } from "react-icons/ci";
import { toast } from "sonner";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from "../../components/ui/dialog";

// Define the expected shape of a Room
interface Room {
  id: number;
  roomNumber: number;
  roomName: string;
  roomType: string;
  floor: number;
  blockName: string;
  rentPrice: number;
  depositPrice: number;
  roomSize: number;
  availableStatus: boolean;
  attachedBathrooms: boolean;
  balconyStatus: boolean;
  cctvStatus: boolean;
  airConditioned: boolean;
  wifi: boolean;
  refrigerator: boolean;
  housekeeping: boolean;
  powerBackup: boolean;
  bedding: boolean;
  lift: boolean;
  drinkingWater: boolean;
  highSpeedWifi: boolean;
  hotWaterSupply: boolean;
  professionalHousekeeping: boolean;
  laundryFacilities: boolean;
  biometricEntry: boolean;
  hotMealsIncluded: boolean;
  security24x7: boolean;
  diningArea: boolean;
  foodMenu: string | null;
  pg: {
    pgName: string;
  };
}


export default function RoomList() {
  const navigate = useNavigate();
  const [data, setData] = useState<Room[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get("/room/getRoom");
        setData(response.data as Room[]);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleDeleteRoom = async () => {
    if (!selectedRoom) return;

    try {
      await axiosInstance.delete(`/room/deleteRoom/${selectedRoom.id}`);
      toast.success("Room deleted successfully.");

      setData((prevData) => prevData.filter((room) => room.id !== selectedRoom.id));

      setOpen(false);
      setSelectedRoom(null);
    } catch (error: any) {
      console.error("Error deleting room:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to delete room.");
    }
  };
  const columns: Column<Room>[] = [
    { header: "Room No.", accessor: "roomNumber" },
    { header: "Room Name", accessor: "roomName" },
    { header: "PG", render: (row) => row.pg?.pgName ?? "N/A" },
    { header: "Type", accessor: "roomType" },
    { header: "Floor", accessor: "floor" },
    { header: "Block", accessor: "blockName" },
    { header: "Rent", accessor: "rentPrice" },
    { header: "Deposit", accessor: "depositPrice" },
    { header: "Size", accessor: "roomSize" },
    { header: "Available", render: (row) => (row.availableStatus ? "Yes" : "No") },
    { header: "Attached Bath", render: (row) => (row.attachedBathrooms ? "Yes" : "No") },
    { header: "Balcony", render: (row) => (row.balconyStatus ? "Yes" : "No") },
    { header: "CCTV", render: (row) => (row.cctvStatus ? "Yes" : "No") },
    { header: "AC", render: (row) => (row.airConditioned ? "Yes" : "No") },
    { header: "Wi-Fi", render: (row) => (row.wifi ? "Yes" : "No") },
    { header: "Refrigerator", render: (row) => (row.refrigerator ? "Yes" : "No") },
    { header: "Housekeeping", render: (row) => (row.housekeeping ? "Yes" : "No") },
    { header: "Power Backup", render: (row) => (row.powerBackup ? "Yes" : "No") },
    { header: "Bedding", render: (row) => (row.bedding ? "Yes" : "No") },
    { header: "Lift", render: (row) => (row.lift ? "Yes" : "No") },
    { header: "Drinking Water", render: (row) => (row.drinkingWater ? "Yes" : "No") },
    { header: "High-Speed Wi-Fi", render: (row) => (row.highSpeedWifi ? "Yes" : "No") },
    { header: "Hot Water", render: (row) => (row.hotWaterSupply ? "Yes" : "No") },
    { header: "Pro Housekeeping", render: (row) => (row.professionalHousekeeping ? "Yes" : "No") },
    { header: "Laundry", render: (row) => (row.laundryFacilities ? "Yes" : "No") },
    { header: "Biometric Entry", render: (row) => (row.biometricEntry ? "Yes" : "No") },
    { header: "Hot Meals", render: (row) => (row.hotMealsIncluded ? "Yes" : "No") },
    { header: "24x7 Security", render: (row) => (row.security24x7 ? "Yes" : "No") },
    { header: "Dining Area", render: (row) => (row.diningArea ? "Yes" : "No") },
    { header: "Food Menu", render: (row) => {
      if (row.foodMenu && typeof row.foodMenu === 'object') {
          return Object.entries(row.foodMenu).map(([key, value]) => `${key}: ${value}`).join(", ");
      }
      return row.foodMenu || "N/A";
  } },
    
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-4">
          <CiEdit
            className="text-black text-xl cursor-pointer"
            onClick={() => navigate(`/add-room/${row.id}`)}
          />
          <CiEraser
            className="text-black text-xl cursor-pointer"
            onClick={() => {
              setSelectedRoom(row);
              setOpen(true);
            }}
          />
        </div>
      ),
    },
  ];
  

  return (
    <div className="flex flex-col gap-4 p-4 overflow-x-hidden">
      <div className="flex flex-row justify-between items-center overflow-hidden">
        <h1 className="text-2xl font-bold">Room List</h1>
        <Button onClick={() => navigate("/add-room")} variant="default">
          Add Room
        </Button>
      </div>

      <TableContainer title="List of Rooms" columns={columns} data={data} pageSizeOptions={[5, 10, 15]} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>Delete Room</DialogHeader>
          <DialogDescription>
            {selectedRoom ? (
              <>
                Are you sure you want to delete <span className="font-semibold">{selectedRoom.roomName}</span>?
              </>
            ) : (
              "Room not selected."
            )}
          </DialogDescription>
          <DialogFooter className="flex gap-4 justify-end">
            <Button onClick={handleDeleteRoom} variant="destructive" disabled={!selectedRoom}>
              Delete
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
