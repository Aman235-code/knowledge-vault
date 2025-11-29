// src/components/CardList.jsx
import React, { useState, useMemo } from "react";
import {
  Cloud,
  Database,
  GitBranch,
  Folder,
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
  PlusCircle,
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
    if (!name) return <Box className="text-gray-400" size={18} />;

    const lower = name.toLowerCase();

    if (lower.includes("cloud"))
      return <Cloud className="text-[#FF9900]" size={18} />;
    if (lower.includes("database"))
      return <Database className="text-[#4DB33D]" size={18} />;
    if (lower.includes("cicd") || lower.includes("ci/cd"))
      return <GitBranch className="text-[#5C6AC4]" size={18} />;
    if (lower.includes("backend"))
      return <Server className="text-blue-500" size={18} />;
    if (lower.includes("frontend"))
      return <Code2 className="text-green-500" size={18} />;
    if (lower.includes("networking"))
      return <Globe className="text-teal-500" size={18} />;
    if (lower.includes("devops"))
      return <FolderPlus className="text-orange-400" size={18} />;
    if (lower.includes("security"))
      return <Shield className="text-red-500" size={18} />;
    if (lower.includes("linux"))
      return <Terminal className="text-gray-600" size={18} />;
    if (lower.includes("tools"))
      return <Wrench className="text-yellow-600" size={18} />;
    if (lower.includes("architecture"))
      return <Layers className="text-purple-500" size={18} />;
    if (lower.includes("docs"))
      return <BookOpen className="text-blue-600" size={18} />;
    if (lower.includes("microservices"))
      return <Cpu className="text-emerald-500" size={18} />;
    if (lower.includes("deployment"))
      return <Rocket className="text-pink-500" size={18} />;
    if (lower.includes("storage"))
      return <HardDrive className="text-indigo-500" size={18} />;
    if (lower.includes("file") && !lower.includes("folder"))
      return <File className="text-gray-500" size={18} />;
    if (lower.includes("files"))
      return <Files className="text-gray-400" size={18} />;
    if (lower.includes("folderopen"))
      return <FolderOpen className="text-yellow-500" size={18} />;
    if (lower.includes("folder"))
      return <Folder className="text-yellow-400" size={18} />;
    if (lower.includes("git"))
      return <FolderGit2 className="text-purple-400" size={18} />;
    if (lower.includes("code"))
      return <Code className="text-green-500" size={18} />;

    return <Box className="text-gray-400" size={18} />; // default fallback
  }

  // Calculate max height for cards section based on 6 cards
  const cardHeight = 95; // Approx height of one card including margin/padding
  const maxCardsVisible = 6;
  const maxHeight =
    filteredCards.length > maxCardsVisible
      ? cardHeight * maxCardsVisible
      : "auto";

  return (
    <div className="p-4 h-full flex flex-col bg-[#221432] text-white">
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
        className="mb-3 p-2 rounded border border-gray-600 bg-[#1F1F2B] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {/* Cards section */}
      <div
        className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide"
        style={{ maxHeight }}
      >
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
                  <span className="font-medium text-yellow-400">
                    {card.title}
                  </span>
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

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
