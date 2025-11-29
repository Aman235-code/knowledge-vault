/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  Database,
  GitBranch,
  Folder,
  X,
  Code2,
  BookOpen,
  Cpu,
  Server,
  Shield,
  Terminal,
  Wrench,
  Layers,
  FolderGit2,
  Rocket,
  Code,
  Globe,
  HardDrive,
  Box,
  File,
  Files,
  FolderOpen,
  FolderPlus,
} from "lucide-react";

// Icon presets
const ICONS = [
  {
    name: "Cloud",
    component: <Cloud size={18} className="text-[#FF9900]" />,
  },
  {
    name: "Database",
    component: <Database size={18} className="text-[#4DB33D]" />,
  },
  {
    name: "CiCd",
    component: <GitBranch size={18} className="text-[#5C6AC4]" />,
  },
  {
    name: "Default",
    component: <Box size={18} className="text-gray-500" />,
  },
  {
    name: "Backend",
    component: <Server size={18} className="text-blue-500" />,
  },
  {
    name: "Frontend",
    component: <Code2 size={18} className="text-green-500" />,
  },
  {
    name: "Networking",
    component: <Globe size={18} className="text-teal-500" />,
  },
  {
    name: "DevOps",
    component: <FolderPlus size={18} className="text-orange-400" />,
  },
  {
    name: "Security",
    component: <Shield size={18} className="text-red-500" />,
  },
  {
    name: "Linux",
    component: <Terminal size={18} className="text-gray-600" />,
  },
  {
    name: "Tools",
    component: <Wrench size={18} className="text-yellow-600" />,
  },
  {
    name: "Architecture",
    component: <Layers size={18} className="text-purple-500" />,
  },
  {
    name: "Docs",
    component: <BookOpen size={18} className="text-blue-600" />,
  },
  {
    name: "Microservices",
    component: <Cpu size={18} className="text-emerald-500" />,
  },
  {
    name: "Deployment",
    component: <Rocket size={18} className="text-pink-500" />,
  },
  {
    name: "Storage",
    component: <HardDrive size={18} className="text-indigo-500" />,
  },
  {
    name: "File",
    component: <File size={18} className="text-gray-500" />,
  },
  {
    name: "Files",
    component: <Files size={18} className="text-gray-400" />,
  },
  {
    name: "Folder",
    component: <Folder size={18} className="text-yellow-400" />,
  },
  {
    name: "FolderOpen",
    component: <FolderOpen size={18} className="text-yellow-500" />,
  },
  {
    name: "Git",
    component: <FolderGit2 size={18} className="text-purple-400" />,
  },
  {
    name: "Code",
    component: <Code size={18} className="text-green-500" />,
  },
];

export default function NewTopicModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(ICONS[18]); // Default

  const handleAdd = () => {
    if (!name.trim()) return;

    onAdd({ name: name.trim(), icon: selectedIcon });
    setName("");
    setSelectedIcon(ICONS[3]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="bg-[#1F1F1F] rounded-xl shadow-2xl p-6 w-96 text-white border border-[#2D2D2D]"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold">Add New Topic</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#2A2A2A] transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Topic Name */}
        <input
          type="text"
          placeholder="Topic Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded bg-[#2A2A2A] border border-[#444444] text-white 
                     focus:outline-none focus:ring-2 focus:ring-[#5C6AC4] transition mb-5"
        />

        {/* Icons */}
        <div className="mb-5">
          <span className="block text-sm font-medium text-gray-300">
            Select Icon
          </span>
          <div className="flex gap-3 mt-3 flex-wrap">
            {ICONS.map((icon) => {
              const active = selectedIcon.name === icon.name;
              return (
                <button
                  key={icon.name}
                  onClick={() => {
                    setSelectedIcon(icon);
                    setName(icon.name); // Automatically set input value
                  }}
                  className={`p-2 rounded-lg border flex items-center justify-center transition 
                    ${
                      active
                        ? "border-[#5C6AC4] bg-[#2A2A2A]"
                        : "border-[#444444] hover:bg-[#333333]"
                    }`}
                >
                  {icon.component}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#333333] hover:bg-[#444444] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded bg-[#5C6AC4] hover:bg-[#4B55A5] transition text-white"
          >
            Add Topic
          </button>
        </div>
      </motion.div>
    </div>
  );
}
