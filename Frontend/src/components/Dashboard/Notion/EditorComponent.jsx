import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";

const EditorComponent = ({ initialData, onSave }) => {
  const editorInstance = useRef(null);

  console.log(initialData);
  

  useEffect(() => {
    const initEditor = async () => {
      const Header = (await import("@editorjs/header")).default;
      const Checklist = (await import("@editorjs/checklist")).default;
      const List = (await import("@editorjs/list")).default;

      // Destroy the existing editor if it already exists
      if (editorInstance.current) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }

      // Create a new editor instance with the updated initialData
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        data: initialData,
        placeholder: "Start typing here...",
        tools: {
          header: { class: Header, inlineToolbar: true },
          checklist: { class: Checklist, inlineToolbar: true },
          list: { class: List, inlineToolbar: true },
        },
      });
    };

    // Initialize or re-initialize the editor whenever initialData changes
    if (initialData) {
      initEditor();
    }

    return () => {
      // Clean up the editor instance on component unmount
      editorInstance.current?.destroy();
      editorInstance.current = null;
    };
  }, [initialData]);  // Re-run when initialData changes

  useEffect(() => {
    console.log("hello");
    
  },[initialData])

  const handleSave = async () => {
    if (editorInstance.current) {
      const data = await editorInstance.current.save();
      console.log(data);
      
      onSave(data);
    }
  };

  return (
    <div className="w-full h-full p-4 border border-gray-600 bg-black rounded-lg shadow-lg flex flex-col overflow-hidden">
      {/* Editor */}
      <div
        id="editorjs"
        className="flex-1 min-h-[300px] p-4 rounded-lg border border-gray-700 bg-black text-white overflow-auto"
      ></div>

      {/* Save Button (Stays Inside the Box) */}
      <div className="p-2 flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditorComponent;
