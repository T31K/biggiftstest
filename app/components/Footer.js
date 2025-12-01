export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-12 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-600">
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Products</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">All Swag</a></li>
            <li><a href="#" className="hover:underline">Tech</a></li>
            <li><a href="#" className="hover:underline">Apparel</a></li>
            <li><a href="#" className="hover:underline">Drinkware</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Returns</a></li>
            <li><a href="#" className="hover:underline">Shipping</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Connect</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">Instagram</a></li>
            <li><a href="#" className="hover:underline">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-200 text-center text-xs">
        © {new Date().getFullYear()} Swag.com Inc. All rights reserved.
      </div>
    </footer>
  );
}

