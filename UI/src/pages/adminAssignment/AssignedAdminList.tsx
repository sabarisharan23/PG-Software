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

// Assigned Admin Interface
export interface AssignedAdmin {
  adminId: number;
  pgId: number;
  admin: {
    username: string;
  };
  pg: {
    pgName: string;
  };
}

export default function AssignedAdminList() {
  const navigate = useNavigate();
  const [data, setData] = useState<AssignedAdmin[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AssignedAdmin | null>(null);

  useEffect(() => {
    const fetchAssignedAdmins = async () => {
      try {
        const response = await axiosInstance.get<AssignedAdmin[]>(
          "/adminAssignment/getAllPgAdmin"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAssignedAdmins();
  }, []);

  const handleDeleteAssignment = async () => {
    if (!selectedAdmin) return;

    try {
      await axiosInstance.delete("/adminAssignment/deleteAdminAssignment", {
        data: {
          adminId: selectedAdmin.adminId,
          pgId: selectedAdmin.pgId,
        },
      });
      toast.success("Assignment deleted successfully.");

      setData((prevData) =>
        prevData.filter(
          (item) =>
            !(
              item.adminId === selectedAdmin.adminId &&
              item.pgId === selectedAdmin.pgId
            )
        )
      );

      setOpen(false);
      setSelectedAdmin(null);
    } catch (error: any) {
      console.error("Error deleting assignment:", error.response?.data || error);
      toast.error(
        error.response?.data?.message || "Failed to delete assignment."
      );
    }
  };

  const columns: Column<AssignedAdmin>[] = [
    { header: "Admin ID", accessor: "adminId" },
    { header: "PG ID", accessor: "pgId" },
    { header: "Admin Name", render: (row) => row.admin.username },
    { header: "PG Name", render: (row) => row.pg.pgName },
    {
      header: "Actions",
      render: (row: AssignedAdmin) => (
        <div className="flex gap-8">
          {/* Edit Assignment */}
          <CiEdit
            className="text-black font-bold text-2xl cursor-pointer"
            onClick={() =>
              navigate(
                `/add-assignedAdmin/${row.adminId}/${row.pgId}`
              )
            }
          />

          {/* Delete Assignment */}
          <CiEraser
            className="text-black text-2xl cursor-pointer"
            onClick={() => {
              setSelectedAdmin(row);
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
        <h1 className="text-2xl font-bold">Assigned Admin List</h1>
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/add-assignedAdmin")}
          variant="default"
        >
          Assign Admin
        </Button>
      </div>

      <div className="pt-2">
        <TableContainer
          title="List of Assigned Admins"
          columns={columns}
          data={data}
          pageSizeOptions={[5, 10, 15]}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>Delete Assignment</DialogHeader>
          <DialogDescription className="text-md">
            {selectedAdmin ? (
              <>
                Are you sure you want to remove admin{" "}
                <span className="font-semibold">
                  {selectedAdmin.admin.username}
                </span>{" "}
                from PG{" "}
                <span className="font-semibold">{selectedAdmin.pg.pgName}</span>
                ?
              </>
            ) : (
              "Assignment not selected."
            )}
          </DialogDescription>
          <DialogFooter className="flex gap-4 justify-end">
            <Button
              onClick={handleDeleteAssignment}
              variant="destructive"
              disabled={!selectedAdmin}
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
