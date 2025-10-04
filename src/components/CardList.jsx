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
import DeleteModal from "./DeleteModal"; // We'll create this component

export default function CardList({
  cards = [],
  onSelectCard,
  onAddCard,
  onDeleteCard,
  topic,
  selectedCardId,
}) {
  const [search, setSearch] = useState("");
  const [deleteCard, setDeleteCard] = useState(null); // card to delete

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
      return <Cloud className="text-orange-500" size={18} />;
    if (lower.includes("mongo") || lower.includes("db"))
      return <Database className="text-green-600" size={18} />;
    if (
      lower.includes("ci") ||
      lower.includes("pipeline") ||
      lower.includes("git")
    )
      return <GitBranch className="text-indigo-600" size={18} />;
    return <FileText className="text-red-500" size={18} />;
  }

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-red-600">
          {topic?.name || "Cards"}
        </h3>
        <button
          onClick={onAddCard}
          className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-100 text-red-600 transition"
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
        className="mb-3 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
      />

      {/* Cards */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredCards.map((card) => {
          const isActive = selectedCardId === card.id;
          return (
            <div
              key={card.id}
              className={`w-full flex justify-between p-4 rounded-xl border shadow-sm transition ${
                isActive
                  ? "bg-red-100 border-red-300"
                  : "bg-white border-gray-200"
              }`}
            >
              <button
                onClick={() => onSelectCard(card.id)}
                className="flex-1 text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  {getIcon(topic?.name)}
                  <span className="font-medium text-red-600">{card.title}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {card.content
                    ? card.content.length > 40
                      ? card.content.slice(0, 40) + "..."
                      : card.content
                    : "No notes yet"}
                </div>
              </button>
              <button
                onClick={() => setDeleteCard(card)}
                className="ml-2 p-1 text-gray-500 hover:text-red-600"
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
