import Link from 'next/link';

export default function TopNav() {
  return (
    <header className="w-full">
      {/* Main Header */}
      <div className="bg-[#00ADEF] text-white py-3 px-4 md:px-8 flex items-center justify-between">
        {/* Left: Logo and Phone */}
        <div className="flex items-center gap-6">
          <Link href="/" className="border-2 border-white px-2 py-1 font-bold text-lg tracking-widest">
            SWAG.COM
          </Link>
          <span className="hidden md:inline text-sm font-medium">📞 718-878-4442</span>
        </div>

        {/* Middle: Search */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search by product name or type"
              className="w-full py-2 pl-10 pr-4 rounded-sm text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-6 text-sm font-bold">
          <Link href="#" className="hidden lg:block">Shop Products</Link>
          <Link href="#" className="hidden md:block">Log In</Link>
          <Link href="#" className="hidden md:block">Sign Up</Link>
          <button className="hover:opacity-80">
            <span className="sr-only">Wishlist</span>
            🤍
          </button>
          <button className="flex items-center gap-1 hover:opacity-80">
            <span className="sr-only">Cart</span>
            🛒
            <span className="bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
          </button>
        </div>
      </div>

      {/* Sub Header / Breadcrumbsish area if needed, skipping for now based on image */}
    </header>
  );
}

