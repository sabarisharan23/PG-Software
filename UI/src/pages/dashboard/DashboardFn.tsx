import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
} from "../../components/ui/card";
import {
  HomeIcon,
  UsersIcon,
  Building2Icon,
  BellIcon,
  CalendarCheckIcon,
} from "lucide-react";
import { Column } from "../../modules/table/Table";
import TableContainer from "../../modules/table/Table";
import { ProfileForm } from "../../modules/Form";
import ApexChart from "../../modules/ApexChart";
import { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstence";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  role: string;
  email: string;
}

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalPGListings: 0,
    totalUsers: 0,
    totalRooms: 0,
    availableRooms: 0,
    totalAdmins: 0,
    totalSuperAdmins: 0,
    totalUserss: 0,
  });

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pgResponse, userResponse, roomResponse] = await Promise.all([
          axiosInstance.get("/PG/getPG"),
          axiosInstance.get("/user/getUser"),
          axiosInstance.get("/room/getRoom"),
        ]);
        setDashboardData({
          totalPGListings: Array.isArray(pgResponse.data)
            ? pgResponse.data.length
            : 0,
          totalUsers: Array.isArray(userResponse.data)
            ? userResponse.data.length
            : 0,
          totalRooms: Array.isArray(roomResponse.data)
            ? roomResponse.data.length
            : 0,
          availableRooms: Array.isArray(roomResponse.data)
            ? roomResponse.data.filter(
                (room: { availableStatus: boolean }) => room.availableStatus
              ).length
            : 0,
          totalUserss: Array.isArray(userResponse.data)
            ? userResponse.data.filter(
                (user: { role: string }) => user.role === "USER"
              ).length
            : 0,
          totalAdmins: Array.isArray(userResponse.data)
            ? userResponse.data.filter(
                (user: { role: string }) => user.role === "ADMIN"
              ).length
            : 0,
          totalSuperAdmins: Array.isArray(userResponse.data)
            ? userResponse.data.filter(
                (user: { role: string }) => user.role === "SUPER_ADMIN"
              ).length
            : 0,
        });

        setUsers(userResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to fetch dashboard data.");
      }
    }

    fetchData();
  }, []);

  const handleButtonClick = () => {
    navigate("/user-list");
  };

  const cardData = [
    {
      title: "Total PG Listings",
      borderColor: "border-t-blue-800",
      bgColor: "bg-blue-800",
      description: "Active & Pending PG Listings",
      icon: Building2Icon,
      content: dashboardData.totalPGListings,
      footer: `Active: ${dashboardData.totalPGListings - 2} | Pending: 2`,
      router: "/pg-list",
    },
    {
      title: "Total Users",
      borderColor: "border-t-green-800",
      bgColor: "bg-green-800",
      description: "Admins, PG Owners, Tenants",
      icon: UsersIcon,
      content: dashboardData.totalUsers,
      footer: `Admins: ${dashboardData.totalAdmins} | Owners:${dashboardData.totalSuperAdmins}| Tenants: ${dashboardData.totalUserss}`,
      router: "/user-list",
    },
    {
      title: "Available Rooms",
      borderColor: "border-t-purple-800",
      bgColor: "bg-purple-800",
      description: "Vacant vs. Occupied Rooms",
      icon: HomeIcon,
      content: dashboardData.totalRooms,
      footer: `Vacant: ${dashboardData.availableRooms} | Occupied: ${
        dashboardData.totalRooms - dashboardData.availableRooms
      }`,
      router: "/room-list",
    },
    {
      title: "Recent Bookings & Requests",
      borderColor: "border-t-red-800",
      bgColor: "bg-red-800",
      description: "Pending, Confirmed, Cancelled",
      icon: CalendarCheckIcon,
      content: "250",
      footer: "Pending: 50 | Confirmed: 180 | Cancelled: 20",
      router: "/bookings",
    },
    {
      title: "Alerts & Notifications",
      borderColor: "border-t-yellow-800",
      bgColor: "bg-yellow-800",
      description: "New Requests, Complaints, Updates",
      icon: BellIcon,
      content: "35",
      footer: "New: 10 | Complaints: 15 | Updates: 10",
      router: "/notifications",
    },
  ];

  const columns: Column<User>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "username" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    //  {
    //       header: "Actions",
    //       render: (row: User) => (
    //         <div className="flex gap-8">
    //           {/* Edit User */}
    //           <CiEdit
    //             className="text-black font-bold text-2xl cursor-pointer"
    //             onClick={() => navigate(`/add-user/${row.id}`)}
    //           />

    //           {/* Delete User Dialog Trigger */}
    //           <CiEraser
    //             className="text-black text-2xl cursor-pointer"
    //             onClick={() => {
    //               setSelectedUser(row);
    //               setOpen(true);
    //             }}
    //           />
    //         </div>
    //       ),
    //     },
  ];

  return (
    <div className="py-5 px-2">
      <div className="flex flex-col lg:flex-row flex-wrap items-center gap-4 md:gap-6">
        {cardData.map((item, index) => (
          <Card
            key={index}
            className={`w-96 border cursor-pointer text-sm border-t-4 ${item.borderColor}`}
            onClick={() => (window.location.href = item.router)}
          >
            <CardHeader className="text-sm">
              <div className="flex items-center gap-3">
                <CardTitle>
                  <div className="flex items-center gap-5">
                    <div
                      className={`h-10 w-10 flex justify-center items-center rounded-b-full ${item.bgColor}`}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {item.title}
                      <CardDescription className="p-0 text-xs">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-end text-2xl font-bold">
                {item.content}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center items-center gap-2">
              <p className="text-gray-500">{item.footer}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="pt-5">
        <TableContainer
          title="User List"
          columns={columns}
          data={users}
          handleButtonClick={handleButtonClick}
          buttonLabel="View All"
          pageSizeOptions={[5, 10, 15]}
        />
      </div>

      <div className="pt-5">
        <ProfileForm />
      </div>

      <div className="pt-5">
        <ApexChart />
      </div>
    </div>
  );
}
