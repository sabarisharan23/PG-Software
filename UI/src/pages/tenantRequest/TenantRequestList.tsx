import { Button } from "../../components/ui/button";
import TableContainer, { Column } from "../../modules/table/Table";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstence";
import { toast } from "sonner";
import { CiEraser } from "react-icons/ci";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from "../../components/ui/dialog";

// Tenant Request Interface
export interface TenantRequest {
  id: number;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
  pg: {
    id: number;
    pgName: string;
  };
  room: {
    id: number;
    roomName: string;
    roomNumber: number;
  };
}

export default function TenantRequestList() {
  const [data, setData] = useState<TenantRequest[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<TenantRequest | null>(null);

  useEffect(() => {
    const fetchTenantRequests = async () => {
      try {
        const response = await axiosInstance.get<TenantRequest[]>("/request/getRequest");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchTenantRequests();
  }, []);

  const handleDeleteRequest = async () => {
    if (!selectedRequest) return;

    try {
      await axiosInstance.delete(`/request/deleteRequest/${selectedRequest.id}`);
      toast.success("Request deleted successfully.");

      setData((prevData) =>
        prevData.filter((req) => req.id !== selectedRequest.id)
      );

      setOpen(false);
      setSelectedRequest(null);
    } catch (error: any) {
      console.error("Error deleting request:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to delete request.");
    }
  };

  const columns: Column<TenantRequest>[] = [
    { header: "User Name", render: (row) => row.user.username },
    { header: "Requested PG", render: (row) => row.pg.pgName },
    { header: "Room Number", render: (row) => row.room.roomNumber.toString() },
    { header: "Requested Room", render: (row) => row.room.roomName },
    { header: "Requested At", render: (row) => new Date(row.createdAt).toLocaleString() },
    {
      header: "Actions",
      render: (row: TenantRequest) => (
        <div className="flex gap-4">
          <CiEraser
            className="text-black text-2xl cursor-pointer"
            onClick={() => {
              setSelectedRequest(row);
              setOpen(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Tenant Request List</h1>
      </div>

      <div className="pt-2">
        <TableContainer
          title="List of Tenant Requests"
          columns={columns}
          data={data}
          pageSizeOptions={[5, 10, 15]}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>Delete Request</DialogHeader>
          <DialogDescription className="text-md">
            {selectedRequest ? (
              <>
                Are you sure you want to delete request by{" "}
                <span className="font-semibold">{selectedRequest.user.username}</span>?
              </>
            ) : (
              "Request not selected."
            )}
          </DialogDescription>
          <DialogFooter className="flex gap-4 justify-end">
            <Button
              onClick={handleDeleteRequest}
              variant="destructive"
              disabled={!selectedRequest}
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
