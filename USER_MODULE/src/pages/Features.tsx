import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaWifi,
  FaUtensils,
  FaBed,
} from "react-icons/fa";

interface PGCardProps {
  name: string;
  location: string;
  price: string;
  image: string;
  amenities: string[];
}

const pgListings: PGCardProps[] = [
  {
    name: "Urban Nest PG",
    location: "Indiranagar, Bangalore",
    price: "7,500/mo",
    image: "/img2.jpg",
    amenities: ["WiFi", "Food", "Furnished"],
  },
  {
    name: "SkyStay Homes",
    location: "Koramangala, Bangalore",
    price: "8,200/mo",
    image: "/img1.jpg",
    amenities: ["WiFi", "Food", "Bed"],
  },
  {
    name: "CosyLiving PG",
    location: "HSR Layout, Bangalore",
    price: "6,800/mo",
    image: "/img2.jpg",
    amenities: ["WiFi", "Furnished"],
  },
];

const FeaturedListings = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#dff4ff] to-[#f1f5f9] py-24 px-6 md:px-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
          Discover <span className="text-blue-500">Top PGs</span> in Your City
        </h2>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Premium spaces for students and professionals—handpicked for quality,
          comfort, and location.
        </p>
      </div>

      {/* Listings Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {pgListings.map((pg, index) => (
          <div
            key={index}
            className="group bg-white/30 backdrop-blur-md border border-gray-200 rounded-3xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            {/* Image */}
            <div className="h-56 w-full overflow-hidden">
              <img
                src={pg.image}
                alt={pg.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="p-6 flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-gray-800">
                {pg.name}
              </h3>
              <p className="flex items-center text-sm text-gray-600">
                <FaMapMarkerAlt className="text-blue-400 mr-2" />
                {pg.location}
              </p>
              <div className="flex items-center text-lg font-medium text-gray-800 mt-1">
                <FaRupeeSign className="mr-1" />
                {pg.price}
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mt-4">
                {pg.amenities.includes("WiFi") && (
                  <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    <FaWifi /> WiFi
                  </span>
                )}
                {pg.amenities.includes("Food") && (
                  <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    <FaUtensils /> Food
                  </span>
                )}
                {(pg.amenities.includes("Furnished") ||
                  pg.amenities.includes("Bed")) && (
                  <span className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    <FaBed />
                    {pg.amenities.includes("Furnished")
                      ? "Furnished"
                      : "Bed"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedListings;
