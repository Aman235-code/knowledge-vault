// App.jsx
import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import CardList from "./components/CardList";
import Editor from "./components/Editor";
import { loadData, saveData, resetData, generateId } from "./lib/storage";
import { seed } from "./data/seed";
import toast from "react-hot-toast";

export default function App() {
  const [data, setData] = useState(() => loadData() || seed);
  const [selectedTopicId, setSelectedTopicId] = useState(
    data.topics[0]?.id || null
  );
  const [selectedCardId, setSelectedCardId] = useState(
    data.topics[0]?.cards?.[0]?.id || null
  );

  useEffect(() => {
    const stored = loadData();
    if (!stored) {
      resetData(seed);
      setData(seed);
      setSelectedTopicId(seed.topics[0].id);
      setSelectedCardId(seed.topics[0].cards[0]?.id || null);
    }
  }, []);

  useEffect(() => {
    saveData(data);
  }, [data]);

  const topics = data.topics;
  const selectedTopic =
    topics.find((t) => t.id === selectedTopicId) || topics[0];
  const selectedCard =
    selectedTopic?.cards?.find((c) => c.id === selectedCardId) || null;

  function handleAddTopic({ name, icon }) {
    const newTopic = {
      id: generateId(),
      name,
      icon,
      cards: [],
    };

    const next = { ...data, topics: [newTopic, ...data.topics] };
    setData(next);

    setSelectedTopicId(newTopic.id);
    setSelectedCardId(null);
  }

  function handleSelectTopic(id) {
    setSelectedTopicId(id);
    const topic = data.topics.find((t) => t.id === id);
    setSelectedCardId(topic?.cards?.[0]?.id || null);
  }

  function handleAddCard() {
    const title = prompt("Card title");
    if (!title) return;
    const newCard = { id: generateId(), title, content: "" };
    const nextTopics = data.topics.map((t) =>
      t.id === selectedTopicId ? { ...t, cards: [newCard, ...t.cards] } : t
    );
    setData({ ...data, topics: nextTopics });
    setSelectedCardId(newCard.id);
    toast.success(`Card "${title}" created`);
  }

  function handleSelectCard(cardId) {
    setSelectedCardId(cardId);
  }

  function handleSaveCard(updatedCard) {
    const nextTopics = data.topics.map((t) => {
      if (t.id !== selectedTopicId) return t;
      return {
        ...t,
        cards: t.cards.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
      };
    });
    setData({ ...data, topics: nextTopics });
    toast.success("Note saved");
  }

  function handleDeleteCard(cardId) {
    const nextTopics = data.topics.map((t) => {
      if (t.id !== selectedTopicId) return t;
      return {
        ...t,
        cards: t.cards.filter((c) => c.id !== cardId),
      };
    });

    setData({ ...data, topics: nextTopics });

    if (selectedCardId === cardId) {
      const topic = nextTopics.find((t) => t.id === selectedTopicId);
      setSelectedCardId(topic?.cards?.[0]?.id || null);
    }

    toast.success("Card deleted");
  }

  // 🔥 DELETE TOPIC
  function handleDeleteTopic(topicId) {
    if (!confirm("Delete this topic?")) return;

    const nextTopics = data.topics.filter((t) => t.id !== topicId);
    setData({ ...data, topics: nextTopics });

    // If deleted topic was selected
    if (selectedTopicId === topicId) {
      const first = nextTopics[0] || null;
      setSelectedTopicId(first?.id || null);
      setSelectedCardId(first?.cards?.[0]?.id || null);
    }

    toast.success("Topic deleted");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar
        topics={topics}
        selectedTopicId={selectedTopicId}
        onSelectTopic={handleSelectTopic}
        onAddTopic={handleAddTopic}
        onDeleteTopic={handleDeleteTopic} // <-- added
        onSelectCard={handleSelectCard}
      />

      <main className="flex-1 flex overflow-hidden">
        <section className="w-80 border-r bg-white overflow-y-auto">
          <CardList
            cards={selectedTopic?.cards || []}
            onSelectCard={handleSelectCard}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard}
            topic={selectedTopic}
            selectedCardId={selectedCardId}
          />
        </section>

        <section className="flex-1 bg-white border-l overflow-y-auto">
          {selectedCard ? (
            <Editor card={selectedCard} onSave={handleSaveCard} />
          ) : (
            <div className="p-4 text-gray-500">Select a card to edit notes</div>
          )}
        </section>
      </main>
    </div>
  );
}
