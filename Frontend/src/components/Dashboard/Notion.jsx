import React, { useState, useEffect } from "react";
import Editor from "./Notion/Editor.jsx";
import { db, collection, addDoc, getDocs, updateDoc, doc } from "../../config/firebase.js";
import { Plus, FileText, Folder, FolderPlus, Edit, Save, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Notion = () => {
  const [fileName, setFileName] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [creatingFile, setCreatingFile] = useState(false);
  const [initialData, setInitialData] = useState({
    time: Date.now(),
    blocks: [{ type: "header", data: { text: "Start typing here...", level: 2 } }],
    version: "2.11.10",
  });

  /** 🔹 Fetch Notes from Firestore **/
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notionFiles"));
        const notesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, []);

  /** 🔹 Save Note to Firestore **/
  const saveNote = async (data) => {
    if (!selectedFileId) {
      alert("Please select a file first.");
      return;
    }
    try {
      const noteRef = doc(db, "notionFiles", selectedFileId);
      await updateDoc(noteRef, { data });
      alert("Note saved successfully!");
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Error saving note. Please try again.");
    }
  };

  /** 🔹 Create New Note File **/
  const createFile = async () => {
    if (!fileName.trim()) {
      alert("Please enter a valid file name.");
      return;
    }

    setCreatingFile(true);
    try {
      const docRef = await addDoc(collection(db, "notionFiles"), {
        fileName,
        data: initialData,
      });

      const newFile = { id: docRef.id, fileName, data: initialData };
      setNotes([...notes, newFile]);
      setSelectedFile(fileName);
      setSelectedFileId(docRef.id);
      setInitialData(initialData);
      setFileName("");
    } catch (error) {
      console.error("Error creating file:", error);
      alert("Error creating file, please try again.");
    } finally {
      setCreatingFile(false);
    }
  };

  /** 🔹 Load a Note **/
  const handleNotionClick = (file) => {
    if (file.id === selectedFileId) return;
    setSelectedFile(file.fileName);
    setSelectedFileId(file.id);
    setInitialData(file.data);
  };

  return (
    <div className="w-full h-[calc(100vh-100px)] font-inter">
      <div className="h-full bg-[#fffbea] dark:bg-gray-800 rounded-3xl p-4 md:p-6">
        <div className="flex flex-col lg:flex-row h-full gap-4">
          {/* Sidebar (Now Scrollable) */}
          <div className="w-full lg:w-80 flex flex-col bg-gradient-to-b dark:bg-gray-900 dark:text-white p-5 rounded-3xl shadow-lg">
            <div className="mb-2 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-bold text-black dark:text-white">My Notes</h2>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="New note name..."
                  className="w-full p-3 bg-[#364153] rounded-2xl shadow-sm focus:outline-none"
                />
                <button
                  onClick={createFile}
                  disabled={creatingFile}
                  className={`w-full mt-2 p-3 bg-[#ADFF00] text-black rounded-2xl font-semibold flex items-center justify-center gap-2
                    ${creatingFile ? "cursor-not-allowed opacity-90" : "hover:bg-gray-900 active:scale-95 transition-transform"}`}
                >
                  {creatingFile ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Plus className="w-5 h-5" /> Create New</>}
                </button>
              </div>
            </div>

            {/* Scrollable Notion List */}
            <div className="flex-1 overflow-y-auto h-[calc(100vh-160px)] pr-2 scrollbar-hide">
              <h3 className="font-bold text-lg text-black dark:text-white mt-7 mb-3 flex items-center gap-2">
                <Folder className="w-5 h-5" /> Saved Files
              </h3>
              {notes.length === 0 ? (
                <div className="p-4 rounded-lg bg-black/10 text-center">
                  <FileText className="w-8 h-8 mb-2 text-black/50" />
                  <p className="text-black/60">No files created yet</p>
                </div>
              ) : (
                <ul className="space-y-2">
                  {notes.map((note) => (
                    <motion.li
                      key={note.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group p-3 cursor-pointer m-2 rounded-lg flex items-center gap-3 transition-all
                        ${selectedFileId === note.id ? "bg-black dark:bg-gray-950 shadow-lg text-[#ADFF00]" : "bg-white shadow-lg dark:bg-gray-800 "}`}
                      onClick={() => handleNotionClick(note)}
                    >
                      <FileText className={`w-5 h-5 ${selectedFileId === note.id ? "text-[#ADFF00]" : "text-black/60 dark:text-white/50"}`} />
                      <span className="truncate flex-1">{note.fileName}</span>
                      <Edit className="w-4 h-4 text-black/50 dark:text-white/50" />
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Main Editor */}
          <div className="flex-1 flex flex-col gap-4 h-[60vh] lg:h-full">
            {selectedFile ? (
              <div className="h-full flex flex-col rounded-3xl shadow-lg overflow-hidden">
                <div className="bg-black dark:bg-gray-900 px-5 py-3 flex items-center justify-between">
                  <h3 className="font-semibold text-white">{selectedFile}</h3>
                  <button onClick={() => saveNote(initialData)} className="px-4 py-2 bg-[#ADFF00] text-black rounded-full hover:bg-[#c0d32a]">
                    Save
                  </button>
                </div>
                <Editor initialData={initialData} onSave={saveNote} />
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 rounded-3xl">
                <Folder className="w-16 h-16 text-black/40" />
                <h3 className="text-2xl font-bold text-black/60">Welcome to Notes</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notion;
