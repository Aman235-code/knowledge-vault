// src/components/Sidebar.jsx
import React, { useState } from "react";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  Layers,
  Database,
  Cloud,
  GitBranch,
  Folder,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({
  topics,
  selectedTopicId,
  onSelectTopic,
  onAddTopic,
  onSelectCard,
}) {
  const [expanded, setExpanded] = useState({});
  const [isOpen, setIsOpen] = useState(true); // drawer open/close

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Topic icons
  const topicIcons = {
    aws: <Cloud size={16} className="text-orange-500" />,
    mongodb: <Database size={16} className="text-green-600" />,
    cicd: <GitBranch size={16} className="text-indigo-600" />,
  };

  function getIcon(name) {
    const key = name.toLowerCase();
    return topicIcons[key] || <Folder size={16} className="text-gray-400" />;
  }

  // Framer Motion width values in pixels (Tailwind 16rem = 256px, 4rem = 64px)
  const drawerWidth = isOpen ? 256 : 64;

  return (
    <motion.aside
      animate={{ width: drawerWidth }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="bg-gradient-to-b from-indigo-50 to-white border-r flex flex-col overflow-hidden relative"
    >
      {/* Drawer toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 z-10"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div className="flex flex-col gap-4 p-4">
        {isOpen && (
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-indigo-700">Topics</h2>
            <button
              onClick={onAddTopic}
              title="Add topic"
              className="p-1.5 rounded-lg hover:bg-indigo-100 text-indigo-600"
            >
              <Plus size={18} />
            </button>
          </div>
        )}

        <nav className="flex-1 mt-2">
          {topics.map((t) => (
            <div key={t.id} className="mb-2">
              <button
                onClick={() => onSelectTopic(t.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${
                  t.id === selectedTopicId
                    ? "bg-indigo-100 text-indigo-700 font-medium shadow-sm"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  {getIcon(t.name)}
                  {isOpen && <span>{t.name}</span>}
                </div>
                {isOpen && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(t.id);
                    }}
                    className="cursor-pointer"
                  >
                    {expanded[t.id] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {expanded[t.id] && isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-8 mt-1 flex flex-col gap-1"
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
      </div>
    </motion.aside>
  );
}
