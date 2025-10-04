import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import CardList from "./components/CardList";
import Editor from "./components/Editor";
import { loadData, saveData, resetData, generateId } from "./lib/storage";
import { seed } from "./data/seed";
import clsx from "clsx";

export default function App() {
  const [data, setData] = useState(() => loadData() || seed);
  const [selectedTopicId, setSelectedTopicId] = useState(
    data.topics[0]?.id || null
  );
  const [selectedCardId, setSelectedCardId] = useState(
    data.topics[0]?.cards?.[0]?.id || null
  );

  useEffect(() => {
    // on first load if localStorage is empty, seed it
    const stored = loadData();
    if (!stored) {
      resetData(seed);
      setData(seed);
      setSelectedTopicId(seed.topics[0].id);
      setSelectedCardId(seed.topics[0].cards[0].id);
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

  function handleAddTopic() {
    const name = prompt("New topic name");
    if (!name) return;
    const newTopic = { id: generateId(), name, cards: [] };
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
    const next = { ...data, topics: nextTopics };
    setData(next);
    setSelectedCardId(newCard.id);
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
    const next = { ...data, topics: nextTopics };
    setData(next);
    // localStorage saved automatically by effect
  }

  return (
    <div className="min-h-screen flex">
      <Sidebar
        topics={topics}
        selectedTopicId={selectedTopicId}
        onSelectTopic={handleSelectTopic}
        onAddTopic={handleAddTopic}
      />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4">
          <CardList
            cards={selectedTopic?.cards || []}
            onSelectCard={handleSelectCard}
            onAddCard={handleAddCard}
          />
        </div>
      </main>

      <section className="w-96 border-l bg-white">
        <Editor card={selectedCard} onSave={handleSaveCard} />
      </section>
    </div>
  );
}
