import React, { useEffect, useState } from "react";

const Checklist = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetch("/CheckList.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("response:", data);
        setItems(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const toggleStatus = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, status: !item.status } : item
    );
    setItems(updatedItems);
  };

  const addChecklistItem = () => {
    if (newItem.trim() === "") return;
    const newChecklistItem = {
      id: items.length + 1,
      text: newItem,
      status: false,
    };
    setItems([...items, newChecklistItem]);
    setNewItem(""); // Clear input field after adding
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-4 transition-all hover:shadow-xl">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Checklist</h2>
      
      {/* Input and Button to Add New Checklist Item */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item..."
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addChecklistItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Checklist Items */}
      <ul className="list-disc pl-5">
        {items.map((item) => (
          <li key={item.id} className="text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              checked={item.status}
              onChange={() => toggleStatus(item.id)}
              className="mr-2"
            />
            <span className={item.status ? "line-through text-gray-500" : ""}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;
