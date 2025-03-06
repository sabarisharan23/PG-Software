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

// Define the expected shape of a pg
export interface Pg {
    id: number;       
    pgName: string;   
    location: string; 
    ownedById: number;
    ownedBy: string;
    username: string;
  }
  
export default function PgList() {
  const navigate = useNavigate();
  const [data, setData] = useState<Pg[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPg, setSelectedPg] = useState<Pg | null>(null);

  useEffect(() => {
    const fetchPgs = async () => {
      try {
        const response = await axiosInstance.get<Pg[]>("/PG/getPG"); // Ensure API response is typed
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPgs();
  }, []);

  const handleDeletePg = async () => {
    if (!selectedPg) return;

    try {
      await axiosInstance.delete(`/PG/deletePG/${selectedPg.id}`);
      toast.success("Pg deleted successfully.");

      // Update the Pg list after deletion
      setData((prevData) => prevData.filter((Pg) => Pg.id !== selectedPg.id));

      // Close the dialog
      setOpen(false);
      setSelectedPg(null);
    } catch (error: any) {
      console.error("Error deleting pg:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to delete pg.");
    }
  };

  const columns: Column<Pg>[] = [
    { header: "ID", accessor: "id" },
    { header: "PG Name", accessor: "pgName" },
    { header: "Location", accessor: "location" },
    { header: "Owner ID",  render: (row) => row.ownedBy.username },
    {
      header: "Actions",
      render: (row: Pg) => (
        <div className="flex gap-8">
          {/* Edit Pg */}
          <CiEdit
            className="text-black font-bold text-2xl cursor-pointer"
            onClick={() => navigate(`/add-pg/${row.id}`)}
          />

          {/* Delete Pg Dialog Trigger */}
          <CiEraser
            className="text-black text-2xl cursor-pointer"
            onClick={() => {
              setSelectedPg(row);
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
        <h1 className="text-2xl font-bold">Pg List</h1>
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/add-pg")}
          variant="default"
        >
          Add Pg
        </Button>
      </div>

      <div className="pt-2">
        <TableContainer
          title="List of Pgs"
          columns={columns}
          data={data}
          pageSizeOptions={[5, 10, 15]}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>Delete Pg</DialogHeader>
          <DialogDescription className="text-md">
            {selectedPg ? (
              <>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{selectedPg.pgName}</span>?
              </>
            ) : (
              "Pg not selected."
            )}
          </DialogDescription>
          <DialogFooter className="flex gap-4 justify-end">
            <Button onClick={handleDeletePg} variant="destructive" disabled={!selectedPg}>
              Delete
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
