import React, { useState, useEffect, useRef } from "react";

function BookShell() {
  const [pdfList, setPdfList] = useState([]);
  const [viewPdf, setViewPdf] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 100, y: 100 });
  const [modalSize, setModalSize] = useState({ width: 600, height: 400 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedPdfs = JSON.parse(localStorage.getItem("pdfFiles")) || [];
    setPdfList(storedPdfs);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPdf = {
          id: pdfList.length + 1,
          name: file.name,
          url: e.target.result,
        };

        const updatedList = [...pdfList, newPdf];
        setPdfList(updatedList);
        localStorage.setItem("pdfFiles", JSON.stringify(updatedList));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  // Dragging Logic
  const startDragging = (e) => {
    setIsDragging(true);
    setOffset({ x: e.clientX - modalPosition.x, y: e.clientY - modalPosition.y });

    window.addEventListener("mousemove", onDragging);
    window.addEventListener("mouseup", stopDragging);
  };

  const onDragging = (e) => {
    if (!isDragging) return;
    setModalPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const stopDragging = () => {
    setIsDragging(false);
    window.removeEventListener("mousemove", onDragging);
    window.removeEventListener("mouseup", stopDragging);
  };

  // Resizing Logic
  const startResizing = (e) => {
    setIsResizing(true);
    window.addEventListener("mousemove", onResizing);
    window.addEventListener("mouseup", stopResizing);
  };

  const onResizing = (e) => {
    if (!isResizing) return;
    setModalSize({
      width: Math.max(300, e.clientX - modalPosition.x),
      height: Math.max(200, e.clientY - modalPosition.y),
    });
  };

  const stopResizing = () => {
    setIsResizing(false);
    window.removeEventListener("mousemove", onResizing);
    window.removeEventListener("mouseup", stopResizing);
  };

  return (
    <div className="h-full p-4 bg-white dark:bg-gray-900 rounded-3xl shadow-md relative">
      <h2 className="text-lg font-bold mb-4 text-center text-white p-2 rounded-2xl">
        BookShell
      </h2>

      {/* Hidden File Input */}
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" ref={fileInputRef} />

      {/* Add PDF Button */}
      <button onClick={triggerFileUpload} className="bg-[#ADFF00] text-black font-bold w-full cursor-pointer rounded-2xl p-3 ">
        Add PDF
      </button>

      {/* PDF List */}
      {pdfList.length > 0 && (
        <div className="mt-4 rounded-2xl p-3 bg-gray-100 dark:bg-[#2A3445]">
          <h3 className="text-md font-bold mb-2 text-white p-2 text-center">Your Files</h3>
          <div className="p-2 flex flex-col gap-3">
            {pdfList.map((pdf) => (
              <div key={pdf.id} className="mb-1 bg-white p-2 rounded-lg cursor-pointer">
                <button onClick={() => setViewPdf(pdf.url)} className="text-black cursor-pointer">
                  {pdf.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PDF Modal Viewer */}
      {viewPdf && (
        <div
          className="fixed bg-white dark:bg-gray-900 shadow-lg rounded-3xl border overflow-hidden"
          style={{
            top: `${modalPosition.y}px`,
            left: `${modalPosition.x}px`,
            width: `${modalSize.width}px`,
            height: `${modalSize.height}px`,
            zIndex: 1000,
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {/* Drag Header */}
          <div className="bg-gray-200 p-2 cursor-move flex justify-between" onMouseDown={startDragging}>
            <span className="font-bold">PDF Viewer</span>
            <button className="text-red-500" onClick={() => setViewPdf(null)}>
              ✖
            </button>
          </div>

          {/* PDF Content */}
          <iframe src={viewPdf} title="PDF Viewer" className="w-full h-full"></iframe>

          {/* Resizer Handle */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 cursor-se-resize"
            onMouseDown={startResizing}
          ></div>
        </div>
      )}
    </div>
  );
}

export default BookShell;
