import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import TableContainer, { Column } from "../../modules/table/Table";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const navigate = useNavigate();
  const columns: Column<User>[] = [
    { header: "id", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
  ];
  const data: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
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
