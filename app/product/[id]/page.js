"use client";

import { useState, useRef } from "react";
import TopNav from "../../components/TopNav";
import Footer from "../../components/Footer";
import DesignCustomizer from "../../components/DesignCustomizer";
import Link from "next/link";

export default function ProductPage({ params }) {
  const [selectedColor, setSelectedColor] = useState("black");
  const [isMultipleColors, setIsMultipleColors] = useState(false);

  // Customizer State
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedLogo(e.target.result);
        setIsCustomizerOpen(true);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a PNG file.");
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const productImageUrl =
    "https://biggifts.sg/wp-content/uploads/2024/03/Eco-Friendly-Kraft-Spiral-Notebook-with-Pen-A5.png";

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <TopNav />

      {/* Design Customizer Modal */}
      <DesignCustomizer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        logoUrl={uploadedLogo}
        setLogoUrl={setUploadedLogo}
        productImageUrl={productImageUrl}
      />

      <main className="flex-1 container mx-auto px-4 py-6 md:px-8">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="#" className="hover:text-gray-800">
            All Swag
          </Link>
          <span className="mx-2">/</span>
          <Link href="#" className="hover:text-gray-800">
            Office
          </Link>
          <span className="mx-2">/</span>
          <Link href="#" className="hover:text-gray-800">
            Notebooks
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">
            Eco Friendly Kraft Spiral Notebook
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Images */}
          <div className="w-full lg:w-1/2">
            <div className="flex gap-4 mb-4">
              <button className="p-2 border rounded-full hover:bg-gray-50">
                ⬇️
              </button>
              <button className="p-2 border rounded-full hover:bg-gray-50">
                ↗️
              </button>
              <button className="p-2 border rounded-full hover:bg-gray-50">
                ♡
              </button>
              <div className="flex-1"></div>
              <button className="p-2 border rounded-full hover:bg-gray-50">
                🔍
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg aspect-square flex items-center justify-center mb-4 relative overflow-hidden">
              {/* Placeholder for Main Image */}
              <div className="text-center">
                <img
                  src={productImageUrl}
                  alt="Eco Friendly Kraft Spiral Notebook"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between opacity-0 hover:opacity-100 transition-opacity">
                <button className="bg-white/80 p-2 rounded-full shadow">
                  &lt;
                </button>
                <button className="bg-white/80 p-2 rounded-full shadow">
                  &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="w-full lg:w-1/2">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Eco Friendly Kraft Spiral Notebook with Pen (A5){" "}
                <span className="text-pink-500 text-2xl align-top">🎁</span>
              </h1>
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded text-sm font-bold uppercase">
                Instant Quote
              </button>
            </div>

            <div className="text-gray-600 mb-2 text-sm leading-relaxed space-y-2">
              <p>
                <strong>Feature:</strong> Eco Friendly
              </p>
              <p>
                <strong>Type:</strong> Notebook
              </p>
              <p>
                <strong>Dimension:</strong> – 21cm(H) x 14cm (W) – A5
              </p>
              <p>
                <strong>Content:</strong> 100 Lined or Blank Pages (50 Sheets) –
                Customisable
              </p>
              <p className="text-xs italic">
                *For Lined paper, distance between each line is 8.5mm
              </p>
              <p>
                <strong>Material (Cover):</strong> Kraft Hard Cover
              </p>
              <p>
                <strong>Material (Content):</strong> 80 Gsm Recyclable Wood free
                Paper (White)
              </p>
              <p>
                <strong>Packaging:</strong> Polybag
              </p>
              <p>
                <strong>Spiral Colour:</strong> Black
              </p>
              <p>
                <strong>Color(s):</strong> Kraft Brown (Customisable to any
                colour with MOQ: 1,000 pcs)
              </p>
              <p className="text-xs italic">
                *Available at lower quantity (Subject to stock availability)
              </p>
              <p>
                <strong>Customisable with Corporate Logo:</strong> 1 Colour / 2
                Colours
              </p>
            </div>

            {/* Step 1: Colors (Disabled/Static) */}
            <div className="mt-8 py-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">
                  <span className="text-gray-400 mr-2">1</span> Choose your
                  colors
                </h2>
              </div>

              <div className="flex gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-[#8D6E63] border-2 border-pink-500 ring-1 ring-pink-500 relative"
                  title="Kraft Brown"
                >
                  {/* Checkmark to indicate selection */}
                  <span className="absolute inset-0 flex items-center justify-center text-white text-xs">
                    ✓
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2: Decoration Method */}
            <div className="py-6 border-t border-gray-100">
              <h2 className="font-bold text-lg mb-4">
                <span className="text-gray-400 mr-2">2</span> Choose your
                decoration method
              </h2>

              <button className="px-6 py-2 border-2 border-blue-500 text-blue-600 font-bold rounded bg-blue-50">
                Digital Print
              </button>

              <div className="mt-4 p-4 bg-gray-50 border border-gray-100 rounded flex gap-3 text-sm text-gray-600">
                <span className="text-blue-400 text-xl">ℹ️</span>
                <p>
                  Digital Printing is the process of printing 4CP digital-based
                  images directly onto a product using CYMK. Gradient designs
                  are accepted. PMS matches cannot be done with 4-Color Process
                  methods.
                </p>
              </div>
            </div>

            {/* Step 3: Upload Designs */}
            <div className="py-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">
                  <span className="text-gray-400 mr-2">3</span> Upload your
                  designs
                </h2>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded text-sm">
                  Template
                </button>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                Maximum file size 10Mb. For best results please upload an EPS
                file.
              </p>

              {/* New Upload Area */}
              <div className="mb-6">
                <input
                  type="file"
                  accept="image/png"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <button
                  onClick={triggerFileUpload}
                  className="w-full border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-6 rounded-lg transition-colors flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-2xl">📤</span>
                  <span>Upload PNG Logo</span>
                  <span className="text-xs text-gray-400 font-normal">
                    (Opens Customizer)
                  </span>
                </button>
              </div>

              {/* Sticky Bottom Bar area mimic */}
              <div className="mt-8 bg-gray-50 p-4 rounded-lg flex items-center justify-between sticky bottom-0 shadow-sm border border-gray-100">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs">
                    Production Time:
                  </span>
                  <div className="flex items-center gap-1 font-bold text-sm">
                    Standard - 9 Business Days{" "}
                    <span className="text-blue-400 text-xs">ⓘ</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">
                      Item price:{" "}
                      <span className="font-bold text-gray-900 text-base">
                        $69.43
                      </span>{" "}
                      <span className="text-blue-400">ⓘ</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Total:{" "}
                      <span className="font-bold text-blue-500 text-base">
                        $6,991.00
                      </span>
                    </div>
                  </div>
                  <button className="bg-[#00ADEF] hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded shadow-sm uppercase text-sm tracking-wide">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-pink-500 hover:bg-pink-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl">
          💬
        </button>
      </div>

      <Footer />
    </div>
  );
}
