// src/components/Sidebar.jsx
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import NewTopicModal from "./NewTopicModal";

export default function Sidebar({
  topics,
  selectedTopicId,
  onSelectTopic,
  onAddTopic,
  onSelectCard,
}) {
  const [expanded, setExpanded] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const topicIcons = {
    aws: <Cloud size={16} className="text-orange-500" />,
    mongodb: <Database size={16} className="text-green-600" />,
    cicd: <GitBranch size={16} className="text-indigo-600" />,
  };

  function getIcon(topic) {
    if (topic.icon) return topic.icon;
    const key = topic.name.toLowerCase();
    return topicIcons[key] || <Folder size={16} className="text-gray-400" />;
  }

  const drawerWidth = isOpen ? 256 : 64;

  return (
    <>
      <motion.aside
        animate={{ width: drawerWidth }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-gradient-to-b from-indigo-50 to-white border-r flex flex-col overflow-hidden relative"
      >
        {/* Drawer toggle */}
        <div className="flex items-center justify-between p-3">
          <div className="relative flex items-center">
            {isOpen && <span className="ml-2 font-semibold text-indigo-700 text-lg">Topics</span>}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded hover:bg-gray-100"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className="flex flex-col flex-1 p-2 gap-2">
          <nav className="flex-1 mt-2">
            {topics.map((t) => (
              <div key={t.id} className="mb-2 relative group">
                <button
                  onClick={() => onSelectTopic(t.id)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition ${
                    t.id === selectedTopicId
                      ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {getIcon(t)}
                    {isOpen ? (
                      <span>{t.name}</span>
                    ) : (
                      <span className="absolute left-16 bg-gray-50 px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-all">
                        {t.name}
                      </span>
                    )}
                  </div>
                  {isOpen && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(t.id);
                      }}
                      className="cursor-pointer mt-0.5"
                    >
                      {expanded[t.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {expanded[t.id] && isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-10 mt-1 flex flex-col gap-1"
                    >
                      {t.cards.map((card) => (
                        <button
                          key={card.id}
                          onClick={() => onSelectCard(card.id)}
                          className="text-sm text-left px-2 py-1 rounded hover:bg-indigo-50 text-gray-600"
                        >
                          {card.title}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* New Topic button at the bottom */}
          <button
            onClick={() => setIsModalOpen(true)}
            className={`mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition ${
              isOpen
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-500 hover:bg-indigo-600 justify-center"
            }`}
          >
            <Plus size={16} />
            {isOpen && "New Topic"}
          </button>
        </div>
      </motion.aside>

      {/* Modal for adding new topic */}
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
