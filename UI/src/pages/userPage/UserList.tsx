import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import TableContainer, { Column } from "../../modules/table/Table";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstence";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function UserList() {
  const navigate = useNavigate();

  const [data, setData] = useState<User[]>([]);
  console.log("USER DATA ----------->", data);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user/getUser");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers(); // Call the correct function
  }, []);

  const columns: Column<User>[] = [
    { header: "id", accessor: "id" },
    { header: "Name", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button variant={"link"}onClick={() => navigate(`/add-user/${row.id}`)}>
            Edit
          </Button>
          <Button variant={"link"} onClick={() => console.log("clicked")}>
            Delete
          </Button>
          <Button variant={"link"} onClick={() => console.log("clicked")}>
            View
          </Button>
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
          title="List of user's"
          columns={columns}
          data={data}
          pageSizeOptions={[5, 10, 15]}
        />
      </div>{" "}
    </div>
  );
}
