const PGShowcase = () => {
  return (
    <section className="relative w-screen h-screen  overflow-hidden flex items-center justify-center px-4 sm:px-12">
      {/* Background Text */}
      <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[13vw] font-serif font-bold text-gray-300 z-0 pointer-events-none select-none whitespace-nowrap">
        stay &nbsp; closer
      </h1>

      {/* PG Image */}
      <img
        src="/png5.png"
        alt="PG Room"
        className="pr-28 z-10 h-[500px] sm:h-[850px] drop-shadow-2xl object-contain"
      />

      {/* Floating Info Card */}
      <div className="absolute left-[12%] top-[35%] bg-white shadow-lg rounded-xl p-4 w-[240px] z-20">
        <h3 className="text-lg font-semibold text-gray-800">Urban Nest PG</h3>
        <p className="text-sm text-gray-500">Indiranagar, Bangalore</p>
        <p className="mt-2 text-xs text-gray-500">
          Cozy shared rooms with WiFi, meals, and daily housekeeping.
        </p>
      </div>

      {/* Price + CTA Card */}
      <div className="absolute left-[20%] top-[67%] bg-white rounded-full px-4 py-2 shadow-md z-30 flex items-center gap-4">
        <div>
          <p className="text-xs text-gray-400">From</p>
          <p className="text-sm font-medium text-gray-800">₹7,500/mo</p>
        </div>
        <button className="bg-black text-white text-sm px-4 py-1 rounded-full hover:bg-gray-900 transition">
          Book now
        </button>
      </div>
    </section>
  );
};

export default PGShowcase;
