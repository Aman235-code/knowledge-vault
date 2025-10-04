const KEY = "my-notes-v1";

export function loadData() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to parse localStorage", e);
    return null;
  }
}

export function saveData(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}

export function resetData(seed) {
  saveData(seed);
  return seed;
}

export function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID)
    return crypto.randomUUID();
  return Date.now().toString();
}
