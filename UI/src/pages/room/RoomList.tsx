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
  pg:{
    pgName: string;
  }
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
    { header: "Room Number", accessor: "roomNumber" },
    { header: "Room Name", accessor: "roomName" },
    { header: "PG", render: (row) => row.pg.pgName },
    { header: "Type", accessor: "roomType" },
    { header: "Floor", accessor: "floor" },
    { header: "Block", accessor: "blockName" },
    { header: "Rent Price", accessor: "rentPrice" },
    { header: "Deposit Price", accessor: "depositPrice" },
    { header: "Room Size", accessor: "roomSize" },
    // { header: "Attached Bathrooms", render: (row) => (row.attachedBathrooms ? "Yes" : "No") },
    // { header: "Balcony", render: (row) => (row.balconyStatus ? "Yes" : "No") },
    // { header: "CCTV Installed", render: (row) => (row.cctvStatus ? "Yes" : "No") },

    { header: "Availability", render: (row) => (row.availableStatus ? "Available" : "Occupied") },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-8">
          <CiEdit
            className="text-black font-bold text-2xl cursor-pointer"
            onClick={() => navigate(`/add-room/${row.id}`)}
          />
          <CiEraser
            className="text-black text-2xl cursor-pointer"
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
