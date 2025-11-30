/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Cloud,
  Database,
  GitBranch,
  Folder,
  Menu,
  X,
  Plus,
  Trash2,
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
import { motion, AnimatePresence } from "framer-motion";
import NewTopicModal from "./NewTopicModal";

export default function Sidebar({
  topics,
  selectedTopicId,
  onSelectTopic,
  onAddTopic,
  onDeleteTopic,
  onSelectCard,
}) {
  const [expanded, setExpanded] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const topicIcons = {
    cloud: <Cloud size={16} className="text-[#FF9900]" />,
    database: <Database size={16} className="text-[#4DB33D]" />,
    cicd: <GitBranch size={16} className="text-[#5C6AC4]" />,
    default: <Box size={16} className="text-gray-500" />,
    backend: <Server size={16} className="text-blue-500" />,
    frontend: <Code2 size={16} className="text-green-500" />,
    networking: <Globe size={16} className="text-teal-500" />,
    devops: <FolderPlus size={16} className="text-orange-400" />,
    security: <Shield size={16} className="text-red-500" />,
    linux: <Terminal size={16} className="text-gray-600" />,
    tools: <Wrench size={16} className="text-yellow-600" />,
    architecture: <Layers size={16} className="text-purple-500" />,
    docs: <BookOpen size={16} className="text-blue-600" />,
    microservices: <Cpu size={16} className="text-emerald-500" />,
    deployment: <Rocket size={16} className="text-pink-500" />,
    storage: <HardDrive size={16} className="text-indigo-500" />,
    file: <File size={16} className="text-gray-500" />,
    files: <Files size={16} className="text-gray-400" />,
    folder: <Folder size={16} className="text-yellow-400" />,
    folderOpen: <FolderOpen size={16} className="text-yellow-500" />,
    git: <FolderGit2 size={16} className="text-purple-400" />,
    code: <Code size={16} className="text-green-500" />,
  };

  function getIcon(topic) {
    console.log(topic)
    const key = topic.name.toLowerCase();

    return topicIcons[key] || <Folder size={16} className="text-[#AAAAAA]" />;
  }

  console.log("first ", topics);

  const drawerWidth = isOpen ? 256 : 64;

  return (
    <>
      <motion.aside
        animate={{ width: drawerWidth }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-[#1b192e] border-r border-[#333333] flex flex-col overflow-hidden text-white"
      >
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center">
            {isOpen && (
              <span className="ml-2 font-semibold text-lg">Topics</span>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded hover:bg-[#2A2A2A]"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className="flex flex-col flex-1 p-2">
          <nav className="flex-1 mt-2">
            {topics.map((t) => {
              const isActive = t.id === selectedTopicId;

              return (
                <div key={t.id} className="mb-2 relative group">
                  <div
                    onClick={() => onSelectTopic(t.id)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition
                      ${
                        isActive
                          ? "bg-gray-700 text-yellow-300"
                          : "bg-[#252525] hover:bg-[#2F2F2F]"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {getIcon(t)}
                      {isOpen && <span>{t.name}</span>}
                    </div>

                    <div className="flex items-center gap-1">
                      {isOpen && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(t.id);
                          }}
                          className="p-1 rounded hover:bg-[#3A3A3A]"
                        >
                          {expanded[t.id] ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </button>
                      )}

                      {isOpen && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteTopic(t.id);
                          }}
                          className="p-1 rounded hover:bg-red-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expanded[t.id] && isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-10 mt-1 flex flex-col gap-1"
                      >
                        <div className="flex flex-col gap-2">
                          {t.cards.map((card) => (
                            <button
                              key={card.id}
                              onClick={() => onSelectCard(card.id)}
                              className="flex items-center gap-2 text-sm px-3 py-2 rounded hover:bg-[#3A3A3A] bg-[#2A2A2A] text-[#CCCCCC] transition"
                            >
                              {/* Icon based on the card title */}
                              <span className="flex-shrink-0">
                                {card.title}
                                {/* {getIcon(card.name)} */}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white bg-[#5C6AC4] hover:bg-[#4B55A5]"
          >
            <Plus size={16} />
            {isOpen && "New Topic"}
          </button>
        </div>
      </motion.aside>

      <NewTopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(topic) => {
          onAddTopic(topic);
          setIsModalOpen(false);
        }}
      />
    </>
  );
}
