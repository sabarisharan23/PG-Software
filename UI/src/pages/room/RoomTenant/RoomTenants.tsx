import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import TableContainer, { Column } from "../../../modules/table/Table";
import { useEffect, useState } from "react";
import axiosInstance from "../../../AxiosInstence";
import { CiEdit, CiEraser } from "react-icons/ci";
import { toast } from "sonner";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from "../../../components/ui/dialog";

// Define the expected shape of a RoomTenant
interface RoomTenant {
  userId: number;
  roomId: number;
  pGId: number | null;
  PG: {
    id: number;
    pgName: string;
  } | null;
  room: {
    id: number;
    roomName: string;
    roomNumber: string;
  };
  user: {
    id: number;
    firstname: string;
    lastname: string;
  };
}

export default function RoomTenant() {
  const navigate = useNavigate();
  const [data, setData] = useState<RoomTenant[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedRoomTenant, setSelectedRoomTenant] =
    useState<RoomTenant | null>(null);

  useEffect(() => {
    const fetchRoomTenants = async () => {
      try {
        const response = await axiosInstance.get("/roomTenant/getRoomTenants");
        setData(response.data as RoomTenant[]);
      } catch (error) {
        console.error("Error fetching room tenants:", error);
        toast.error("Failed to fetch room tenants.");
      }
    };

    fetchRoomTenants();
  }, []);

  // Handle Delete RoomTenant
  const handleDeleteRoomTenant = async () => {
    if (!selectedRoomTenant) return;

    try {
      await axiosInstance.delete(`/roomTenant/deleteRoomTenant`, {
        data: {
          userId: selectedRoomTenant.userId,
          roomId: selectedRoomTenant.roomId,
        },
      });

      toast.success("Room-Tenant entry deleted successfully.");

      setData((prevData) =>
        prevData.filter(
          (tenant) =>
            tenant.userId !== selectedRoomTenant.userId ||
            tenant.roomId !== selectedRoomTenant.roomId
        )
      );

      setOpen(false);
      setSelectedRoomTenant(null);
    } catch (error: any) {
      console.error(
        "Error deleting room-tenant:",
        error.response?.data || error
      );
      toast.error(
        error.response?.data?.message || "Failed to delete room-tenant."
      );
    }
  };

  const columns: Column<RoomTenant>[] = [
    {
      header: "PG Name",
      render: (row) => row.PG?.pgName ?? "N/A",
    },
    {
      header: "Room Number",
      render: (row) => row.room.roomNumber,
    },
    {
      header: "Room Name",
      render: (row) => row.room.roomName,
    },
    {
      header: "User Name",
      render: (row) => `${row.user.firstname} ${row.user.lastname}`,
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-8">
          <CiEdit
            className="text-black font-bold text-2xl cursor-pointer"
            onClick={() =>
              navigate(`/edit-roomTenant/${row.userId}/${row.roomId}`)
            }
          />
          <CiEraser
            className="text-black text-2xl cursor-pointer"
            onClick={() => {
              setSelectedRoomTenant(row);
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
        <h1 className="text-2xl font-bold">Room-Tenants</h1>
        <Button onClick={() => navigate("/add-roomTenant")} variant="default">
          Add Room-Tenant
        </Button>
      </div>

      <TableContainer
        title="List of Room-Tenants"
        columns={columns}
        data={data}
        pageSizeOptions={[5, 10, 15]}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>Delete Room-Tenant</DialogHeader>
          <DialogDescription>
            {selectedRoomTenant ? (
              <>
                Are you sure you want to remove{" "}
                <span className="font-semibold">
                  {selectedRoomTenant.user.firstname}{" "}
                  {selectedRoomTenant.user.lastname}
                </span>{" "}
                from{" "}
                <span className="font-semibold">
                  {selectedRoomTenant.room.roomName}
                </span>
                ?
              </>
            ) : (
              "Room-Tenant not selected."
            )}
          </DialogDescription>
          <DialogFooter className="flex gap-4 justify-end">
            <Button
              onClick={handleDeleteRoomTenant}
              variant="destructive"
              disabled={!selectedRoomTenant}
            >
              Delete
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
