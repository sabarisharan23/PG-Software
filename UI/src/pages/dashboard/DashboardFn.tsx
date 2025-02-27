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

export default function SuperAdminDashboard() {
  const cardData = [
    {
      title: "Total PG Listings",
      borderColor: "border-t-blue-800",
      bgColor: "bg-blue-800",
      description: "Active & Pending PG Listings",
      icon: Building2Icon,
      content: "150",
      footer: "Active: 140 | Pending: 10",
      router:"/pg-listings",
    },
    {
      title: "Total Users",
      borderColor: "border-t-green-800",
      bgColor: "bg-green-800",
      description: "Admins, PG Owners, Tenants",
      icon: UsersIcon,
      content: "5000",
      footer: "Admins: 50 | Owners: 200 | Tenants: 4750",
      router:"/users",
    },
    {
      title: "Available Rooms",
      borderColor: "border-t-purple-800",
      bgColor: "bg-purple-800",
      description: "Vacant vs. Occupied Rooms",
      icon: HomeIcon,
      content: "1200",
      footer: "Vacant: 300 | Occupied: 900",
      router:"/rooms",
    },
    {
      title: "Recent Bookings & Requests",
      borderColor: "border-t-red-800",
      bgColor: "bg-red-800",
      description: "Pending, Confirmed, Cancelled",
      icon: CalendarCheckIcon,
      content: "250",
      footer: "Pending: 50 | Confirmed: 180 | Cancelled: 20",
      router:"/bookings",
    },
    {
      title: "Alerts & Notifications",
      borderColor: "border-t-yellow-800",
      bgColor: "bg-yellow-800",
      description: "New Requests, Complaints, Updates",
      icon: BellIcon,
      content: "35",
      footer: "New: 10 | Complaints: 15 | Updates: 10",
      router:"/notifications",
    },
  ];

  return (
    <div className="py-5 px-2">
      <div className="flex flex-col lg:flex-row flex-wrap  items-center gap-4 md:gap-6 ">
        {cardData.map((item, index) => (
          <Card
            key={index}
            className={`w-96 border cursor-pointer border-t-4 ${item.borderColor}`}
            onClick={()=>(item.router)}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <CardTitle className="">
                  <div className="flex items-center gap-5">
                    <div
                      className={`h-10 w-10 flex justify-center items-center rounded-b-full ${item.bgColor}`}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {item.title}
                      <CardDescription className="p-0">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className=" flex justify-center items-end text-3xl font-bold">{item.content}</div>
            </CardContent>
            <CardFooter className="flex justify-center items-center gap-2">
              <p className="text-gray-500">{item.footer}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-lg font-bold ">5000</div>
    </div>
  );
}
