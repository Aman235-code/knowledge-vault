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

  // initialize if nothing in localStorage
  useEffect(() => {
    const stored = loadData();
    if (!stored) {
      resetData(seed);
      setData(seed);
      setSelectedTopicId(seed.topics[0].id);
      setSelectedCardId(seed.topics[0].cards[0]?.id || null);
    }
  }, []);

  // persist changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  const topics = data.topics;
  const selectedTopic =
    topics.find((t) => t.id === selectedTopicId) || topics[0];
  const selectedCard =
    selectedTopic?.cards?.find((c) => c.id === selectedCardId) || null;

  // Add a new topic
  function handleAddTopic() {
    const name = prompt("New topic name");
    if (!name) return;
    const newTopic = { id: generateId(), name, cards: [] };
    const next = { ...data, topics: [newTopic, ...data.topics] };
    setData(next);
    setSelectedTopicId(newTopic.id);
    setSelectedCardId(null);
    toast.success(`Topic "${name}" added`);
  }

  // Select a topic
  function handleSelectTopic(id) {
    setSelectedTopicId(id);
    const topic = data.topics.find((t) => t.id === id);
    setSelectedCardId(topic?.cards?.[0]?.id || null);
  }

  // Add a new card
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

  // Select a card
  function handleSelectCard(cardId) {
    setSelectedCardId(cardId);
  }

  // Save card content
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

  // Delete a card
  function handleDeleteCard(cardId) {
    const nextTopics = data.topics.map((t) => {
      if (t.id !== selectedTopicId) return t;
      return {
        ...t,
        cards: t.cards.filter((c) => c.id !== cardId),
      };
    });

    setData({ ...data, topics: nextTopics });

    // If deleted card was selected, select first card or null
    if (selectedCardId === cardId) {
      const topic = nextTopics.find((t) => t.id === selectedTopicId);
      setSelectedCardId(topic?.cards?.[0]?.id || null);
    }

    toast.success("Card deleted");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        topics={topics}
        selectedTopicId={selectedTopicId}
        onSelectTopic={handleSelectTopic}
        onAddTopic={handleAddTopic}
      />

      {/* Main content area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Cards */}
        <section className="w-80 border-r bg-white overflow-y-auto">
          <CardList
            cards={selectedTopic?.cards || []}
            onSelectCard={handleSelectCard}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard} // <-- Pass delete function
            topic={selectedTopic}
            selectedCardId={selectedCardId}
          />
        </section>

        {/* Editor */}
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
