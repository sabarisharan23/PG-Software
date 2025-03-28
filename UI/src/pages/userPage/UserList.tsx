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

// Define the expected shape of a user
interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function UserList() {
  const navigate = useNavigate();
  const [data, setData] = useState<User[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get<User[]>("/user/getUser"); // Ensure API response is typed
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await axiosInstance.delete(`/user/deleteUser/${selectedUser.id}`);
      toast.success("User deleted successfully.");

      // Update the user list after deletion
      setData((prevData) => prevData.filter((user) => user.id !== selectedUser.id));

      // Close the dialog
      setOpen(false);
      setSelectedUser(null);
    } catch (error: any) {
      console.error("Error deleting user:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to delete user.");
    }
  };

  const columns: Column<User>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    {
      header: "Actions",
      render: (row: User) => (
        <div className="flex gap-8">
          {/* Edit User */}
          <CiEdit
            className="text-black font-bold text-2xl cursor-pointer"
            onClick={() => navigate(`/add-user/${row.id}`)}
          />

          {/* Delete User Dialog Trigger */}
          <CiEraser
            className="text-black text-2xl cursor-pointer"
            onClick={() => {
              setSelectedUser(row);
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
        <h1 className="text-2xl font-bold">User List</h1>
        <Button
          className="cursor-pointer"
          onClick={() => navigate("/add-user")}
          variant="default"
        >
          Add User
        </Button>
      </div>

      <div className="pt-2">
        <TableContainer
          title="List of Users"
          columns={columns}
          data={data}
          pageSizeOptions={[5, 10, 15]}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>Delete User</DialogHeader>
          <DialogDescription className="text-md">
            {selectedUser ? (
              <>
                Are you sure you want to delete{" "}
                <span className="font-semibold">{selectedUser.username}</span>?
              </>
            ) : (
              "User not selected."
            )}
          </DialogDescription>
          <DialogFooter className="flex gap-4 justify-end">
            <Button onClick={handleDeleteUser} variant="destructive" disabled={!selectedUser}>
              Delete
            </Button>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
