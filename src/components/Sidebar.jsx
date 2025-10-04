import React from "react";
import { Plus } from "lucide-react";

export default function Sidebar({
  topics,
  selectedTopicId,
  onSelectTopic,
  onAddTopic,
}) {
  return (
    <aside className="w-56 bg-white border-r p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Topics</h2>
        <button
          onClick={onAddTopic}
          title="Add topic"
          className="p-1 rounded hover:bg-gray-100"
        >
          <Plus size={16} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {topics.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelectTopic(t.id)}
            className={`w-full text-left px-2 py-2 rounded-md mb-1 ${
              t.id === selectedTopicId
                ? "bg-indigo-50 border border-indigo-200"
                : "hover:bg-gray-50"
            }`}
          >
            {t.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
