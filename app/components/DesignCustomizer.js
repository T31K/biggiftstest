"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function DesignCustomizer({
  isOpen,
  onClose,
  logoUrl,
  productImageUrl,
  setLogoUrl, // Add setLogoUrl prop to update parent state
}) {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ w: 150, h: 150 });
  const [showGuides, setShowGuides] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [remark, setRemark] = useState(""); // Add remark state

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const isResizing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const initialRect = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const processingUrl = useRef(null); // Track currently processing URL to prevent duplicates

  // Reset state when opening new logo
  useEffect(() => {
    if (isOpen) {
      setPosition({ x: 100, y: 100 });
      setSize({ w: 150, h: 150 });
      setShowGuides(false);
      setRemark(""); // Reset remark
    }
  }, [isOpen]); // Only depend on isOpen toggle

  // Background Removal Function
  const removeBg = async (currentLogoUrl) => {
    try {
      setIsLoading(true);

      // 1. Convert data URL to File
      const response = await fetch(currentLogoUrl);
      const blob = await response.blob();
      const file = new File([blob], `${uuidv4()}.png`, {
        type: "image/png",
      });

      // 2. Get Cloudflare Direct Upload URL
      const cfRes = await axios.post("https://api.t31k.cloud/cloudflare");
      const uploadURL = cfRes.data.url;

      // 3. Upload to Cloudflare
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axios.post(uploadURL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Get public URL from Cloudflare response
      // Cloudflare Images returns variants array. We'll take the first one (usually 'public' or 'default')
      const publicImageURL = uploadRes.data.result.variants[0];
      console.log(publicImageURL);
      // 4. Send to Remove BG endpoint
      const removeBgRes = await axios.post("https://api.t31k.cloud/remove-bg", {
        url: publicImageURL,
      });

      const resultUrl = removeBgRes.data.url;

      // Update the logo URL in the parent component
      if (setLogoUrl) {
        setLogoUrl(resultUrl);
      }

      setTimeout(() => setIsLoading(false), 1300);
    } catch (err) {
      console.error("Error processing image:", err);
      setIsLoading(false);
    }
  };

  // Trigger BG removal ONLY when logoUrl changes and it's a new upload (starts with data:)
  useEffect(() => {
    if (
      isOpen &&
      logoUrl &&
      logoUrl.startsWith("data:") &&
      processingUrl.current !== logoUrl
    ) {
      processingUrl.current = logoUrl;
      removeBg(logoUrl);
    }
  }, [logoUrl, isOpen]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging.current) {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;
        setPosition({
          x: initialRect.current.x + dx,
          y: initialRect.current.y + dy,
        });
      } else if (isResizing.current) {
        const dx = e.clientX - startPos.current.x;
        const dy = e.clientY - startPos.current.y;
        setSize({
          w: Math.max(50, initialRect.current.w + dx), // Min width 50
          h: Math.max(50, initialRect.current.h + dy), // Min height 50
        });
      }
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        setShowGuides(false);
      }
      isDragging.current = false;
      isResizing.current = false;
    };

    if (isOpen) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDragStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.current = true;
    setShowGuides(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    initialRect.current = {
      x: position.x,
      y: position.y,
      w: size.w,
      h: size.h,
    };
  };

  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    initialRect.current = {
      x: position.x,
      y: position.y,
      w: size.w,
      h: size.h,
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      {/* Modal Content - Slide from right */}
      <div className="w-full max-w-5xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">
            Customize Your Design
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            ✕ Close
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-100 relative flex items-center justify-center overflow-hidden p-8">
          <div
            ref={containerRef}
            className="relative bg-white shadow-sm border rounded-lg overflow-hidden"
            style={{ width: "600px", height: "600px" }}
          >
            {/* Product Image Background */}
            <img
              src={productImageUrl}
              alt="Product"
              className="w-full h-full object-contain pointer-events-none select-none"
            />

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20">
                <div className="bg-white px-4 py-2 rounded shadow-lg flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm font-medium">
                    Removing Background...
                  </span>
                </div>
              </div>
            )}

            {/* Center Guides */}
            {showGuides && (
              <>
                {/* Vertical Line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-blue-400 opacity-50 pointer-events-none border-l border-dashed"></div>
                {/* Horizontal Line */}
                <div className="absolute left-0 right-0 top-1/2 h-px bg-blue-400 opacity-50 pointer-events-none border-t border-dashed"></div>
              </>
            )}

            {/* Draggable/Resizable Logo Overlay */}
            <div
              className="absolute cursor-move group border-2 border-blue-500 hover:border-blue-600"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.w}px`,
                height: `${size.h}px`,
              }}
              onMouseDown={handleDragStart}
            >
              <img
                src={logoUrl}
                alt="Uploaded Logo"
                className="w-full h-full object-contain pointer-events-none select-none"
              />

              {/* Resize Handle */}
              <div
                className="absolute -bottom-3 -right-3 w-6 h-6 bg-blue-500 border-2 border-white rounded-full cursor-se-resize flex items-center justify-center shadow-sm z-10"
                onMouseDown={handleResizeStart}
              >
                <span className="text-white text-[8px]">↘</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer / Tools */}
        <div className="p-6 border-t bg-white flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add a Remark
            </label>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              placeholder="Enter any special instructions..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
              rows={2}
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Drag to move the logo. Drag the blue handle to resize.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, you'd save the position/size here
                  alert("Design Saved! (Mockup)");
                  onClose();
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700"
              >
                Save Design
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
