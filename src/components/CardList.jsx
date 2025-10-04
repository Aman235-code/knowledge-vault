// src/components/CardList.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, PlusCircle, Cloud, Database, GitBranch } from "lucide-react";

export default function CardList({ cards = [], onSelectCard, onAddCard, topic }) {
  // pick an icon depending on topic name
  function getIcon(name) {
    if (!name) return <FileText className="text-gray-400" size={18} />;
    const lower = name.toLowerCase();
    if (lower.includes("aws") || lower.includes("cloud")) {
      return <Cloud className="text-orange-500" size={18} />;
    }
    if (lower.includes("mongo") || lower.includes("db")) {
      return <Database className="text-green-600" size={18} />;
    }
    if (lower.includes("ci") || lower.includes("pipeline") || lower.includes("git")) {
      return <GitBranch className="text-indigo-600" size={18} />;
    }
    return <FileText className="text-indigo-500" size={18} />;
  }

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-indigo-700">
          {topic?.name || "Cards"}
        </h3>
        <button
          onClick={onAddCard}
          className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-indigo-100 text-indigo-600 transition"
        >
          <PlusCircle size={18} />
          <span className="text-sm">New</span>
        </button>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto space-y-3">
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.button
              key={card.id}
              onClick={() => onSelectCard(card.id)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 mb-1">
                {getIcon(topic?.name)}
                <span className="font-medium text-gray-800">{card.title}</span>
              </div>
              <div className="text-sm text-gray-500 line-clamp-2">
                {card.content || "No notes yet"}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
