// src/components/NewTopicModal.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Database,
  GitBranch,
  Folder,
  X,
  // Container,
  // Workflow
} from "lucide-react";

// Extended icons array
const ICONS = [
  { name: "Cloud", component: <Cloud size={18} className="text-[#FF9900]" /> },
  { name: "Database", component: <Database size={18} className="text-[#4DB33D]" /> },
  { name: "GitBranch", component: <GitBranch size={18} className="text-[#5C6AC4]" /> },
  { name: "Folder", component: <Folder size={18} className="text-[#AAAAAA]" /> },
  // { name: "Container", component: <Container size={18} className="text-[#5C6AC4]" /> },
  // { name: "Workflow", component: <Workflow size={18} className="text-[#4DB33D]" /> },
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#1F1F1F] rounded-lg shadow-xl p-6 w-96 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Add New Topic</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#2A2A2A]"
          >
            <X size={18} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Topic Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-[#444444] rounded mb-4 bg-[#2A2A2A] text-white focus:outline-none focus:ring-2 focus:ring-[#5C6AC4]"
        />

        <div className="mb-4">
          <span className="text-sm font-medium text-gray-300">Select Icon:</span>
          <div className="flex gap-3 mt-2 flex-wrap">
            {ICONS.map((icon) => (
              <button
                key={icon.name}
                onClick={() => setSelectedIcon(icon)}
                className={`p-2 rounded-lg border transition flex items-center justify-center ${
                  selectedIcon.name === icon.name
                    ? "border-[#5C6AC4] bg-[#2A2A2A]"
                    : "border-[#444444] hover:bg-[#333333]"
                }`}
              >
                {icon.component}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#333333] hover:bg-[#444444]"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded bg-[#5C6AC4] hover:bg-[#4B55A5] text-white"
          >
            Add Topic
          </button>
        </div>
      </motion.div>
    </div>
  );
}
