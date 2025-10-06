// src/components/CardList.jsx
import React, { useState, useMemo } from "react";
import {
  FileText,
  PlusCircle,
  Cloud,
  Database,
  GitBranch,
  Trash2,
} from "lucide-react";
import DeleteModal from "./DeleteModal"; // Ensure this exists

export default function CardList({
  cards = [],
  onSelectCard,
  onAddCard,
  onDeleteCard,
  topic,
  selectedCardId,
}) {
  const [search, setSearch] = useState("");
  const [deleteCard, setDeleteCard] = useState(null);

  // Filter cards based on search input
  const filteredCards = useMemo(() => {
    if (!search) return cards;
    const lower = search.toLowerCase();
    return cards.filter(
      (c) =>
        c.title.toLowerCase().includes(lower) ||
        (c.content && c.content.toLowerCase().includes(lower))
    );
  }, [cards, search]);

  function getIcon(name) {
    if (!name) return <FileText className="text-gray-400" size={18} />;
    const lower = name.toLowerCase();
    if (lower.includes("aws") || lower.includes("cloud"))
      return <Cloud className="text-orange-400" size={18} />;
    if (lower.includes("mongo") || lower.includes("db"))
      return <Database className="text-green-500" size={18} />;
    if (lower.includes("ci") || lower.includes("pipeline") || lower.includes("git"))
      return <GitBranch className="text-indigo-400" size={18} />;
    return <FileText className="text-gray-300" size={18} />;
  }

  return (
    <div className="p-4 h-full flex flex-col bg-[#2A2A2A] text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-yellow-400">
          {topic?.name || "Cards"}
        </h3>
        <button
          onClick={onAddCard}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 transition"
        >
          <PlusCircle size={18} />
          <span className="text-sm">New</span>
        </button>
      </div>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search cards..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3 p-2 rounded border border-gray-600 bg-[#1F1F1F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {/* Cards */}
      <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide pr-1">
        {filteredCards.map((card) => {
          const isActive = selectedCardId === card.id;
          return (
            <div
              key={card.id}
              className={`w-full flex justify-between p-4 rounded-xl border transition-all shadow-md hover:shadow-lg cursor-pointer ${
                isActive
                  ? "bg-yellow-600/20 border-yellow-400"
                  : "bg-[#3A3A3A] border-[#444]"
              }`}
            >
              <button
                onClick={() => onSelectCard(card.id)}
                className="flex-1 text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  {getIcon(topic?.name)}
                  <span className="font-medium text-yellow-400">{card.title}</span>
                </div>
                <div className="text-sm text-gray-300">
                  {card.content
                    ? card.content.length > 60
                      ? card.content.slice(0, 60) + "..."
                      : card.content
                    : "No notes yet"}
                </div>
              </button>
              <button
                onClick={() => setDeleteCard(card)}
                className="ml-2 p-1 text-gray-400 hover:text-red-500"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Delete confirmation modal */}
      {deleteCard && (
        <DeleteModal
          card={deleteCard}
          onClose={() => setDeleteCard(null)}
          onConfirm={() => {
            onDeleteCard(deleteCard.id);
            setDeleteCard(null);
          }}
        />
      )}
    </div>
  );
}
