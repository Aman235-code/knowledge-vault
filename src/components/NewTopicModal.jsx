// src/components/NewTopicModal.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Database, GitBranch, Folder, X } from "lucide-react";

const ICONS = [
  { name: "Cloud", component: <Cloud size={18} className="text-orange-500" /> },
  {
    name: "Database",
    component: <Database size={18} className="text-green-600" />,
  },
  {
    name: "GitBranch",
    component: <GitBranch size={18} className="text-indigo-600" />,
  },
  { name: "Folder", component: <Folder size={18} className="text-gray-400" /> },
];

export default function NewTopicModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(ICONS[3]); // default Folder

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd({ name: name.trim(), icon: selectedIcon });
    setName("");
    setSelectedIcon(ICONS[3]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-lg p-6 w-96"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add New Topic</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={18} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Topic Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />

        <div className="mb-4">
          <span className="text-sm font-medium text-gray-700">
            Select Icon:
          </span>
          <div className="flex gap-3 mt-2">
            {ICONS.map((icon) => (
              <button
                key={icon.name}
                onClick={() => setSelectedIcon(icon)}
                className={`p-2 rounded-lg border transition ${
                  selectedIcon.name === icon.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 hover:bg-gray-100"
                }`}
              >
                {icon.component}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Add Topic
          </button>
        </div>
      </motion.div>
    </div>
  );
}
