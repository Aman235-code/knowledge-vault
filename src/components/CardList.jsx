import React from "react";
import { motion } from "framer-motion";
import { FiPlusCircle } from "react-icons/fi";

export default function CardList({ cards = [], onSelectCard, onAddCard }) {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold">Cards</h3>
        <button
          onClick={onAddCard}
          className="inline-flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100"
        >
          <FiPlusCircle />
          New
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => onSelectCard(card.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            className="text-left bg-white p-3 rounded-lg shadow-sm border hover:shadow-md"
          >
            <div className="font-medium">{card.title}</div>
            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
              {card.content || "No notes yet"}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
