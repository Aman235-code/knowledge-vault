import { generateId } from "../lib/storage";

const makeCard = (title, content = "") => ({
  id: generateId(),
  title,
  content,
});

export const seed = {
  topics: [
    {
      id: generateId(),
      name: "AWS",
      cards: [
        makeCard("EC2 — basics", "EC2 is a virtual server..."),
        makeCard("S3 — object storage", "S3 stores objects..."),
      ],
    },
    {
      id: generateId(),
      name: "MongoDB",
      cards: [makeCard("Schema design", "Design collections...")],
    },
    {
      id: generateId(),
      name: "CI/CD",
      cards: [makeCard("Pipelines", "Automate builds and deploys")],
    },
  ],
};
