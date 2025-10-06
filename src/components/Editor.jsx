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
    return (
      <div className="p-6 text-gray-400 bg-[#1F2233] h-full flex items-center justify-center rounded-lg">
        Select a card to start editing
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4 bg-[#252836] text-white">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <Edit3 size={20} className="text-yellow-400" />
        <h4 className="font-semibold text-white text-lg">{card.title}</h4>
      </div>

      {/* Editor box */}
      <textarea
        className="flex-1 resize-none rounded-lg p-4 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 editor-handwritten text-lg leading-relaxed bg-[#1E1F2B] text-white placeholder-gray-400"
        value={text}
        onChange={handleChange}
        placeholder="Write your note..."
        style={{ minHeight: "400px" }}
      />

      {/* Save button */}
      <div className="mt-4 flex justify-center">
        <motion.button
          onClick={() => {
            onSave({ ...card, content: text });
            setIsDirty(false);
          }}
          whileHover={{
            scale: isDirty ? 1.03 : 1,
            boxShadow: isDirty ? "0 4px 12px rgba(0,0,0,0.3)" : "none",
          }}
          whileTap={{ scale: isDirty ? 0.97 : 1 }}
          disabled={!isDirty}
          className={`flex items-center gap-2 px-6 py-2 rounded-md font-medium transition ${
            isDirty
              ? "bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white"
              : "bg-gray-600 cursor-not-allowed text-gray-300"
          }`}
        >
          <Save size={16} />
          Save Changes
        </motion.button>
      </div>
    </div>
  );
}
