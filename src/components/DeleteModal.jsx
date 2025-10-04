// src/components/DeleteModal.jsx
import React from "react";
import { motion } from "framer-motion";

export default function DeleteModal({ card, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-96 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-red-600 mb-4">
          Delete "{card.title}"?
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this card? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
