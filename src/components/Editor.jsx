// src/components/Editor.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Edit3 } from "lucide-react";

export default function Editor({ card, onSave }) {
  const [text, setText] = useState(card?.content || "");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setText(card?.content || "");
    setIsDirty(false);
  }, [card?.id]);

  const handleChange = (e) => {
    setText(e.target.value);
    setIsDirty(e.target.value !== (card?.content || ""));
  };

  if (!card) {
    return <div className="p-6 text-gray-500">Select a card to start editing</div>;
  }

  return (
    <div className="flex flex-col h-full p-4">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <Edit3 size={20} className="text-indigo-500" />
        <h4 className="font-semibold text-gray-800 text-lg">{card.title}</h4>
      </div>

      {/* Editor box with fixed height */}
      <textarea
        className="flex-1 resize-none rounded-lg p-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 editor-handwritten text-lg leading-relaxed bg-gray-50"
        value={text}
        onChange={handleChange}
        placeholder="Write your note..."
        style={{ minHeight: "400px" }} // fixed height
      />

      {/* Save button below editor */}
      <motion.button
        onClick={() => {
          onSave({ ...card, content: text });
          setIsDirty(false);
        }}
        whileHover={{ scale: isDirty ? 1.03 : 1, boxShadow: isDirty ? "0 4px 12px rgba(0,0,0,0.15)" : "none" }}
        whileTap={{ scale: isDirty ? 0.97 : 1 }}
        disabled={!isDirty}
        className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-md text-white font-medium transition ${
          isDirty
            ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        <Save size={16} />
        Save
      </motion.button>
    </div>
  );
}
