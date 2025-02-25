import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "../../components/ui/card";
import {
  HomeIcon,
  UsersIcon,
  FileTextIcon,
  Building2Icon,
  BellIcon,
  CalendarCheckIcon,
} from "lucide-react"; // Importing icons

export default function SuperAdminDashboard() {
  const cardData = [
    {
      title: "Total PG Listings",
      borderColor: "border-t-blue-700",
      description: "Active & Pending PG Listings",
      icon: Building2Icon,
      content: "150",
      footer: "Active: 140 | Pending: 10",
    },
    {
      title: "Total Users",
      borderColor: "border-t-green-700",
      description: "Admins, PG Owners, Tenants",
      icon: UsersIcon,
      content: "5000",
      footer: "Admins: 50 | Owners: 200 | Tenants: 4750",
    },
    {
      title: "Available Rooms",
      borderColor: "border-t-purple-700",
      description: "Vacant vs. Occupied Rooms",
      icon: HomeIcon,
      content: "1200",
      footer: "Vacant: 300 | Occupied: 900",
    },
    {
      title: "Recent Bookings & Requests",
      borderColor: "border-t-red-700",
      description: "Pending, Confirmed, Cancelled",
      icon: CalendarCheckIcon,
      content: "250",
      footer: "Pending: 50 | Confirmed: 180 | Cancelled: 20",
    },
    {
      title: "Alerts & Notifications",
      borderColor: "border-t-yellow-700",
      description: "New Requests, Complaints, Updates",
      icon: BellIcon,
      content: "35",
      footer: "New: 10 | Complaints: 15 | Updates: 10",
    },
  ];

  return (
    <div className="py-4 px-6">
      <div className="flex flex-col lg:flex-row  gap-4 md:gap-6">
        {" "}
        {/* Grid layout for better alignment */}
        {cardData.map((item, index) => (
          <Card
            key={index}
            className={`p-5  border border-t-4 ${item.borderColor}`}
          >
            <div className="flex items-center gap-3">
              {" "}
              {/* Icon + Title */}
              <div
                className={`${item.borderColor.replace(
                  "border-t-",
                  "bg-"
                )} flex justify-center items-center h-10 w-10 rounded-b-full`}
              >
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle>{item.title}</CardTitle>
            </div>
            <CardDescription>{item.description}</CardDescription>
            <CardContent>
              <p className="text-3xl font-bold">{item.content}</p>
            </CardContent>
            <CardFooter>
              <p className="text-gray-500">{item.footer}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
