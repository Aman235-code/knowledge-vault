import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Editor({ card, onSave }) {
  const [text, setText] = useState(card ? card.content : "");

  useEffect(() => {
    setText(card ? card.content : "");
  }, [card && card.id]);

  if (!card) {
    return <div className="p-6">Select a card to start editing</div>;
  }

  return (
    <motion.div
      className="p-4 h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-semibold">{card.title}</h4>
        <div className="text-sm text-gray-500">Autosave off — click Save</div>
      </div>

      <textarea
        className="flex-1 resize-none rounded p-4 border focus:outline-none focus:ring editor-handwritten text-lg leading-relaxed"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your note..."
      />

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onSave({ ...card, content: text })}
          className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </motion.div>
  );
}
