import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 font-sans">
      <h1 className="text-4xl font-bold text-gray-800">BigGifts Demo</h1>
      <p className="text-gray-500 mb-12 mt-2">Choose a feature to demo</p>

      <div className="flex flex-col md:flex-row gap-8 px-4 max-w-4xl w-full">
        {/* Card 1: Product Page */}
        <Link href="/product/1" className="flex-1 group">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-80 relative border-2 border-transparent hover:border-blue-500 flex flex-col">
            <div className="flex-1 bg-gray-50 flex items-center justify-center text-6xl">
              🎁
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600">
                Product Page
              </h2>
              <p className="text-gray-500">
                View and customize a specific product directly.
              </p>
            </div>
          </div>
        </Link>

        {/* Card 2: Product Finder */}
        <Link href="/product-finder" className="flex-1 group">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-80 relative border-2 border-transparent hover:border-[#00ADEF] flex flex-col">
            <div className="flex-1 bg-blue-50 flex items-center justify-center text-6xl">
              🤖
            </div>
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#00ADEF]">
                Product Finder AI
              </h2>
              <p className="text-gray-500">Find the perfect corporate gifts</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
