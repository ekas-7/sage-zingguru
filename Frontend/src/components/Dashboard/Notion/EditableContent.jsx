import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";

const EditableContent = ({ initialData, onSave }) => {
  const editorInstance = useRef(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    const initEditor = async () => {
      const Header = (await import("@editorjs/header")).default;
      const Checklist = (await import("@editorjs/checklist")).default;
      const List = (await import("@editorjs/list")).default;

      // Initialize the editor only if it's not already initialized
      if (!editorInstance.current) {
        editorInstance.current = new EditorJS({
          holder: "editorjs",
          data: initialData, // Use initialData to load the existing notion content
          placeholder: "Start typing here...",
          tools: {
            header: { class: Header, inlineToolbar: true },
            checklist: { class: Checklist, inlineToolbar: true },
            list: { class: List, inlineToolbar: true },
          },
        });
      }

      setIsEditorReady(true);
    };

    initEditor();

    return () => {
      editorInstance.current?.destroy();
      editorInstance.current = null;
    };
  }, [initialData]);

  const handleSave = async () => {
    if (editorInstance.current) {
      const data = await editorInstance.current.save();
      onSave(data); // Pass the updated data back to the parent
    }
  };

  if (!isEditorReady) {
    return <div>Loading Editor...</div>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div
        id="editorjs"
        className="min-h-[300px] p-4 bg-black rounded-lg text-white"
      ></div>

      <button
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditableContent;
